# Todoodle Server Setup

This guide explains how to set up Todoodle with a backend server for advanced functionality.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm package manager
- Terminal or command prompt
- Git (for cloning)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nowyback/todoodle.git
   cd todoodle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm run server
   ```

4. **Start the application**
   ```bash
   npm start
   ```

The server will run on `http://localhost:3001` by default.

## 📋 Available Scripts

### Development
- `npm start` - Start the Electron app
- `npm run server` - Start the API server
- `npm run dev` - Start both server and app (if configured)

### Building
- `npm run dist-win` - Build Windows installer
- `npm run dist-mac` - Build macOS installer
- `npm run dist-linux` - Build Linux AppImage

### Mobile
- `npm run mobile:android` - Build Android app
- `npm run mobile:ios` - Build iOS app

## 🔧 Server Configuration

### Default Settings
- **Port**: 3001
- **Host**: localhost
- **Data Storage**: Local JSON files

### Port Configuration
You can change the server port through the app:
1. Open Todoodle
2. Press `Ctrl+B` to open settings
3. Click port configuration
4. Enter new port number
5. Click update

### Available Endpoints

#### Health Check
```http
GET /api/health
```

#### Port Configuration
```http
PUT /api/config/port
Content-Type: application/json

{
  "port": 3002
}
```

#### Data Management
```http
GET /api/todos          # Get all todos
POST /api/todos         # Create todo
PUT /api/todos/:id     # Update todo
DELETE /api/todos/:id   # Delete todo
```

## 📁 Project Structure

```
todoodle/
├── src/
│   ├── main.js          # Electron main process
│   ├── script.js        # Frontend logic
│   ├── styles.css       # App styling
│   ├── index.html       # Main HTML
│   ├── api-server.js    # Backend server
│   └── themes/          # Custom themes
├── docs/               # Documentation
├── mobile/             # Mobile app
└── dist/               # Build output
```

## 🌐 Network Access

### Local Network
To access Todoodle from other devices on your network:
1. Start the server
2. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Access via: `http://YOUR_IP:3001`

### Firewall Settings
Make sure port 3001 (or your custom port) is allowed through:
- Windows Firewall
- Network router
- Any antivirus software

## 🔒 Security Considerations

### Development Mode
- Server runs on localhost only
- No authentication required
- Data stored locally

### Production Deployment
For production use, consider:
- HTTPS/SSL certificates
- User authentication
- Database integration
- Rate limiting
- Input validation

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
Error: listen EADDRINUSE :::3001
```
**Solution**: Change the port in settings or kill the process:
```bash
# Find process
netstat -ano | findstr :3001
# Kill process
taskkill /PID <PID> /F
```

#### Server Won't Start
```bash
Error: Cannot find module 'express'
```
**Solution**: Install dependencies:
```bash
npm install
```

#### App Won't Connect to Server
**Solution**: Check if server is running:
```bash
curl http://localhost:3001/api/health
```

### Debug Mode
Enable debug logging:
```bash
DEBUG=todoodle:* npm run server
```

## 📱 Mobile Development

### Android Setup
1. Install Android Studio
2. Set up Android SDK
3. Run: `npm run mobile:android`

### iOS Setup
1. Install Xcode
2. Set up iOS simulator
3. Run: `npm run mobile:ios`

## 🚀 Deployment

### Docker Setup
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "server"]
```

### Environment Variables
```bash
PORT=3001
NODE_ENV=production
DATA_PATH=./data
```

## 📚 Additional Resources

- [Electron Documentation](https://electronjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details
