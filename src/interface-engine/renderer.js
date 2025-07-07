const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

class BMCERenderer {
  constructor() {
    this.currentFile = null;
    this.files = [];
    this.wilsonConnected = false;
    this.init();
  }

  async init() {
    await this.initializeWilson();
    this.setupEventListeners();
    this.loadWadelishCommands();
  }

  async initializeWilson() {
    try {
      const result = await ipcRenderer.invoke('wilson-bridge', 'connect');
      this.wilsonConnected = result.success;
      this.updateWilsonStatus(this.wilsonConnected ? 'Connected' : 'Disconnected');
    } catch (error) {
      console.error('Wilson initialization failed:', error);
      this.updateWilsonStatus('Error');
    }
  }

  updateWilsonStatus(status) {
    const statusElement = document.getElementById('wilson-status');
    const indicator = statusElement.querySelector('.status-indicator');
    const text = statusElement.querySelector('.status-text');
    
    text.textContent = `Wilson: ${status}`;
    indicator.className = `status-indicator ${status.toLowerCase()}`;
  }

  setupEventListeners() {
    const editor = document.getElementById('main-editor');
    const commandInput = document.getElementById('command-input');

    editor.addEventListener('input', (e) => {
      this.handleEditorInput(e.target.value);
    });

    commandInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.executeWadelishCommand(e.target.value);
        e.target.value = '';
      }
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      this.loadFiles(files);
    });

    document.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  }

  async handleEditorInput(content) {
    if (this.wilsonConnected) {
      try {
        const feedback = await ipcRenderer.invoke('wilson-bridge', 'analyze', {
          content: content,
          type: 'njson'
        });
        this.updateWilsonFeedback(feedback.message);
      } catch (error) {
        console.error('Wilson analysis failed:', error);
      }
    }
  }

  async executeWadelishCommand(command) {
    try {
      const result = await ipcRenderer.invoke('wadelish-command', command, {
        currentFile: this.currentFile,
        editorContent: document.getElementById('main-editor').value
      });
      
      this.displayCommandOutput(result);
    } catch (error) {
      console.error('Wadelish command failed:', error);
      this.displayCommandOutput({ error: error.message });
    }
  }

  displayCommandOutput(result) {
    const output = document.getElementById('command-output');
    const outputDiv = document.createElement('div');
    outputDiv.className = 'command-result';
    outputDiv.innerHTML = `
      <div class="command-timestamp">${new Date().toLocaleTimeString()}</div>
      <div class="command-response">${result.output || result.error || 'Command executed'}</div>
    `;
    output.appendChild(outputDiv);
    output.scrollTop = output.scrollHeight;
  }

  updateWilsonFeedback(message) {
    const feedback = document.getElementById('wilson-feedback');
    feedback.textContent = message;
    feedback.className = 'wilson-feedback active';
    
    setTimeout(() => {
      feedback.className = 'wilson-feedback';
    }, 3000);
  }

  loadFiles(files) {
    files.forEach(file => {
      if (file.name.endsWith('.njson') || file.name.endsWith('.js') || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.openFile(file.name, e.target.result);
        };
        reader.readAsText(file);
      }
    });
  }

  openFile(filename, content) {
    this.currentFile = filename;
    document.getElementById('main-editor').value = content;
    document.getElementById('file-status').textContent = `Editing: ${filename}`;
    
    if (filename.endsWith('.njson')) {
      document.getElementById('main-editor').className = 'njson-editor';
    } else {
      document.getElementById('main-editor').className = '';
    }
  }

  loadWadelishCommands() {
    // This will be populated from the wadelish-commands module
    console.log('Loading Wadelish commands...');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BMCERenderer();
});