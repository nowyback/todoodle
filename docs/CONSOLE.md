# Todoodle Console - Command Line Todo Manager

A full-featured command-line version of Todoodle for terminal users and automation.

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/nowyback/todoodle.git
cd todoodle

# Install dependencies
npm install

# Start console app
npm run console
```

### Direct Usage
```bash
# Run directly with Node.js
node console.js
```

## 📋 Commands

### 📝 Basic Todo Management
```bash
# Add new todo
add "Buy milk" Shopping
add "Finish project" Work
add "Call mom" Personal

# List todos
list

# Toggle completion
toggle 1
toggle 2

# Delete todo
delete 3
```

### 📊 Progress Tracking
```bash
# Set progress (0-100%)
progress 1 25
progress 2 75
progress 3 100

# Add notes
note 1 "Remember to check expiration date"
note 2 "Review with team tomorrow"
```

### 📁 Category Management
```bash
# List all categories
list-categories

# Switch to category
category Shopping
category Work

# Add new category
add-category Health
add-category Learning

# Set current category
set-category Personal
```

### 🔍 Search & Statistics
```bash
# Search todos
search "milk"
search "project"
search "urgent"

# Show statistics
stats
```

### 🎯 Navigation & Control
```bash
# Show help
help

# Clear screen
clear

# Exit app
exit
quit
```

## 💡 Usage Examples

### Daily Workflow
```bash
# Start your day
npm run console

# Add tasks
add "Morning coffee" Personal
add "Team standup" Work
add "Review pull requests" Work
add "Grocery shopping" Shopping

# Check progress
list
stats

# Complete tasks
toggle 1
toggle 2

# Add notes
note 3 "Check PR #123 first"

# End of day
stats
exit
```

### Project Management
```bash
# Create project category
add-category "Website Redesign"

# Add project tasks
add "Design mockups" "Website Redesign"
add "Implement homepage" "Website Redesign"
add "Test responsive design" "Website Redesign"

# Track progress
progress 1 100
progress 2 50
progress 3 0

# Check project status
category "Website Redesign"
list
stats
```

### Shopping Lists
```bash
# Add shopping items
add "Milk" Shopping
add "Bread" Shopping
add "Eggs" Shopping
add "Coffee" Shopping

# Shopping mode
category Shopping
list

# Mark items as bought
toggle 1
toggle 3

# Check what's left
list
```

## 📊 Data Storage

### File Location
- **File**: `todos-console.json`
- **Location**: Same directory as `console.js`
- **Format**: JSON

### Data Structure
```json
[
  {
    "id": "1640995200000",
    "text": "Buy milk",
    "completed": false,
    "category": "Shopping",
    "progress": 0,
    "createdAt": "2021-12-31T23:20:00.000Z",
    "note": "Check expiration date"
  }
]
```

## 🔧 Advanced Features

### Batch Operations
```bash
# Add multiple tasks quickly
add "Task 1" Work
add "Task 2" Work
add "Task 3" Work

# Mark multiple as complete
toggle 1
toggle 2
toggle 3
```

### Search & Filter
```bash
# Find all work-related tasks
search "Work"

# Find tasks with specific keywords
search "urgent"
search "review"
search "meeting"
```

### Progress Tracking
```bash
# Set incremental progress
progress 1 25
progress 1 50
progress 1 75
progress 1 100

# Progress automatically marks as complete at 100%
```

### Note Taking
```bash
# Add detailed notes
note 1 "Client wants this by Friday"
note 2 "Remember to check accessibility"
note 3 "Coordinate with design team"
```

## 🎯 Tips & Tricks

### Productivity Tips
1. **Use categories** to organize different areas of life
2. **Set progress** to track long-term tasks
3. **Add notes** for important details
4. **Use search** to find specific tasks quickly
5. **Check stats** to monitor productivity

### Command Shortcuts
- Use `l` instead of `list`
- Use `a` instead of `add`
- Use `t` instead of `toggle`
- Use `d` instead of `delete`
- Use `s` instead of `stats`

### Automation
```bash
# Create daily tasks script
echo 'add "Daily standup" Work
add "Check emails" Work
add "Review calendar" Work' | npm run console

# Backup todos
cp todos-console.json todos-backup-$(date +%Y%m%d).json
```

## 🔍 Command Reference

### Complete Command List
| Command | Arguments | Description |
|---------|-----------|-------------|
| `add` | `<text> [category]` | Add new todo |
| `list` | - | List todos |
| `toggle` | `<id>` | Toggle completion |
| `delete` | `<id>` | Delete todo |
| `progress` | `<id> <0-100>` | Set progress |
| `note` | `<id> <text>` | Add note |
| `category` | `<name>` | Switch category |
| `list-categories` | - | List categories |
| `add-category` | `<name>` | Add category |
| `set-category` | `<name>` | Set category |
| `search` | `<query>` | Search todos |
| `stats` | - | Show statistics |
| `help` | - | Show help |
| `clear` | - | Clear screen |
| `exit/quit` | - | Exit app |

## 🚀 Integration

### With Other Tools
```bash
# Use with cron for daily tasks
echo "add 'Daily backup' System" | npm run console

# Pipe from other commands
git status --porcelain | cut -c4- | xargs -I {} add "Fix {}" Work

# Export to other formats
node -e "console.log(JSON.stringify(require('./console.js').todos, null, 2))"
```

### Shell Aliases
```bash
# Add to ~/.bashrc or ~/.zshrc
alias todo="npm run console"
alias todos="npm run console"
alias t="npm run console"
```

## 🐛 Troubleshooting

### Common Issues
- **File not found**: Ensure you're in the correct directory
- **Permission denied**: Check file permissions for `todos-console.json`
- **Command not found**: Ensure Node.js is installed and in PATH

### Data Recovery
```bash
# Find backup files
ls todos-backup-*.json

# Restore from backup
cp todos-backup-20211231.json todos-console.json
```

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details
