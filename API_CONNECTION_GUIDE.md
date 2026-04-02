# API Connection Guide

This guide shows how to connect external applications, scripts, or services to your Dev Todo app.

## 🌐 API Endpoints

### Base URL
```
http://localhost:3001
```
*Note: Port may be different if you changed it via Ctrl+P*

### Authentication
Currently **no authentication** required (open API).

## 📝 Available Endpoints

### 📋 Todo Management

#### Get All Todos
```bash
GET /api/todos
```

**Query Parameters:**
- `filter` (optional): `all`, `active`, or `completed`
- `category` (optional): Filter by specific category

**Example:**
```bash
curl "http://localhost:3001/api/todos?filter=active&category=Development"
```

#### Create Todo
```bash
POST /api/todos
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Fix the login bug",
  "note": "Check authentication flow",
  "category": "Development",
  "priority": "high",
  "progress": 25
}
```

**Example:**
```bash
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Fix the login bug",
    "note": "Check authentication flow",
    "category": "Development",
    "priority": "high",
    "progress": 25
  }'
```

#### Get Specific Todo
```bash
GET /api/todos/:id
```

**Example:**
```bash
curl http://localhost:3001/api/todos/1640995200000
```

#### Update Todo
```bash
PUT /api/todos/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Updated task description",
  "note": "Updated notes",
  "category": "Updated category",
  "completed": true,
  "progress": 100,
  "priority": "medium"
}
```

**Example:**
```bash
curl -X PUT http://localhost:3001/api/todos/1640995200000 \
  -H "Content-Type: application/json" \
  -d '{
    "progress": 75,
    "completed": false
  }'
```

#### Delete Todo
```bash
DELETE /api/todos/:id
```

**Example:**
```bash
curl -X DELETE http://localhost:3001/api/todos/1640995200000
```

### 📁 Category Management

#### Get All Categories
```bash
GET /api/todos/categories
```

**Example:**
```bash
curl http://localhost:3001/api/todos/categories
```

**Response:**
```json
["Development", "Design", "Testing", "General"]
```

### 📊 Statistics

#### Get Todo Statistics
```bash
GET /api/todos/stats
```

**Example:**
```bash
curl http://localhost:3001/api/todos/stats
```

**Response:**
```json
{
  "total": 10,
  "completed": 7,
  "active": 3,
  "percentage": 70,
  "priorityBreakdown": {
    "high": 2,
    "medium": 5,
    "low": 3
  }
}
```

### ⚙️ System Configuration

#### Health Check
```bash
GET /api/health
```

**Example:**
```bash
curl http://localhost:3001/api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2023-12-31T23:59:59.999Z"
}
```

#### Update Port Configuration
```bash
PUT /api/config/port
Content-Type: application/json
```

**Request Body:**
```json
{
  "port": 3002
}
```

**Example:**
```bash
curl -X PUT http://localhost:3001/api/config/port \
  -H "Content-Type: application/json" \
  -d '{"port": 3002}'
```

## 🔧 Connection Examples

### JavaScript/Node.js
```javascript
const API_BASE = 'http://localhost:3001';

// Get all todos
async function getTodos() {
  const response = await fetch(`${API_BASE}/api/todos`);
  const todos = await response.json();
  return todos;
}

// Create a new todo
async function createTodo(todoData) {
  const response = await fetch(`${API_BASE}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData)
  });
  return await response.json();
}

// Update todo progress
async function updateProgress(id, progress) {
  const response = await fetch(`${API_BASE}/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ progress })
  });
  return await response.json();
}

// Usage
const newTodo = await createTodo({
  text: "Implement new feature",
  category: "Development",
  priority: "high",
  progress: 0
});

console.log('Created todo:', newTodo);
```

### Python
```python
import requests
import json

API_BASE = 'http://localhost:3001'

def get_todos():
    response = requests.get(f'{API_BASE}/api/todos')
    return response.json()

def create_todo(text, category='General', priority='low'):
    todo_data = {
        'text': text,
        'category': category,
        'priority': priority,
        'progress': 0
    }
    response = requests.post(
        f'{API_BASE}/api/todos',
        json=todo_data
    )
    return response.json()

# Usage
new_todo = create_todo("Fix API bug", "Development", "high")
print(f"Created todo: {new_todo}")
```

### PowerShell
```powershell
$API_BASE = "http://localhost:3001"

# Get all todos
function Get-Todos {
    $response = Invoke-RestMethod -Uri "$API_BASE/api/todos" -Method Get
    return $response | ConvertFrom-Json
}

# Create new todo
function New-Todo {
    param(
        [string]$Text,
        [string]$Category = "General",
        [string]$Priority = "low"
    )
    
    $todoData = @{
        text = $Text
        category = $Category
        priority = $Priority
        progress = 0
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$API_BASE/api/todos" -Method Post -Body $todoData -ContentType "application/json"
    return $response | ConvertFrom-Json
}

# Usage
$newTodo = New-Todo -Text "PowerShell integration" -Category "Development" -Priority "medium"
Write-Host "Created todo: $($newTodo.text)"
```

## 🌍 Webhook Integration

You can create webhooks to react to todo changes:

### Example: Todo Completion Webhook
```javascript
// In your external app
async function checkTodoCompletions() {
  const response = await fetch('http://localhost:3001/api/todos/stats');
  const stats = await response.json();
  
  if (stats.completed > previousCompletedCount) {
    // Trigger action when todos are completed
    console.log(`${stats.completed - previousCompletedCount} todos completed!`);
    previousCompletedCount = stats.completed;
  }
}

// Check every 30 seconds
setInterval(checkTodoCompletions, 30000);
```

## 🔍 Testing Connections

### Using curl
```bash
# Test API is running
curl http://localhost:3001/api/health

# Test creating a todo
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Test todo", "category": "Testing"}'

# Test getting todos
curl http://localhost:3001/api/todos
```

### Using Postman/Insomnia
1. **Import** this collection:
   ```json
   {
     "info": {
       "name": "Dev Todo API",
       "description": "API for Dev Todo application"
     },
     "item": [
       {
         "name": "Get Todos",
         "request": {
           "method": "GET",
           "header": [],
           "url": {
             "raw": "http://localhost:3001/api/todos"
           }
         }
       },
       {
         "name": "Create Todo",
         "request": {
           "method": "POST",
           "header": [
             {
               "key": "Content-Type",
               "value": "application/json"
             }
           ],
           "body": {
             "mode": "raw",
             "raw": "{\n  \"text\": \"New task\",\n  \"category\": \"Development\"\n}"
           },
           "url": {
             "raw": "http://localhost:3001/api/todos"
           }
         }
       }
     ]
   }
   ```

## 🚨 Error Handling

### Common HTTP Status Codes
- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (missing required fields)
- `404` - Not Found (invalid todo ID)
- `500` - Server Error

### Error Response Format
```json
{
  "error": "Descriptive error message"
}
```

## 📚 Full API Documentation

Visit `http://localhost:3001/api-docs` for interactive Swagger UI with:
- **Try it out** functionality
- **Parameter descriptions**
- **Response examples**
- **Schema definitions**

---

**Your Dev Todo API is now ready for external integrations!** 🎉
