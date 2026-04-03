# Todoodle - A Minimalist Task Manager for Developers

A sleek, feature-rich todo application built with Electron and Express, designed specifically for developers who want both a beautiful desktop app and a powerful REST API.

## 🎨 Desktop App
- **Minimalist UI** with smooth black background (#020202)
- **Individual task progress** with color-coded sliders (0-100%)
- **Custom categories** with filtering and sorting
- **Notes functionality** for detailed task descriptions
- **Priority detection** based on keywords (urgent, important, etc.)
- **Dark/Light theme** toggle (Ctrl+D)
- **Keyboard shortcuts** for power users
- **Local storage** persistence

### 📊 Progress Tracking
- **Overall progress bar** showing total completion
- **Category-specific progress** when filtering by category
- **Color-coded progress**: Red (0-39%) → Orange (40-69%) → Yellow (70-89%) → Green (90-99%) → Purple (100%)
- **Real-time updates** as you complete tasks

### 🌐 REST API
- **Full OpenAPI documentation** at `/api-docs`
- **Configurable port** via UI or API endpoint
- **CRUD operations** for todos
- **Category management** endpoints
- **Statistics endpoint** for analytics
- **CORS enabled** for external integrations

## 🚀 Quick Start

### Option 1: Install as Windows App (Recommended)
```bash
# Download the latest installer from dist/ folder
# Run Todoodle Setup 0.7.1.exe
# Install and search "Todoodle" in Windows Start Menu
```

### Option 2: Development Mode
```bash
# Install dependencies
npm install

# Start the desktop app
npm start

# Development mode with DevTools
npm run dev
```

### API Server
```bash
# Start API server (default port 3001)
npm run api

# Development mode
npm run api-dev
```

### Access Points
- **Desktop App**: Launches automatically
- **API Documentation**: http://localhost:3001/api-docs
- **Health Check**: http://localhost:3001/api/health
- **Port Configuration**: Use Ctrl+P in the app

## 🎮 Usage

### Desktop App
- **Ctrl+N**: Focus new task input
- **Ctrl+D**: Toggle dark/light theme
- **Ctrl+P**: Open port configuration
- **Drag sliders** to adjust task progress
- **Click categories** to filter tasks
- **Add notes** for detailed task information

### API Endpoints
```bash
# Get all todos
GET /api/todos

# Create todo
POST /api/todos
{
  "text": "Fix the bug",
  "note": "Check authentication",
  "category": "Development",
  "priority": "high",
  "progress": 25
}

# Update todo
PUT /api/todos/:id

# Delete todo
DELETE /api/todos/:id

# Get categories
GET /api/todos/categories

# Get statistics
GET /api/todos/stats

# Update port
PUT /api/config/port
{
  "port": 3002
}
```

## 📁 Project Structure

```
├── src/
│   ├── main.js           # Electron main process
│   ├── preload.js        # Electron preload script
│   ├── index.html        # Desktop app UI
│   ├── styles.css        # Styling
│   ├── script.js         # Frontend logic
│   ├── api-server.js     # Express API server
│   ├── logo.svg          # Custom app logo
│   └── icon.ico          # Windows icon (convert from SVG)
├── dist/                 # Built executables
├── package.json          # Dependencies and scripts
├── create-shortcut.bat   # Desktop shortcut creator
└── README.md             # This file
```

## 🛠️ Technology Stack

### Desktop App
- **Electron** - Cross-platform desktop framework
- **Vanilla JavaScript** - No frontend framework dependencies
- **CSS Variables** - Dynamic theming
- **Local Storage** - Client-side persistence

### API Server
- **Express.js** - Web framework
- **Swagger/OpenAPI** - API documentation
- **CORS** - Cross-origin requests
- **JSON File Storage** - Simple data persistence

## 🎨 Customization

### Logo & Branding
- **Logo**: Edit `src/logo.svg` - rounded corner design with black background
- **Icon**: Convert `src/logo.svg` to `src/icon.ico` for Windows
- **Recommended Converter**: https://convertio.co/svg-ico/

### Themes
The app uses CSS variables for easy theming:
```css
:root {
  --primary-color: #6366f1;
  --background: #020202;
  --text-primary: #ffffff;
  /* ... more variables */
}
```

### Categories
Add custom categories through the UI:
1. Type category name in "Add new category"
2. Press Enter or click "Add Category"
3. Select category when creating tasks

## 🔧 Configuration

### Port Configuration
- **UI**: Press Ctrl+P → Enter new port → Update
- **API**: `PUT /api/config/port` with `{"port": 3002}`
- **File**: Creates `api-config.json` with port settings

### Data Storage
- **Desktop App**: `localStorage` (browser storage)
- **API Server**: `todos-api.json` (file-based)
- **Categories**: `localStorage` (browser storage)

## 📝 Development

### Adding Features
1. **Frontend**: Edit `script.js` and `styles.css`
2. **API**: Modify `api-server.js`
3. **Electron**: Update `main.js` or `preload.js`

### Building for Production
```bash
# Create Windows installer
npm run dist-win

# Create portable executable
npm run portable

# Package without installer (for testing)
npm run pack
```

### Installation & Distribution
- **Installer**: `dist/Todoodle Setup 0.7.1.exe` - Full Windows installer with Start Menu integration
- **Portable**: Run `npm run portable` for standalone executable
- **Desktop Shortcut**: Use `create-shortcut.bat` for quick access during development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Donating

To help me further programm stuff, please consider donating to my patreon: https://www.patreon.com/nowyback

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Elements and Base

- **Electron** for the desktop framework
- **Express.js** for the API server
- **Swagger UI** for API documentation
- **Inter Font** for the beautiful typography

---

**Made with love by CHROMESHOT Studios**
