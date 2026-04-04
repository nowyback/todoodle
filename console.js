#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class ConsoleTodoApp {
    constructor() {
        this.todos = [];
        this.categories = ['General'];
        this.currentCategory = 'all';
        this.dataFile = path.join(__dirname, 'todos-console.json');
        this.loadTodos();
        this.loadCategories();
    }

    loadTodos() {
        try {
            if (fs.existsSync(this.dataFile)) {
                const data = fs.readFileSync(this.dataFile, 'utf8');
                this.todos = JSON.parse(data);
            }
        } catch (error) {
            console.log('No existing todos found, starting fresh.');
        }
    }

    saveTodos() {
        try {
            fs.writeFileSync(this.dataFile, JSON.stringify(this.todos, null, 2));
        } catch (error) {
            console.error('Error saving todos:', error.message);
        }
    }

    loadCategories() {
        const categories = [...new Set(this.todos.map(todo => todo.category).filter(Boolean))];
        if (categories.length > 0) {
            this.categories = ['General', ...categories];
        }
    }

    addTodo(text, category = 'General') {
        const todo = {
            id: Date.now().toString(),
            text: text,
            completed: false,
            category: category,
            progress: 0,
            createdAt: new Date().toISOString(),
            note: ''
        };
        this.todos.push(todo);
        this.saveTodos();
        this.loadCategories();
        console.log(`✅ Added: "${text}" to ${category}`);
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.progress = todo.completed ? 100 : 0;
            this.saveTodos();
            console.log(`✓ ${todo.completed ? 'Completed' : 'Uncompleted'}: "${todo.text}"`);
        } else {
            console.log('❌ Todo not found');
        }
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
            const deleted = this.todos.splice(index, 1)[0];
            this.saveTodos();
            console.log(`🗑️ Deleted: "${deleted.text}"`);
        } else {
            console.log('❌ Todo not found');
        }
    }

    updateProgress(id, progress) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.progress = Math.max(0, Math.min(100, progress));
            todo.completed = todo.progress === 100;
            this.saveTodos();
            console.log(`📊 Updated progress: "${todo.text}" - ${todo.progress}%`);
        } else {
            console.log('❌ Todo not found');
        }
    }

    addNote(id, note) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.note = note;
            this.saveTodos();
            console.log(`📝 Added note to: "${todo.text}"`);
        } else {
            console.log('❌ Todo not found');
        }
    }

    listTodos() {
        const filteredTodos = this.currentCategory === 'all' 
            ? this.todos 
            : this.todos.filter(todo => todo.category === this.currentCategory);

        if (filteredTodos.length === 0) {
            console.log('📝 No todos found');
            return;
        }

        console.log(`\n📋 Todos (${this.currentCategory === 'all' ? 'All' : this.currentCategory}):\n`);
        
        filteredTodos.forEach((todo, index) => {
            const status = todo.completed ? '✅' : '⭕';
            const progressBar = todo.progress > 0 ? `[${todo.progress}%]` : '';
            const note = todo.note ? `\n   📝 ${todo.note}` : '';
            
            console.log(`${index + 1}. ${status} ${todo.text} ${progressBar} (${todo.category})${note}`);
        });
        
        console.log(`\n📊 Stats: ${filteredTodos.filter(t => t.completed).length}/${filteredTodos.length} completed`);
    }

    listCategories() {
        console.log('\n📁 Categories:');
        this.categories.forEach((cat, index) => {
            const count = cat === 'all' ? this.todos.length : this.todos.filter(t => t.category === cat).length;
            const current = cat === this.currentCategory ? ' ←' : '';
            console.log(`${index + 1}. ${cat} (${count})${current}`);
        });
    }

    setCategory(category) {
        if (category === 'all' || this.categories.includes(category)) {
            this.currentCategory = category;
            console.log(`📁 Switched to: ${category === 'all' ? 'All Categories' : category}`);
        } else {
            console.log('❌ Category not found');
        }
    }

    addCategory(name) {
        if (!this.categories.includes(name) && name !== 'all') {
            this.categories.push(name);
            console.log(`📁 Added category: ${name}`);
        } else {
            console.log('❌ Category already exists');
        }
    }

    searchTodos(query) {
        const results = this.todos.filter(todo => 
            todo.text.toLowerCase().includes(query.toLowerCase()) ||
            todo.note.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length === 0) {
            console.log(`🔍 No results found for: "${query}"`);
            return;
        }

        console.log(`\n🔍 Search results for "${query}":\n`);
        results.forEach((todo, index) => {
            const status = todo.completed ? '✅' : '⭕';
            const note = todo.note ? `\n   📝 ${todo.note}` : '';
            console.log(`${index + 1}. ${status} ${todo.text} (${todo.category})${note}`);
        });
    }

    showStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        console.log('\n📊 Statistics:');
        console.log(`   Total todos: ${total}`);
        console.log(`   Completed: ${completed}`);
        console.log(`   Pending: ${pending}`);
        console.log(`   Completion rate: ${completionRate}%`);

        console.log('\n📁 Categories:');
        this.categories.filter(cat => cat !== 'all').forEach(cat => {
            const catTodos = this.todos.filter(t => t.category === cat);
            const catCompleted = catTodos.filter(t => t.completed).length;
            console.log(`   ${cat}: ${catCompleted}/${catTodos.length}`);
        });
    }

    showHelp() {
        console.log(`
📝 Todoodle Console - Commands:

📋 BASIC:
  add <text> [category]     Add new todo
  list                      List todos
  list-categories           List categories
  category <name>           Switch to category
  
🔧 TODO MANAGEMENT:
  toggle <id>               Toggle todo completion
  delete <id>               Delete todo
  progress <id> <0-100>     Set progress (0-100)
  note <id> <text>          Add note to todo
  
📁 CATEGORIES:
  add-category <name>       Add new category
  set-category <name>       Switch to category
  
🔍 SEARCH & STATS:
  search <query>            Search todos
  stats                     Show statistics
  
🎯 OTHER:
  help                      Show this help
  clear                     Clear screen
  exit/quit                 Exit app

💡 EXAMPLES:
  add "Buy milk" Shopping
  add "Finish project" Work
  toggle 1
  progress 2 75
  note 3 "Remember to review"
  search "milk"
  category Shopping
`);
    }

    clearScreen() {
        console.clear();
    }
}

class ConsoleInterface {
    constructor() {
        this.app = new ConsoleTodoApp();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '📝 Todoodle> '
        });
        this.commands = {
            'add': this.handleAdd.bind(this),
            'list': this.handleList.bind(this),
            'toggle': this.handleToggle.bind(this),
            'delete': this.handleDelete.bind(this),
            'progress': this.handleProgress.bind(this),
            'note': this.handleNote.bind(this),
            'category': this.handleCategory.bind(this),
            'list-categories': this.handleListCategories.bind(this),
            'add-category': this.handleAddCategory.bind(this),
            'set-category': this.handleSetCategory.bind(this),
            'search': this.handleSearch.bind(this),
            'stats': this.handleStats.bind(this),
            'help': this.handleHelp.bind(this),
            'clear': this.handleClear.bind(this),
            'exit': this.handleExit.bind(this),
            'quit': this.handleExit.bind(this)
        };
    }

    start() {
        console.clear();
        console.log('📝 Welcome to Todoodle Console!');
        console.log('Type "help" for commands or "exit" to quit.\n');
        this.rl.prompt();

        this.rl.on('line', (input) => {
            this.handleInput(input.trim());
            this.rl.prompt();
        });

        this.rl.on('close', () => {
            console.log('\n👋 Goodbye!');
            process.exit(0);
        });
    }

    handleInput(input) {
        if (!input) return;

        const parts = input.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (this.commands[command]) {
            this.commands[command](args);
        } else {
            console.log(`❌ Unknown command: ${command}. Type "help" for available commands.`);
        }
    }

    handleAdd(args) {
        if (args.length === 0) {
            console.log('❌ Please provide todo text: add "Buy milk" [category]');
            return;
        }

        const text = args.join(' ').replace(/['"]/g, '');
        const categoryMatch = text.match(/\s+(.+)$/);
        const todoText = categoryMatch ? text.substring(0, categoryMatch.index).trim() : text;
        const category = categoryMatch ? categoryMatch[1].trim() : 'General';

        this.app.addTodo(todoText, category);
    }

    handleList(args) {
        this.app.listTodos();
    }

    handleToggle(args) {
        if (args.length === 0) {
            console.log('❌ Please provide todo ID: toggle 1');
            return;
        }
        const id = this.app.todos[parseInt(args[0]) - 1]?.id;
        if (id) {
            this.app.toggleTodo(id);
        } else {
            console.log('❌ Invalid todo number');
        }
    }

    handleDelete(args) {
        if (args.length === 0) {
            console.log('❌ Please provide todo ID: delete 1');
            return;
        }
        const id = this.app.todos[parseInt(args[0]) - 1]?.id;
        if (id) {
            this.app.deleteTodo(id);
        } else {
            console.log('❌ Invalid todo number');
        }
    }

    handleProgress(args) {
        if (args.length < 2) {
            console.log('❌ Please provide todo ID and progress: progress 1 75');
            return;
        }
        const id = this.app.todos[parseInt(args[0]) - 1]?.id;
        const progress = parseInt(args[1]);
        if (id && !isNaN(progress)) {
            this.app.updateProgress(id, progress);
        } else {
            console.log('❌ Invalid todo number or progress');
        }
    }

    handleNote(args) {
        if (args.length < 2) {
            console.log('❌ Please provide todo ID and note: note 1 "Remember to call"');
            return;
        }
        const id = this.app.todos[parseInt(args[0]) - 1]?.id;
        const note = args.slice(1).join(' ').replace(/['"]/g, '');
        if (id) {
            this.app.addNote(id, note);
        } else {
            console.log('❌ Invalid todo number');
        }
    }

    handleCategory(args) {
        if (args.length === 0) {
            console.log('❌ Please provide category name: category Shopping');
            return;
        }
        this.app.setCategory(args.join(' '));
    }

    handleListCategories(args) {
        this.app.listCategories();
    }

    handleAddCategory(args) {
        if (args.length === 0) {
            console.log('❌ Please provide category name: add-category Work');
            return;
        }
        this.app.addCategory(args.join(' '));
    }

    handleSetCategory(args) {
        if (args.length === 0) {
            console.log('❌ Please provide category name: set-category Shopping');
            return;
        }
        this.app.setCategory(args.join(' '));
    }

    handleSearch(args) {
        if (args.length === 0) {
            console.log('❌ Please provide search query: search milk');
            return;
        }
        this.app.searchTodos(args.join(' '));
    }

    handleStats(args) {
        this.app.showStats();
    }

    handleHelp(args) {
        this.app.showHelp();
    }

    handleClear(args) {
        this.app.clearScreen();
    }

    handleExit(args) {
        this.rl.close();
    }
}

// Start the console app
if (require.main === module) {
    const consoleApp = new ConsoleInterface();
    consoleApp.start();
}

module.exports = ConsoleTodoApp;
