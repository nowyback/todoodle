const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const app = express();
const DATA_FILE = path.join(__dirname, 'todos-api.json');
const CONFIG_FILE = path.join(__dirname, 'api-config.json');

let PORT = process.env.PORT || null;

// Check for config file
try {
  if (fs.existsSync(CONFIG_FILE)) {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    PORT = config.port || null;
  }
} catch (error) {
  console.log('No config file found, using default port');
}

// If no port configured, ask user
if (!PORT) {
  const readline = require('readline');
  
  const askForPort = () => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = `
🚀 Todoodle API Server Startup
===============================

Choose port configuration:
1) Use port 3001 (default)
2) Use port 3002
3) Use port 8000
4) Use port 8080
5) Use custom port
6) Use environment variable (PORT=xxxx)

Enter your choice (1-6): `;

    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        rl.close();
        
        switch (answer.trim()) {
          case '1':
            resolve(3001);
            break;
          case '2':
            resolve(3002);
            break;
          case '3':
            resolve(8000);
            break;
          case '4':
            resolve(8080);
            break;
          case '5':
            rl.question('Enter custom port (1000-65535): ', (customPort) => {
              rl.close();
              const portNum = parseInt(customPort);
              if (isNaN(portNum) || portNum < 1000 || portNum > 65535) {
                console.log('❌ Invalid port. Using default port 3001.');
                resolve(3001);
              } else {
                console.log(`📍 Using custom port: ${portNum}`);
                resolve(portNum);
              }
            });
            break;
          case '6':
            console.log('📍 Using environment variable PORT');
            console.log('💡 Set PORT environment variable: PORT=3002');
            console.log('💡 Then restart: npm run api');
            resolve(null); // Signal to use environment variable
            break;
          default:
            console.log('❌ Invalid choice. Using default port 3001.');
            resolve(3001);
            break;
        }
      });
    });
  };

  const checkPort = async (port) => {
    try {
      const response = await fetch(`http://localhost:${port}/api/health`, {
        method: 'GET',
        timeout: 2000
      });
      
      if (response.ok) {
        console.log(`✅ Port ${port} is available`);
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  const checkPorts = async () => {
    console.log('⏹️ Looking for available ports...');
    const commonPorts = [3001, 3002, 3003, 8000, 8080];
    let availablePort = null;
    
    for (const port of commonPorts) {
      const isAvailable = await checkPort(port);
      if (isAvailable) {
        availablePort = port;
        console.log(`✅ Port ${port} is available`);
        break;
      }
    }
    
    if (availablePort) {
      return availablePort;
    } else {
      console.log('❌ No common ports available. Using default port 3001.');
      return 3001;
    }
  };

  const startServer = () => {
    const httpServer = app.listen(PORT, () => {
      console.log(`\n🚀 Todoodle API server running on port ${PORT}`);
      console.log(`📖 API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`\n💡 To change port: PUT http://localhost:${PORT}/api/config/port {"port": 3002}`);
      console.log(`\n💡 To stop server: Press Ctrl+C\n`);
    });
    
    httpServer.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use!`);
        console.error(`💡 Try these solutions:`);
        console.error(`   1. Change port: PUT /api/config/port {"port": 3002}`);
        console.error(`   2. Kill process: Find and terminate the process using port ${PORT}`);
        console.error(`   3. Check for other apps: Maybe another API server is running`);
        console.error(`   4. Restart with different port: PORT=3002 node api-server.js`);
      } else {
        console.error(`❌ Server error:`, error);
      }
    });
  };

  askForPort().then(selectedPort => {
    if (selectedPort !== null) {
      // Environment variable mode
      if (selectedPort === null) {
        console.log('📍 Using environment variable PORT');
        PORT = process.env.PORT || 3001;
      } else {
        PORT = selectedPort;
        console.log(`📍 Using port: ${PORT}`);
      }
    } else {
      // Fallback to hardcoded if no choice made
      PORT = selectedPort;
      console.log(`📍 Using port: ${PORT}`);
    }
    
    startServer();
  });
} else {
  console.log(`📍 Using configured port: ${PORT}`);
  const startServer = () => {
    const httpServer = app.listen(PORT, () => {
      console.log(`\n🚀 Todoodle API server running on port ${PORT}`);
      console.log(`📖 API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`\n💡 To change port: PUT http://localhost:${PORT}/api/config/port {"port": 3002}`);
      console.log(`\n💡 To stop server: Press Ctrl+C\n`);
    });
    
    httpServer.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use!`);
        console.error(`💡 Try these solutions:`);
        console.error(`   1. Change port: PUT /api/config/port {"port": 3002}`);
        console.error(`   2. Kill process: Find and terminate the process using port ${PORT}`);
        console.error(`   3. Check for other apps: Maybe another API server is running`);
        console.error(`   4. Restart with different port: PORT=3002 node api-server.js`);
      } else {
        console.error(`❌ Server error:`, error);
      }
    });
  };
  startServer();
}

    console.log(`📖 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`\n💡 To change port: PUT http://localhost:${PORT}/api/config/port {"port": 3002}`);
    console.log(`\n💡 To stop server: Press Ctrl+C\n`);
  });
  
  // Handle server errors
  httpServer.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use!`);
      console.error(`💡 Try these solutions:`);
      console.error(`   1. Change port: PUT /api/config/port {"port": 3002}`);
      console.error(`   2. Kill process: Find and terminate the process using port ${PORT}`);
      console.error(`   3. Check for other apps: Maybe another API server is running`);
      console.error(`   4. Restart with different port: PORT=3002 node api-server.js`);
    } else {
      console.error(`❌ Server error:`, error);
    }
  });
}

// Middleware
app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todoodle API',
      version: '1.0.0',
      description: 'A REST API for managing developer tasks with notes and priorities',
      contact: {
        name: 'API Support',
        email: 'support@todoodle.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./api-server.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Helper functions
function loadTodos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading todos:', error);
  }
  return [];
}

function saveTodos(todos) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving todos:', error);
    return false;
  }
}

function detectPriority(text) {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('urgent') || lowerText.includes('asap') || lowerText.includes('!!!')) {
    return 'high';
  }
  if (lowerText.includes('important') || lowerText.includes('!!') || lowerText.includes('soon')) {
    return 'medium';
  }
  return 'low';
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the todo
 *           example: "1640995200000"
 *         text:
 *           type: string
 *           description: The task description
 *           example: "Fix the login bug"
 *         note:
 *           type: string
 *           description: Optional notes about the task
 *           example: "Check authentication flow"
 *         completed:
 *           type: boolean
 *           description: Whether the task is completed
 *           example: false
 *         progress:
 *           type: integer
 *           description: Progress percentage (0-100)
 *           example: 75
 *         category:
 *           type: string
 *           description: Custom category for the task
 *           example: "Development"
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           description: Task priority level
 *           example: "medium"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the task was created
 *           example: "2023-12-31T23:59:59.999Z"
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [all, active, completed]
 *         description: Filter todos by status
 *         default: all
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
app.get('/api/todos', (req, res) => {
  const { filter = 'all' } = req.query;
  let todos = loadTodos();
  
  switch (filter) {
    case 'active':
      todos = todos.filter(t => !t.completed);
      break;
    case 'completed':
      todos = todos.filter(t => t.completed);
      break;
  }
  
  res.json(todos);
});

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: The task description
 *                 example: "Implement new feature"
 *               note:
 *                 type: string
 *                 description: Optional notes
 *                 example: "Add user authentication"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Task priority (auto-detected if not provided)
 *                 example: "medium"
 *               progress:
 *                 type: integer
 *                 description: Progress percentage (0-100, defaults to 0)
 *                 example: 25
 *               category:
 *                 type: string
 *                 description: Custom category for the task
 *                 example: "Development"
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad request
 */
app.post('/api/todos', (req, res) => {
  const { text, note, priority } = req.body;
  
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required' });
  }
  
  const todos = loadTodos();
  const todo = {
    id: Date.now().toString(),
    text: text.trim(),
    note: note ? note.trim() : '',
    completed: false,
    progress: progress || 0,
    category: category || 'General',
    createdAt: new Date().toISOString(),
    priority: priority || detectPriority(text)
  };
  
  todos.unshift(todo);
  
  if (saveTodos(todos)) {
    res.status(201).json(todo);
  } else {
    res.status(500).json({ error: 'Failed to save todo' });
  }
});

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a specific todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = loadTodos();
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.json(todo);
});

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Updated task description
 *                 example: "Updated task description"
 *               note:
 *                 type: string
 *                 description: Updated notes
 *                 example: "Updated notes"
 *               completed:
 *                 type: boolean
 *                 description: Updated completion status
 *                 example: true
 *               progress:
 *                 type: integer
 *                 description: Updated progress percentage (0-100)
 *                 example: 85
 *               category:
 *                 type: string
 *                 description: Updated category
 *                 example: "Design"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Updated priority
 *                 example: "high"
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = loadTodos();
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const updates = req.body;
  todos[todoIndex] = { ...todos[todoIndex], ...updates };
  
  if (saveTodos(todos)) {
    res.json(todos[todoIndex]);
  } else {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todo deleted successfully"
 *       404:
 *         description: Todo not found
 */
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = loadTodos();
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(todoIndex, 1);
  
  if (saveTodos(todos)) {
    res.json({ message: 'Todo deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

/**
 * @swagger
 * /api/todos/stats:
 *   get:
 *     summary: Get todo statistics
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Todo statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of todos
 *                   example: 10
 *                 completed:
 *                   type: integer
 *                   description: Number of completed todos
 *                   example: 7
 *                 active:
 *                   type: integer
 *                   description: Number of active todos
 *                   example: 3
 *                 percentage:
 *                   type: number
 *                   description: Completion percentage
 *                   example: 70
 *                 priorityBreakdown:
 *                   type: object
 *                   properties:
 *                     high:
 *                       type: integer
 *                       example: 2
 *                     medium:
 *                       type: integer
 *                       example: 5
 *                     low:
 *                       type: integer
 *                       example: 3
 */
app.get('/api/todos/stats', (req, res) => {
  const todos = loadTodos();
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const priorityBreakdown = {
    high: todos.filter(t => t.priority === 'high').length,
    medium: todos.filter(t => t.priority === 'medium').length,
    low: todos.filter(t => t.priority === 'low').length
  };
  
  res.json({
    total,
    completed,
    active,
    percentage,
    priorityBreakdown
  });
});

/**
 * @swagger
 * /api/todos/categories:
 *   get:
 *     summary: Get all available categories
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Development", "Design", "Testing"]
 */

/**
 * @swagger
 * /api/config/port:
 *   put:
 *     summary: Update API server port
 *     tags: [System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - port
 *             properties:
 *               port:
 *                 type: integer
 *                 description: New port number
 *                 example: 3002
 *     responses:
 *       200:
 *         description: Port updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Port updated to 3002"
 *                 port:
 *                   type: integer
 *                   example: 3002
 */
app.put('/api/config/port', (req, res) => {
  const { port } = req.body;
  
  if (!port || port < 1000 || port > 65535) {
    return res.status(400).json({ error: 'Port must be between 1000 and 65535' });
  }
  
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ port }, null, 2));
    res.json({ 
      message: `Port updated to ${port}. Please restart the server to apply changes.`,
      port 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update port configuration' });
  }
});

app.get('/api/todos/categories', (req, res) => {
  const todos = loadTodos();
  const categories = [...new Set(todos.map(t => t.category).filter(Boolean))];
  res.json(categories);
});

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "healthy"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-12-31T23:59:59.999Z"
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Todoodle API server running on port ${PORT}`);
  console.log(`� API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.error(`💡 Try these solutions:`);
    console.error(`   1. Change port: PUT /api/config/port {"port": 3002}`);
    console.error(`   2. Kill process: Find and terminate the process using port ${PORT}`);
    console.error(`   3. Check for other apps: Maybe another API server is running`);
    console.error(`   4. Restart with different port: PORT=3002 node api-server.js`);
  } else {
    console.error(`❌ Server error:`, error);
  }
});

module.exports = app;
