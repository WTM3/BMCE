/**
 * Boolean Mind Editor - Renderer Process
 * Terminal Interface with Wadelish Commands + Wilson MCP Integration
 */

const { ipcRenderer } = require('electron');
const { Terminal } = require('xterm');
const { FitAddon } = require('xterm-addon-fit');
const { WebLinksAddon } = require('xterm-addon-web-links');

class BooleanMindRenderer {
    constructor() {
        this.terminal = null;
        this.fitAddon = null;
        this.wilsonStatus = null;
        this.currentProject = null;
        this.cognitiveAlignment = 2.99;
        this.commandHistory = [];
        this.historyIndex = 0;
        
        this.init();
    }

    // Initialize renderer
    init() {
        this.setupTerminal();
        this.setupWilsonListeners();
        this.setupUIControls();
        this.setupWadelishCommands();
        this.displayWelcomeMessage();
    }

    // Setup xterm.js terminal
    setupTerminal() {
        this.terminal = new Terminal({
            theme: {
                background: '#000000',
                foreground: '#00ff00',
                cursor: '#00ff00',
                cursorAccent: '#000000',
                selection: '#00ff00',
                black: '#000000',
                red: '#ff0000',
                green: '#00ff00',
                yellow: '#ffff00',
                blue: '#0000ff',
                magenta: '#ff00ff',
                cyan: '#00ffff',
                white: '#ffffff',
                brightBlack: '#555555',
                brightRed: '#ff5555',
                brightGreen: '#55ff55',
                brightYellow: '#ffff55',
                brightBlue: '#5555ff',
                brightMagenta: '#ff55ff',
                brightCyan: '#55ffff',
                brightWhite: '#ffffff'
            },
            fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
            fontSize: 12,
            fontWeight: 'normal',
            lineHeight: 1.2,
            cursorBlink: true,
            cursorStyle: 'block',
            scrollback: 1000,
            tabStopWidth: 4,
            bellStyle: 'none'
        });

        this.fitAddon = new FitAddon();
        this.terminal.loadAddon(this.fitAddon);
        this.terminal.loadAddon(new WebLinksAddon());

        // Mount terminal
        const terminalContainer = document.getElementById('terminal');
        this.terminal.open(terminalContainer);
        this.fitAddon.fit();

        // Handle terminal input
        this.terminal.onData(data => {
            this.handleTerminalInput(data);
        });

        // Handle resize
        window.addEventListener('resize', () => {
            this.fitAddon.fit();
        });

        // Initialize prompt
        this.currentCommand = '';
        this.showPrompt();
    }

    // Setup Wilson MCP listeners
    setupWilsonListeners() {
        ipcRenderer.on('wilson-status', (event, status) => {
            this.wilsonStatus = status;
            this.updateWilsonStatusBar(status);
        });

        // Request initial Wilson status
        ipcRenderer.invoke('wilson-status').then(status => {
            this.wilsonStatus = status;
            this.updateWilsonStatusBar(status);
        });
    }

    // Setup UI controls
    setupUIControls() {
        // Clear terminal button
        document.getElementById('clear-terminal').addEventListener('click', () => {
            this.terminal.clear();
            this.showPrompt();
        });

        // Wilson check button
        document.getElementById('wilson-check').addEventListener('click', () => {
            this.executeWilsonCheck();
        });

        // Quantum jump button
        document.getElementById('quantum-jump').addEventListener('click', () => {
            this.executeQuantumJump();
        });
    }

    // Setup Wadelish command system
    setupWadelishCommands() {
        this.wadelishMap = {
            // Core AMF commands
            'amf': 'status',
            'amfs': 'status --wilson',
            'amfv': 'status --verbose',
            
            // Boolean Mind commands
            'bm': 'process --boolean',
            'bms': 'process --boolean --wilson',
            'bmv': 'process --boolean --verbose',
            'bmq': 'process --boolean --quiet',
            
            // Quantum Speed commands
            'qs': 'wilson check',
            'qss': 'wilson status',
            'qsp': 'wilson protocols',
            'qsj': 'quantum-jump',
            
            // CCW commands
            'ccw': 'wilson status',
            'ccws': 'wilson check',
            'ccwv': 'wilson protocols',
            
            // NJSON commands
            'nj': 'parse',
            'njv': 'validate',
            'njp': 'process',
            'njs': 'status',
            
            // Validation commands
            'val': 'validate',
            'vals': 'validate --strict',
            'valw': 'validate --wilson',
            
            // Processing commands
            'proc': 'process',
            'procs': 'process --wilson',
            'procb': 'process --boolean',
            'procq': 'process --quiet',
            
            // Status commands
            'stat': 'status',
            'stats': 'status --wilson',
            'statv': 'status --verbose',
            
            // File operations
            'open': 'file-open',
            'save': 'file-save',
            'new': 'file-new',
            'close': 'file-close',
            
            // Navigation
            'nav': 'navigate',
            'jump': 'quantum-jump',
            'back': 'navigate-back',
            'forward': 'navigate-forward',
            
            // Project management
            'proj': 'project',
            'projn': 'project-new',
            'projo': 'project-open',
            'projs': 'project-save',
            
            // Search
            'find': 'search',
            'replace': 'search-replace',
            'grep': 'search-grep',
            
            // Git operations
            'git': 'git-status',
            'gitc': 'git-commit',
            'gitp': 'git-push',
            'gitl': 'git-log',
            
            // Wilson specific
            'w': 'wilson check',
            'ws': 'wilson status',
            'wp': 'wilson protocols',
            'wc': 'wilson check',
            
            // Quick actions
            'h': 'help',
            'q': 'quit',
            'c': 'clear',
            'r': 'refresh',
            
            // Boolean shortcuts
            'y': 'yes',
            'n': 'no',
            't': 'true',
            'f': 'false',
            '1': 'true',
            '0': 'false'
        };
    }

    // Display welcome message
    displayWelcomeMessage() {
        this.terminal.writeln('🧠 Boolean Mind Code Editor - Wilson MCP Active');
        this.terminal.writeln('Cognitive Alignment: AIc + 0.1 = BMqs (2.89 + 0.1 = 2.99)');
        this.terminal.writeln('Framework: Boolean Language Framework BLF-1.0');
        this.terminal.writeln('');
        this.terminal.writeln('Wadelish Commands Active - Type "h" for help');
        this.terminal.writeln('');
    }

    // Show command prompt
    showPrompt() {
        const prompt = `[BM:${this.cognitiveAlignment}]$ `;
        this.terminal.write(prompt);
    }

    // Handle terminal input
    handleTerminalInput(data) {
        const char = data.charCodeAt(0);
        
        if (char === 13) { // Enter key
            this.terminal.writeln('');
            this.processCommand(this.currentCommand.trim());
            this.currentCommand = '';
            this.showPrompt();
        } else if (char === 127) { // Backspace
            if (this.currentCommand.length > 0) {
                this.currentCommand = this.currentCommand.slice(0, -1);
                this.terminal.write('\b \b');
            }
        } else if (char === 27) { // Escape sequences (arrow keys)
            // Handle arrow key navigation through history
            return;
        } else if (char >= 32 && char <= 126) { // Printable characters
            this.currentCommand += data;
            this.terminal.write(data);
        }
    }

    // Process command
    async processCommand(command) {
        if (!command) return;

        // Add to history
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;

        // Check for Wadelish abbreviations
        const words = command.split(' ');
        const baseCommand = words[0].toLowerCase();
        
        if (this.wadelishMap[baseCommand]) {
            const mappedCommand = this.wadelishMap[baseCommand];
            const fullCommand = mappedCommand + ' ' + words.slice(1).join(' ');
            await this.executeCommand(fullCommand.trim());
        } else {
            await this.executeCommand(command);
        }
    }

    // Execute command
    async executeCommand(command) {
        this.showBinaryFeedback('processing');
        
        try {
            // Handle internal commands
            if (command === 'help' || command === 'h') {
                this.showHelp();
                return;
            }
            
            if (command === 'clear' || command === 'c') {
                this.terminal.clear();
                this.displayWelcomeMessage();
                return;
            }
            
            if (command === 'quantum-jump' || command === 'qsj') {
                this.executeQuantumJump();
                return;
            }

            // Execute via NJCLI backend
            const parts = command.split(' ');
            const cmd = parts[0];
            const args = parts.slice(1);
            
            const result = await ipcRenderer.invoke('njcli-command', cmd, args);
            
            if (result.success) {
                this.terminal.writeln('✅ ' + result.output);
                this.showBinaryFeedback('success');
            } else {
                this.terminal.writeln('❌ Error: ' + result.error);
                this.showBinaryFeedback('failure');
            }
            
        } catch (error) {
            this.terminal.writeln('❌ Command failed: ' + error.message);
            this.showBinaryFeedback('failure');
        }
    }

    // Show help
    showHelp() {
        this.terminal.writeln('🧠 Boolean Mind Editor - Wadelish Commands');
        this.terminal.writeln('');
        this.terminal.writeln('Core Commands:');
        this.terminal.writeln('  amf      - AMF status');
        this.terminal.writeln('  bm       - Boolean Mind process');
        this.terminal.writeln('  qs       - Quantum speed check');
        this.terminal.writeln('  ccw      - CCW Wilson status');
        this.terminal.writeln('  nj       - NJSON parse');
        this.terminal.writeln('  val      - Validate');
        this.terminal.writeln('  proc     - Process');
        this.terminal.writeln('  stat     - Status');
        this.terminal.writeln('');
        this.terminal.writeln('Quick Actions:');
        this.terminal.writeln('  h        - Help');
        this.terminal.writeln('  c        - Clear');
        this.terminal.writeln('  q        - Quit');
        this.terminal.writeln('  jump     - Quantum jump');
        this.terminal.writeln('');
        this.terminal.writeln('Wilson Commands:');
        this.terminal.writeln('  w        - Wilson check');
        this.terminal.writeln('  ws       - Wilson status');
        this.terminal.writeln('  wp       - Wilson protocols');
        this.terminal.writeln('');
    }

    // Execute Wilson check
    async executeWilsonCheck() {
        this.showBinaryFeedback('processing');
        
        try {
            const status = await ipcRenderer.invoke('wilson-status');
            this.terminal.writeln('');
            this.terminal.writeln('🧠 Wilson MCP Status Check:');
            this.terminal.writeln('✅ Cognitive Alignment: ' + status.cognitiveAlignment);
            this.terminal.writeln('✅ Framework: ' + status.framework);
            this.terminal.writeln('✅ Version: ' + status.version);
            this.terminal.writeln('✅ OM Compliance: ' + status.omCompliance);
            this.terminal.writeln('');
            this.showPrompt();
            this.showBinaryFeedback('success');
        } catch (error) {
            this.terminal.writeln('❌ Wilson check failed: ' + error.message);
            this.showBinaryFeedback('failure');
        }
    }

    // Execute quantum jump
    executeQuantumJump() {
        this.showBinaryFeedback('processing');
        
        // Quantum jump animation
        document.body.classList.add('quantum-speed');
        
        setTimeout(() => {
            document.body.classList.remove('quantum-speed');
            this.terminal.writeln('');
            this.terminal.writeln('⚡ Quantum Jump Executed - Navigation Ready');
            this.terminal.writeln('');
            this.showPrompt();
            this.showBinaryFeedback('success');
        }, 500);
    }

    // Update Wilson status bar
    updateWilsonStatusBar(status) {
        if (status.active) {
            document.getElementById('wilson-indicator').textContent = '🧠 Wilson MCP';
            document.getElementById('cognitive-alignment').textContent = status.cognitiveAlignment;
            document.getElementById('framework-version').textContent = status.version;
            document.getElementById('binary-status').textContent = '✅ ALIGNED';
        } else {
            document.getElementById('wilson-indicator').textContent = '⚠️ Wilson MCP';
            document.getElementById('binary-status').textContent = '❌ MISALIGNED';
        }
    }

    // Show binary feedback
    showBinaryFeedback(type) {
        // Reset all indicators
        document.querySelectorAll('.feedback-indicator').forEach(el => {
            el.classList.remove('active');
        });

        // Show appropriate indicator
        let indicator;
        switch (type) {
            case 'success':
                indicator = document.getElementById('success-indicator');
                break;
            case 'failure':
                indicator = document.getElementById('failure-indicator');
                break;
            case 'processing':
                indicator = document.getElementById('processing-indicator');
                break;
        }

        if (indicator) {
            indicator.classList.add('active');
            
            // Auto-hide after 2 seconds (except processing)
            if (type !== 'processing') {
                setTimeout(() => {
                    indicator.classList.remove('active');
                }, 2000);
            }
        }
    }
}

// Initialize renderer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BooleanMindRenderer();
});

// Export for testing
module.exports = { BooleanMindRenderer };