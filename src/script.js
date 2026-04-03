class TodoApp {
  constructor() {
    this.todos = [];
    this.currentFilter = 'all';
    this.currentCategory = 'all';
    this.categories = ['General'];
    this.darkMode = localStorage.getItem('todoodle-theme') === 'light';
    this.customBackgrounds = {
      dark: localStorage.getItem('todoodle-bg-dark') || '',
      light: localStorage.getItem('todoodle-bg-light') || ''
    };
    this.currentTheme = localStorage.getItem('todoodle-custom-theme') || 'default';
    this.init();
  }

  async init() {
    await this.loadTodos();
    await this.loadCategories();
    this.setupEventListeners();
    this.renderCategories();
    this.updateCategorySelect();
    this.render();
    this.updateStats();
    
    // Apply current theme and background
    const currentTheme = this.darkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    this.applyCustomBackground(currentTheme);
    
    // Load custom theme
    this.loadTheme(this.currentTheme);
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }

  async loadTodos() {
    try {
      const saved = localStorage.getItem('todoodle-todos');
      if (saved) {
        this.todos = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading todos:', error);
      this.todos = [];
    }
  }

  async saveTodos() {
    try {
      localStorage.setItem('todoodle-todos', JSON.stringify(this.todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  }

  setupEventListeners() {
    // Add todo
    const addBtn = document.getElementById('add-btn');
    const todoInput = document.getElementById('todo-input');
    
    addBtn.addEventListener('click', () => this.addTodo());
    
    // Add category button
    document.getElementById('add-category-btn').addEventListener('click', () => this.addCategory());
    
    // Todo input
    document.getElementById('todo-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo();
    });
    
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.render();
      });
    });
    
    // Clear completed
    document.getElementById('clear-completed').addEventListener('click', () => this.clearCompleted());
    
    // Port config
    document.getElementById('update-port-btn').addEventListener('click', () => this.updatePort());
    
    // Theme settings buttons
    document.getElementById('theme-toggle').addEventListener('change', () => this.toggleThemeSwitch());
    document.getElementById('apply-theme-btn').addEventListener('click', () => this.applySelectedTheme());
    document.getElementById('browse-bg-btn').addEventListener('click', () => this.setBackgroundFromFile());
    document.getElementById('reset-bg-btn').addEventListener('click', () => this.resetBackground());
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        document.getElementById('todo-input').focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        this.toggleDarkMode();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        this.toggleBackgroundSettings();
      }
    });
  }

  addTodo() {
    const input = document.getElementById('todo-input');
    const categorySelect = document.getElementById('todo-category');
    const text = input.value.trim();
    
    if (!text) return;

    const todo = {
      id: Date.now().toString(),
      text: text,
      note: '',
      completed: false,
      progress: 0,
      category: categorySelect.value || 'General',
      createdAt: new Date().toISOString(),
      priority: this.detectPriority(text),
      showNoteInput: false
    };

    this.todos.unshift(todo);
    this.saveTodos();
    this.render();
    this.updateStats();
    
    input.value = '';
    input.focus();
  }

  detectPriority(text) {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('urgent') || lowerText.includes('asap') || lowerText.includes('!!!')) {
      return 'high';
    }
    if (lowerText.includes('important') || lowerText.includes('!!') || lowerText.includes('soon')) {
      return 'medium';
    }
    return 'low';
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
      this.render();
      this.updateStats();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
    this.render();
    this.updateStats();
  }

  setFilter(filter) {
    this.currentFilter = filter;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.filter === filter);
    });
    
    this.render();
  }

  getFilteredTodos() {
    let filtered = this.todos;
    
    // Apply status filter
    switch (this.currentFilter) {
      case 'active':
        filtered = filtered.filter(t => !t.completed);
        break;
      case 'completed':
        filtered = filtered.filter(t => t.completed);
        break;
    }
    
    // Apply category filter
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(t => t.category === this.currentCategory);
    }
    
    return filtered;
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.saveTodos();
    this.render();
    this.updateStats();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    const theme = this.darkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('todoodle-theme', theme);
    this.applyCustomBackground(theme);
  }

  updateStats() {
    const completed = this.todos.filter(t => t.completed).length;
    const total = this.todos.length;
    
    document.getElementById('completed-count').textContent = completed;
    document.getElementById('total-count').textContent = total;
    
    // Update overall progress bar
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    progressFill.style.width = `${percentage}%`;
    progressPercentage.textContent = `${percentage}%`;
    
    // Update overall progress color based on percentage
    progressFill.className = 'progress-fill';
    if (percentage === 100) {
      progressFill.classList.add('progress-purple');
    } else if (percentage >= 90) {
      progressFill.classList.add('progress-green');
    } else if (percentage >= 70) {
      progressFill.classList.add('progress-yellow');
    } else if (percentage >= 40) {
      progressFill.classList.add('progress-orange');
    } else {
      progressFill.classList.add('progress-red');
    }

    // Update category progress if a category is selected
    this.updateCategoryProgress();
  }

  updateCategoryProgress() {
    const categoryContainer = document.getElementById('category-progress');
    const categoryName = document.getElementById('category-name');
    const categoryStats = document.getElementById('category-stats');
    const categoryProgressFill = document.getElementById('category-progress-fill');
    const categoryProgressPercentage = document.getElementById('category-progress-percentage');

    if (this.currentCategory === 'all') {
      categoryContainer.style.display = 'none';
      return;
    }

    // Get todos for current category
    const categoryTodos = this.todos.filter(t => t.category === this.currentCategory);
    const completed = categoryTodos.filter(t => t.completed).length;
    const total = categoryTodos.length;
    
    if (total === 0) {
      categoryContainer.style.display = 'none';
      return;
    }

    categoryContainer.style.display = 'block';
    categoryName.textContent = this.currentCategory;
    categoryStats.textContent = `${completed} / ${total} tasks`;
    
    // Calculate progress based on completed tasks
    const percentage = Math.round((completed / total) * 100);
    
    categoryProgressFill.style.width = `${percentage}%`;
    categoryProgressPercentage.textContent = `${percentage}%`;
    
    // Update category progress color
    categoryProgressFill.className = 'progress-fill';
    if (percentage === 100) {
      categoryProgressFill.classList.add('progress-purple');
    } else if (percentage >= 90) {
      categoryProgressFill.classList.add('progress-green');
    } else if (percentage >= 70) {
      categoryProgressFill.classList.add('progress-yellow');
    } else if (percentage >= 40) {
      categoryProgressFill.classList.add('progress-orange');
    } else {
      categoryProgressFill.classList.add('progress-red');
    }
  }

  render() {
    const todoList = document.getElementById('todo-list');
    const filteredTodos = this.getFilteredTodos();
    
    if (filteredTodos.length === 0) {
      todoList.innerHTML = `
        <div class="empty-state">
          <h3>No tasks yet</h3>
          <p>Add your first task to get started!</p>
        </div>
      `;
      return;
    }

    todoList.innerHTML = filteredTodos.map(todo => `
      <div class="todo-item ${todo.completed ? 'completed' : ''}">
        <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" 
             onclick="app.toggleTodo('${todo.id}')"></div>
        <div class="todo-content">
          <div class="todo-header">
            <div class="todo-text">${this.escapeHtml(todo.text)}</div>
            ${todo.category !== 'General' ? `<span class="todo-category">${this.escapeHtml(todo.category)}</span>` : ''}
            ${todo.priority !== 'low' ? `<span class="todo-priority priority-${todo.priority}">${todo.priority}</span>` : ''}
            <button class="add-note-btn" onclick="app.toggleNoteInput('${todo.id}')">
              ${todo.note ? 'Edit Note' : 'Add Note'}
            </button>
            <button class="todo-delete" onclick="app.deleteTodo('${todo.id}')">Delete</button>
          </div>
          ${todo.showNoteInput ? `
            <textarea 
              class="note-input" 
              placeholder="Add a note..."
              onblur="app.saveNote('${todo.id}', this.value)"
              onkeydown="if(event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); this.blur(); }"
            >${this.escapeHtml(todo.note || '')}</textarea>
          ` : ''}
          ${todo.note && !todo.showNoteInput ? `
            <div class="todo-note">${this.escapeHtml(todo.note)}</div>
          ` : ''}
          <div class="todo-progress">
            <input 
              type="range" 
              class="todo-progress-slider"
              min="0" 
              max="100" 
              step="1"
              value="${todo.progress}"
              oninput="app.updateProgress('${todo.id}', this.value)"
              style="background: linear-gradient(to right, var(--${this.getProgressColorClass(todo.progress)}) 0%, var(--${this.getProgressColorClass(todo.progress)}) ${todo.progress}%, var(--background) ${todo.progress}%, var(--background) 100%);"
            >
            <div class="todo-progress-controls">
              <span class="todo-progress-label">Progress:</span>
              <span class="todo-progress-value">${todo.progress}%</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  getProgressColorClass(percentage) {
    if (percentage === 100) return 'progress-purple';
    if (percentage >= 90) return 'progress-green';
    if (percentage >= 70) return 'progress-yellow';
    if (percentage >= 40) return 'progress-orange';
    return 'progress-red';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  saveNote(id, note) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.note = note.trim();
      this.saveTodos();
      this.render();
    }
  }

  updateProgress(id, progress) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.progress = Math.max(0, Math.min(100, parseInt(progress) || 0));
      if (todo.progress === 100) {
        todo.completed = true;
      } else {
        todo.completed = false;
      }
      this.saveTodos();
      this.render();
      this.updateStats();
    }
  }

  addCategory() {
    const input = document.getElementById('category-input');
    const categoryName = input.value.trim();
    
    if (!categoryName || this.categories.includes(categoryName)) return;
    
    this.categories.push(categoryName);
    this.saveCategories();
    this.renderCategories();
    this.updateCategorySelect();
    
    input.value = '';
    input.focus();
  }

  saveCategories() {
    try {
      localStorage.setItem('todoodle-categories', JSON.stringify(this.categories));
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  }

  loadCategories() {
    try {
      const saved = localStorage.getItem('todoodle-categories');
      if (saved) {
        this.categories = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      this.categories = ['General'];
    }
  }

  renderCategories() {
    const container = document.getElementById('category-filters');
    container.innerHTML = `
      <button class="category-filter ${this.currentCategory === 'all' ? 'active' : ''}" 
              onclick="app.setCategory('all')">All</button>
      ${this.categories.map(cat => `
        <button class="category-filter ${this.currentCategory === cat ? 'active' : ''}" 
                onclick="app.setCategory('${cat}')">${this.escapeHtml(cat)}</button>
        <button class="category-delete" 
                onclick="app.deleteCategory('${this.escapeHtml(cat)}')"
                title="Delete category">×</button>
      `).join('')}
    `;
  }

  updateCategorySelect() {
    const select = document.getElementById('todo-category');
    select.innerHTML = this.categories.map(cat => 
      `<option value="${cat}">${cat}</option>`
    ).join('');
  }

  setCategory(category) {
    this.currentCategory = category;
    this.renderCategories();
    this.updateCategoryProgress();
    this.render();
  }

  togglePortConfig() {
    const container = document.getElementById('port-config');
    const input = document.getElementById('port-input');
    
    if (container.style.display === 'none') {
      container.style.display = 'block';
      input.focus();
      // Try to detect current API server port
      this.detectCurrentPort();
    } else {
      container.style.display = 'none';
    }
  }

  async detectCurrentPort() {
    const possiblePorts = [3001, 3002, 3003, 8000, 8080, 6262];
    let detectedPort = null;
    
    for (const port of possiblePorts) {
      try {
        const response = await fetch(`http://localhost:${port}/api/health`, {
          method: 'GET',
          timeout: 2000
        });
        
        if (response.ok) {
          detectedPort = port;
          document.getElementById('port-input').placeholder = `Current: ${port}`;
          document.getElementById('port-input').title = `API server is running on port ${port}`;
          break;
        }
      } catch (err) {
        // Try next port
        continue;
      }
    }
    
    if (!detectedPort) {
      document.getElementById('port-input').placeholder = 'Server not detected';
      document.getElementById('port-input').title = 'API server not running on common ports';
    }
    
    return detectedPort;
  }

  async updatePort() {
    const input = document.getElementById('port-input');
    const port = parseInt(input.value);
    
    if (!port || port < 1000 || port > 65535) {
      alert('Port must be between 1000 and 65535');
      return;
    }
    
    try {
      // Get current detected port
      const currentPort = await this.detectCurrentPort();
      
      if (!currentPort) {
        alert('Could not detect running API server. Make sure it\'s running on one of the common ports.');
        return;
      }
      
      // Update port using detected current port
      const response = await fetch(`http://localhost:${currentPort}/api/config/port`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ port })
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(`Port updated to ${port}. Please restart the API server to apply changes.\n\nPrevious server was running on port ${currentPort}.\n\nAfter restart, server will run on port ${port}.`);
        this.togglePortConfig();
        
        // Clear input field
        input.value = '';
        input.placeholder = `Previous: ${currentPort}, New: ${port}`;
        
        // Try to detect new port after a short delay
        setTimeout(() => {
          this.detectCurrentPort();
        }, 2000);
        
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update port');
      }
    } catch (error) {
      alert('Failed to connect to API server. Make sure it\'s running.');
      console.error('Port update error:', error);
    }
  }

  adjustProgress(id, amount) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      this.updateProgress(id, todo.progress + amount);
    }
  }

  deleteCategory(category) {
    if (category === 'General') {
      alert('Cannot delete the "General" category');
      return;
    }
    
    // Check if category has todos
    const todosInCategory = this.todos.filter(t => t.category === category);
    if (todosInCategory.length > 0) {
      const confirmDelete = confirm(`Category "${category}" has ${todosInCategory.length} task(s). Deleting it will move all tasks to "General". Continue?`);
      if (!confirmDelete) return;
      
      // Move todos to General category
      this.todos.forEach(todo => {
        if (todo.category === category) {
          todo.category = 'General';
        }
      });
    }
    
    // Remove category
    this.categories = this.categories.filter(c => c !== category);
    this.saveCategories();
    this.renderCategories();
    this.updateCategorySelect();
    
    // If current category was deleted, switch to 'all'
    if (this.currentCategory === category) {
      this.setCategory('all');
    } else {
      this.render();
    }
  }

  getCurrentPort() {
    // Try to detect current port from API server or default to 3001
    return 3001; // This could be made dynamic
  }

  toggleNoteInput(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      // Close all other note inputs
      this.todos.forEach(t => {
        if (t.id !== id) {
          t.showNoteInput = false;
        }
      });
      
      todo.showNoteInput = !todo.showNoteInput;
      this.render();
      
      // Focus the note input if it's now visible
      if (todo.showNoteInput) {
        setTimeout(() => {
          const noteInput = document.querySelector(`.note-input`);
          if (noteInput) {
            noteInput.focus();
            noteInput.setSelectionRange(noteInput.value.length, noteInput.value.length);
          }
        }, 0);
      }
    }
  }

  applyCustomBackground(theme) {
    const bgUrl = this.customBackgrounds[theme];
    if (bgUrl) {
      // Only support local files
      document.body.style.backgroundImage = `url(${bgUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundRepeat = 'no-repeat';
    } else {
      document.body.style.backgroundImage = '';
    }
  }

  setCustomBackground(theme, url) {
    this.customBackgrounds[theme] = url;
    localStorage.setItem(`todoodle-bg-${theme}`, url);
    const currentTheme = this.darkMode ? 'light' : 'dark';
    if (theme === currentTheme) {
      this.applyCustomBackground(theme);
    }
  }

  setBackground(theme) {
    const input = document.getElementById(`bg-${theme}`);
    const url = input.value.trim();
    if (url) {
      // Only allow local files (no URLs)
      if (url.startsWith('http://') || url.startsWith('https://')) {
        alert('Only local files are allowed. Use paths like ./backgrounds/image.jpg');
        return;
      }
      this.setCustomBackground(theme, url);
      input.value = '';
    }
  }

  toggleBackgroundSettings() {
    const settings = document.getElementById('background-settings');
    const portConfig = document.getElementById('port-config');
    if (settings.style.display === 'none') {
      settings.style.display = 'block';
      portConfig.style.display = 'none';
      // Load current values
      document.getElementById('theme-selector').value = this.currentTheme;
      // Update toggle switch state
      const toggleSwitch = document.getElementById('theme-toggle');
      toggleSwitch.checked = !this.darkMode; // darkMode = false means dark mode is ON
      // Update background display
      const currentBg = this.darkMode ? this.customBackgrounds.dark : this.customBackgrounds.light;
      this.updateBackgroundDisplay(currentBg ? 'Custom' : 'None');
    } else {
      settings.style.display = 'none';
    }
  }

  toggleThemeSwitch() {
    const toggleSwitch = document.getElementById('theme-toggle');
    const isDarkMode = !toggleSwitch.checked; // Inverted: checked = light mode
    this.darkMode = isDarkMode;
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('todoodle-theme', theme);
    this.applyCustomBackground(theme);
  }

  applySelectedTheme() {
    const selector = document.getElementById('theme-selector');
    const themeName = selector.value;
    this.switchTheme(themeName);
  }

  setBackgroundFromFile() {
    const input = document.getElementById('bg-file');
    const file = input.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const theme = this.darkMode ? 'dark' : 'light';
        this.setCustomBackground(theme, dataUrl);
        this.updateBackgroundDisplay(file.name);
      };
      reader.readAsDataURL(file);
    }
  }

  updateBackgroundDisplay(filename) {
    const currentSpan = document.getElementById('bg-current');
    currentSpan.textContent = filename || 'None';
  }

  loadAvailableThemes() {
    // This will be implemented to auto-detect themes
    const themeSelector = document.getElementById('theme-selector');
    // For now, keep the hardcoded options
  }

  resetBackground() {
    const theme = this.darkMode ? 'dark' : 'light';
    this.setCustomBackground(theme, '');
    // Clear file input
    const fileInput = document.getElementById('bg-file');
    fileInput.value = '';
    // Update display
    this.updateBackgroundDisplay('None');
  }

  resetAllBackgrounds() {
    this.setCustomBackground('dark', '');
    this.setCustomBackground('light', '');
    // Clear file input
    const fileInput = document.getElementById('bg-file');
    fileInput.value = '';
    // Update display
    this.updateBackgroundDisplay('None');
  }

  loadTheme(themeName) {
    if (themeName === 'default') {
      this.removeThemeStyles();
    } else {
      this.loadThemeCSS(themeName);
    }
    this.currentTheme = themeName;
    localStorage.setItem('todoodle-custom-theme', themeName);
  }

  loadThemeCSS(themeName) {
    // Remove existing theme
    this.removeThemeStyles();
    
    // Create and load new theme
    const link = document.createElement('link');
    link.id = 'custom-theme';
    link.rel = 'stylesheet';
    link.href = `./themes/${themeName}.theme.css`;
    document.head.appendChild(link);
  }

  removeThemeStyles() {
    const existingTheme = document.getElementById('custom-theme');
    if (existingTheme) {
      existingTheme.remove();
    }
  }

  switchTheme(themeName) {
    this.loadTheme(themeName);
  }
}

// Initialize the app
const app = new TodoApp();
