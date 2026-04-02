const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getTodos: () => ipcRenderer.invoke('get-todos'),
  saveTodos: (todos) => ipcRenderer.invoke('save-todos', todos),
  onNewTodo: (callback) => ipcRenderer.on('new-todo', callback),
  onToggleDarkMode: (callback) => ipcRenderer.on('toggle-dark-mode', callback)
});
