// Wadelish Commands - 87 Abbreviations for Boolean Mind Code Editor
// Natural language shortcuts for rapid development

const wadelishCommands = {
  // Basic file operations
  'nf': 'new file',
  'of': 'open file',
  'sf': 'save file',
  'cf': 'close file',
  'df': 'delete file',
  'rf': 'rename file',
  
  // Editor operations
  'fd': 'find',
  'rp': 'replace',
  'gt': 'go to line',
  'sl': 'select line',
  'dl': 'delete line',
  'cp': 'copy',
  'pt': 'paste',
  'ud': 'undo',
  'rd': 'redo',
  
  // Code operations
  'cm': 'comment',
  'uc': 'uncomment',
  'in': 'indent',
  'ui': 'unindent',
  'fm': 'format',
  'fc': 'fold code',
  'uf': 'unfold code',
  
  // NJSON specific
  'nj': 'new njson',
  'pj': 'parse json',
  'vj': 'validate json',
  'fj': 'format json',
  'mj': 'minify json',
  'bj': 'beautify json',
  
  // Wilson AI commands
  'wa': 'wilson analyze',
  'wo': 'wilson optimize',
  'ws': 'wilson suggest',
  'wc': 'wilson check',
  'wr': 'wilson refactor',
  'wt': 'wilson test',
  'wd': 'wilson debug',
  'we': 'wilson explain',
  
  // Boolean Language Framework
  'bl': 'boolean language',
  'bt': 'boolean translate',
  'bp': 'boolean process',
  'bv': 'boolean validate',
  'bc': 'boolean convert',
  'ba': 'boolean analyze',
  
  // Navigation
  'nb': 'next buffer',
  'pb': 'previous buffer',
  'tb': 'toggle buffer',
  'sb': 'switch buffer',
  'cb': 'close buffer',
  'ab': 'all buffers',
  
  // Window management
  'nw': 'new window',
  'cw': 'close window',
  'sw': 'switch window',
  'tw': 'toggle window',
  'mw': 'minimize window',
  'fw': 'fullscreen window',
  
  // Search operations
  'fs': 'find string',
  'rs': 'replace string',
  'fi': 'find in files',
  'ri': 'replace in files',
  'gr': 'grep',
  'ag': 'ack grep',
  
  // Git operations
  'gs': 'git status',
  'ga': 'git add',
  'gc': 'git commit',
  'gp': 'git push',
  'gl': 'git pull',
  'gd': 'git diff',
  'gb': 'git branch',
  'gm': 'git merge',
  
  // Terminal operations
  'tm': 'terminal',
  'nt': 'new terminal',
  'ct': 'close terminal',
  'cl': 'clear terminal',
  'ex': 'execute command',
  'sh': 'shell command',
  
  // Utilities
  'ts': 'timestamp',
  'lc': 'line count',
  'wc': 'word count',
  'cc': 'character count',
  'sp': 'spell check',
  'sc': 'syntax check',
  
  // System operations
  'op': 'open project',
  'cp': 'close project',
  'sp': 'save project',
  'ep': 'export project',
  'ip': 'import project',
  'pp': 'project properties',
  
  // Misc shortcuts
  'hk': 'hotkey',
  'pr': 'preferences',
  'ab': 'about',
  'hp': 'help',
  'qt': 'quit',
  'ex': 'exit'
};

class WadelishProcessor {
  constructor() {
    this.commands = wadelishCommands;
    this.history = [];
  }

  execute(command, context = {}) {
    try {
      const normalizedCommand = command.toLowerCase().trim();
      
      // Check if it's a direct abbreviation
      if (this.commands[normalizedCommand]) {
        return this.processCommand(this.commands[normalizedCommand], context);
      }
      
      // Check for partial matches
      const partialMatches = Object.keys(this.commands).filter(key => 
        key.startsWith(normalizedCommand)
      );
      
      if (partialMatches.length === 1) {
        return this.processCommand(this.commands[partialMatches[0]], context);
      } else if (partialMatches.length > 1) {
        return {
          success: false,
          output: `Multiple matches found: ${partialMatches.join(', ')}`,
          suggestions: partialMatches.map(key => `${key}: ${this.commands[key]}`)
        };
      }
      
      // Check for natural language processing
      return this.processNaturalLanguage(command, context);
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        output: 'Command execution failed'
      };
    }
  }

  processCommand(fullCommand, context) {
    this.history.push({
      command: fullCommand,
      timestamp: new Date().toISOString(),
      context: context
    });

    switch (fullCommand) {
      case 'new file':
        return this.createNewFile(context);
      case 'save file':
        return this.saveFile(context);
      case 'wilson analyze':
        return this.wilsonAnalyze(context);
      case 'format json':
        return this.formatJson(context);
      case 'boolean translate':
        return this.booleanTranslate(context);
      default:
        return {
          success: true,
          output: `Executed: ${fullCommand}`,
          action: fullCommand
        };
    }
  }

  createNewFile(context) {
    return {
      success: true,
      output: 'New file created',
      action: 'new_file',
      filename: context.filename || 'untitled.njson'
    };
  }

  saveFile(context) {
    return {
      success: true,
      output: `File saved: ${context.currentFile || 'untitled.njson'}`,
      action: 'save_file',
      filename: context.currentFile
    };
  }

  wilsonAnalyze(context) {
    return {
      success: true,
      output: 'Wilson analysis initiated',
      action: 'wilson_analyze',
      content: context.editorContent
    };
  }

  formatJson(context) {
    try {
      const content = context.editorContent || '{}';
      const parsed = JSON.parse(content);
      const formatted = JSON.stringify(parsed, null, 2);
      
      return {
        success: true,
        output: 'JSON formatted successfully',
        action: 'format_json',
        formattedContent: formatted
      };
    } catch (error) {
      return {
        success: false,
        output: 'Invalid JSON format',
        error: error.message
      };
    }
  }

  booleanTranslate(context) {
    return {
      success: true,
      output: 'Boolean Language translation initiated',
      action: 'boolean_translate',
      content: context.editorContent
    };
  }

  processNaturalLanguage(command, context) {
    // Simple natural language processing for commands
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('create') || lowerCommand.includes('new')) {
      return this.createNewFile(context);
    } else if (lowerCommand.includes('save')) {
      return this.saveFile(context);
    } else if (lowerCommand.includes('format')) {
      return this.formatJson(context);
    } else if (lowerCommand.includes('wilson')) {
      return this.wilsonAnalyze(context);
    } else {
      return {
        success: false,
        output: `Unknown command: ${command}`,
        suggestions: this.getSuggestions(command)
      };
    }
  }

  getSuggestions(command) {
    const suggestions = [];
    const lowerCommand = command.toLowerCase();
    
    Object.keys(this.commands).forEach(key => {
      if (this.commands[key].toLowerCase().includes(lowerCommand) || 
          key.includes(lowerCommand)) {
        suggestions.push(`${key}: ${this.commands[key]}`);
      }
    });
    
    return suggestions.slice(0, 5);
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
  }

  listCommands() {
    return this.commands;
  }
}

module.exports = new WadelishProcessor();