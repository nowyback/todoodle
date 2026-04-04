# Todoodle v0.11.3 Release Notes

## 🎉 New Features

### ✨ Custom Theme Support
- **Auto-Detection**: Drop `.theme.css` files in themes folder and they appear automatically
- **Dynamic Loading**: No restart required - themes appear instantly in settings
- **Example Theme**: `example-custom.theme.css` included as a starting point
- **Comprehensive Documentation**: Updated README with detailed theme creation guide

### 🎨 Enhanced Theme System
- **Glass Morphism**: All themes now feature advanced glass effects
- **Smooth Corners**: Rounded borders and modern styling
- **Hover Animations**: Interactive effects on all UI elements
- **Light/Dark Mode**: Full support for both modes in custom themes

### 🛠️ UI Improvements
- **Wider Settings**: Theme settings box now 400px wide (was 320px)
- **Better Layout**: Improved button sizing and spacing
- **Enhanced Borders**: Subtle borders and padding for better visual hierarchy
- **Responsive Design**: Better adaptation to different screen sizes

### 🔧 Bug Fixes
- **Port Configuration**: Fixed timeout handling and error messages
- **Theme Loading**: Improved reliability and error handling
- **File Structure**: Cleaned up unnecessary files and improved organization
- **Performance**: Optimized theme switching and loading

## 📁 File Structure

### Themes Folder
```
themes/
├── dark-matter.theme.css      # Blue frosty theme
├── fallout-terminal.theme.css # Green terminal theme  
├── translucent.theme.css      # Modern glass theme
├── example-custom.theme.css  # Template for custom themes
└── README.md                # Complete theme creation guide
```

### Creating Custom Themes
1. Copy `example-custom.theme.css`
2. Rename to `your-theme.theme.css`
3. Modify colors and styles
4. Drop in themes folder
5. Select in settings (Ctrl+B)

## 🚀 Installation

### Windows Installer
- **File**: `Todoodle Setup 0.11.0.exe`
- **Size**: ~85MB
- **Requirements**: Windows 10 or later

### Installation Steps
1. Download [Todoodle Setup 0.11.3.exe](https://www.dropbox.com/scl/fi/68s345s0s91vejpv8yk1d/Todoodle-Setup-0.11.3.exe?rlkey=jmfrgsm9n0rwk7uvw79j5j0po&st=4px93z8j&dl=0)
2. Run installer as administrator
3. Choose installation directory
4. Create desktop shortcut (optional)
5. Launch Todoodle

## 🎯 Usage Tips

### Theme Customization
- Press `Ctrl+B` to open theme settings
- Use the toggle switch for dark/light mode
- Select custom themes from dropdown
- Apply background images from local files

### Keyboard Shortcuts
- `Ctrl+N`: New task
- `Ctrl+B`: Theme settings
- `Ctrl+P`: Port configuration

## 🐛 Troubleshooting

### Theme Not Appearing
- Check file ends with `.theme.css`
- Verify file is in `src/themes/` folder
- Reopen theme settings

### Installation Issues
- Run installer as administrator
- Temporarily disable antivirus
- Ensure sufficient disk space

## 📝 Developer Notes

### Technical Changes
- Updated theme detection system with async loading
- Improved error handling for API server connections
- Enhanced CSS variables for better theming
- Cleaned up build artifacts and old files

### Known Issues
- None reported in this version

---

**Thank you for using Todoodle!** 🎉

For support and updates, check the project repository.
