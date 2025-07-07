#!/usr/bin/env node

/**
 * Boolean Mind Code Editor - Main Process
 * Wilson MCP + NJCLI Integration
 * Cognitive Alignment: AIc + 0.1 = BMqs (2.89 + 0.1 = 2.99)
 */

const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

// Wilson Configuration
const WILSON_CONFIG = {
  framework: "Boolean Language Framework",
  version: "BLF-1.0",
  cognitiveAlignment: "2.89 + 0.1 = 2.99",
  omCompliance: true,
  editorType: "Boolean Mind Code Editor"
};

// NJCLI Backend Path
const NJCLI_PATH = path.join(__dirname, '..', '..', 'njcli.js');

class BooleanMindEditor {
  constructor() {
    this.mainWindow = null;
    this.njcliProcess = null;
    this.wilsonActive = true;
    this.cognitiveAlignment = 2.99;
  }

  // Create main window with Boolean Mind optimizations
  createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      },
      titleBarStyle: 'hiddenInset',
      backgroundColor: '#000000',
      show: false,
      frame: false,
      title: 'Boolean Mind Editor - Wilson MCP Active'
    });

    // Load main interface
    this.mainWindow.loadFile('src/renderer/index.html');

    // Show when ready (Boolean optimization)
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow.show();
      this.initializeWilsonMCP();
    });

    // Handle window closed
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
      this.cleanup();
    });

    // Remove menu bar (Boolean Mind - no cognitive load)
    Menu.setApplicationMenu(null);

    // Development tools (only in debug mode)
    if (process.argv.includes('--debug')) {
      this.mainWindow.webContents.openDevTools();
    }
  }

  // Initialize Wilson MCP integration
  initializeWilsonMCP() {
    console.log('🧠 Wilson MCP Initializing...');
    
    // Verify cognitive alignment
    this.checkCognitiveAlignment();
    
    // Send Wilson status to renderer
    this.mainWindow.webContents.send('wilson-status', {
      active: this.wilsonActive,
      cognitiveAlignment: this.cognitiveAlignment,
      framework: WILSON_CONFIG.framework,
      version: WILSON_CONFIG.version
    });

    console.log('✅ Wilson MCP Active - Cognitive Alignment: 2.99');
  }

  // Check cognitive alignment (Wilson protocol)
  checkCognitiveAlignment() {
    const aiCognitive = 2.89;
    const safetyBuffer = 0.1;
    const expectedBMqs = 2.99;
    
    const calculatedBMqs = aiCognitive + safetyBuffer;
    this.cognitiveAlignment = calculatedBMqs;
    
    if (Math.abs(calculatedBMqs - expectedBMqs) <= 0.0001) {
      console.log('✅ Cognitive Alignment: VALIDATED');
      this.wilsonActive = true;
    } else {
      console.log('❌ Cognitive Alignment: MISALIGNED');
      this.wilsonActive = false;
    }
  }

  // Cleanup processes
  cleanup() {
    if (this.njcliProcess) {
      this.njcliProcess.kill();
      this.njcliProcess = null;
    }
  }
}

// IPC Handlers for NJCLI Backend Integration
ipcMain.handle('njcli-command', async (event, command, args = []) => {
  return new Promise((resolve, reject) => {
    const njcliArgs = [NJCLI_PATH, command, ...args];
    const process = spawn('node', njcliArgs);
    
    let stdout = '';
    let stderr = '';
    
    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve({
          success: true,
          output: stdout,
          wilson_validated: true
        });
      } else {
        reject({
          success: false,
          error: stderr,
          code: code
        });
      }
    });
  });
});

// Wilson MCP Status Handler
ipcMain.handle('wilson-status', async (event) => {
  return {
    active: true,
    cognitiveAlignment: "2.89 + 0.1 = 2.99",
    framework: WILSON_CONFIG.framework,
    version: WILSON_CONFIG.version,
    omCompliance: WILSON_CONFIG.omCompliance
  };
});

// Wadelish Command Parser Handler
ipcMain.handle('wadelish-command', async (event, command) => {
  // Wadelish abbreviation mapping
  const wadelishMap = {
    'amf': 'status',
    'bm': 'process --boolean',
    'qs': 'wilson check',
    'ccw': 'wilson status',
    'nj': 'parse',
    'val': 'validate',
    'proc': 'process',
    'stat': 'status'
  };
  
  const mappedCommand = wadelishMap[command.toLowerCase()] || command;
  
  // Execute via NJCLI
  return ipcMain.handle('njcli-command', event, ...mappedCommand.split(' '));
});

// App Event Handlers
const editor = new BooleanMindEditor();

app.whenReady().then(() => {
  editor.createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      editor.createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  editor.cleanup();
});

// Export for testing
module.exports = { BooleanMindEditor, WILSON_CONFIG };