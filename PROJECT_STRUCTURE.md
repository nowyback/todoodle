# 📁 Todoodle Project Structure

A clean, organized structure for the Todoodle application.

## 🗂 **Root Directory**

```
todoodle/
├── 📁 src/                    # Source code
├── 📁 docs/                   # Documentation
├── 📁 mobile/                 # Mobile app files
├── 📁 node_modules/           # Dependencies
├── 📄 package.json           # Project config
├── 📄 package-lock.json      # Dependency lock
├── 📄 .gitignore            # Git ignore rules
└── 📄 start.bat             # Windows start script
```

## 📂 **Source Code (`src/`)**

```
src/
├── 📄 main.js              # Electron main process
├── 📄 preload.js           # Electron preload script
├── 📄 index.html           # Web app HTML
├── 📄 styles.css           # Application styles
├── 📄 script.js            # Frontend logic
├── 📄 api-server.js        # REST API server
├── 📄 manifest.json        # PWA manifest
└── 📄 sw.js               # Service worker
```

## 📂 **Documentation (`docs/`)**

```
docs/
├── 📄 README.md              # Main documentation
├── 📄 API_CONNECTION_GUIDE.md # API integration guide
├── 📄 DEPLOYMENT_GUIDE.md    # Deployment options
├── 📄 MOBILE_BUILD_GUIDE.md # Mobile app building
├── 📄 QUICK_PHONE_SETUP.md  # Quick phone setup
└── 📄 PROJECT_STRUCTURE.md    # This file
```

## 📂 **Mobile (`mobile/`)**

```
mobile/
├── 📄 capacitor.config.json  # Capacitor configuration
├── 📁 android/              # Android project files
└── 📁 www/                 # Web assets for mobile
```

## 🎯 **File Purposes**

### **Core Application**
- `src/main.js` - Electron desktop app entry point
- `src/preload.js` - Security bridge between main and renderer
- `src/index.html` - Web app interface
- `src/styles.css` - UI styling and themes
- `src/script.js` - Frontend JavaScript logic
- `src/api-server.js` - Express REST API server

### **Progressive Web App**
- `src/manifest.json` - PWA configuration and metadata
- `src/sw.js` - Service worker for offline support

### **Mobile Application**
- `mobile/capacitor.config.json` - Capacitor mobile framework config
- `mobile/android/` - Native Android project
- `mobile/www/` - Web assets copied to mobile app

### **Documentation**
- `docs/README.md` - Project overview and setup
- `docs/API_CONNECTION_GUIDE.md` - External API integration
- `docs/DEPLOYMENT_GUIDE.md` - Cloud deployment options
- `docs/MOBILE_BUILD_GUIDE.md` - APK building instructions
- `docs/QUICK_PHONE_SETUP.md` - Quick phone installation

## 🚀 **Development Workflow**

### **Desktop Development**
```bash
npm start              # Start Electron app
npm run dev            # Development mode with DevTools
```

### **API Development**
```bash
npm run api            # Start API server
npm run api-dev        # Development with auto-restart
```

### **Mobile Development**
```bash
npm run capacitor:add     # Setup mobile project
npm run capacitor:sync  # Sync web to mobile
npm run capacitor:open  # Open Android Studio
```

## 📦 **Build Outputs**

### **API Server**
- Runs on configurable port (default: 3001)
- Serves REST API with OpenAPI docs
- Stores data in `todos-api.json`

### **Web App**
- Progressive Web App ready
- Works in any modern browser
- Offline capable with service worker

### **Mobile APK**
- Generated in `mobile/android/app/build/outputs/apk/`
- Requires Android Studio or manual Gradle build
- Full native Android application

## 🎨 **Technology Stack**

### **Desktop**
- **Electron** - Cross-platform desktop framework
- **Vanilla JS** - No frontend framework dependencies
- **CSS Variables** - Dynamic theming system

### **API**
- **Express.js** - Web framework
- **Swagger/OpenAPI** - API documentation
- **JSON Storage** - Simple file-based persistence

### **Mobile**
- **Capacitor** - Modern hybrid app framework
- **Android Studio** - Native APK building
- **PWA** - Web-based mobile app

---

**Clean, organized, and ready for development!** 🎉
