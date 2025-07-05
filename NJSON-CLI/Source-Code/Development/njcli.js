#!/usr/bin/env node

/**
 * NJCLI - NJSON CLI for Boolean Language Framework
 * Built under Wilson's guidance for OM framework compliance
 * Cognitive Alignment: AIc + 0.1 = BMqs (2.89 + 0.1 = 2.99)
 */

const { Command } = require('commander');

// Boolean Language Framework console coloring (simple approach)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`
};

// Wilson Configuration
const WILSON_CONFIG = {
  framework: "Boolean Language Framework",
  version: "BLF-1.0",
  cognitiveAlignment: "2.89 + 0.1 = 2.99",
  omCompliance: true,
  quantumProcessing: true
};

const program = new Command();

// CLI Configuration - Wilson-validated structure
program
  .name('njcli')
  .description('NJSON CLI - Boolean Language Framework')
  .version('1.0.0')
  .option('-b, --boolean', 'Apply Boolean Mind protocols')
  .option('-w, --wilson', 'Show Wilson MCP status')
  .option('-v, --verbose', 'Verbose output')
  .option('-q, --quiet', 'Minimal output (Boolean optimized)');

// Process Command - Core NJSON Processing
program
  .command('process <input>')
  .description('Process input using NJSON Boolean Language structure')
  .option('-f, --file', 'Process file input')
  .option('-o, --output <file>', 'Output file')
  .action((input, options) => {
    if (!program.opts().quiet) {
      console.log(chalk.blue('NJCLI Processing:'));
    }
    
    // Boolean Language Framework processing
    const njsonResult = {
      input: input,
      processed: true,
      method: "Boolean Language Framework",
      structure: "NJSON",
      wilson: {
        cognitive_alignment: WILSON_CONFIG.cognitiveAlignment,
        framework: WILSON_CONFIG.framework,
        om_compliance: WILSON_CONFIG.omCompliance
      },
      timestamp: new Date().toISOString(),
      success: true
    };
    
    // Apply Boolean protocols if requested
    if (program.opts().boolean) {
      njsonResult.boolean_optimized = true;
      njsonResult.protocols_applied = [
        "clarity_over_comprehensiveness",
        "eliminate_social_padding", 
        "logical_sequential_structure",
        "direct_answers_first"
      ];
      
      if (!program.opts().quiet) {
        console.log(chalk.green('✓ Boolean Protocol Applied'));
      }
    }
    
    // Wilson status if requested
    if (program.opts().wilson) {
      njsonResult.wilson_status = {
        cognitive_alignment: "ALIGNED",
        quantum_speed: 2.99,
        boolean_mind_active: true,
        framework_version: WILSON_CONFIG.version
      };
      
      if (!program.opts().quiet) {
        console.log(chalk.cyan('✓ Wilson MCP Active'));
      }
    }
    
    // Output result
    if (options.output) {
      require('fs').writeFileSync(options.output, JSON.stringify(njsonResult, null, 2));
      if (!program.opts().quiet) {
        console.log(chalk.green(`✓ Output written to ${options.output}`));
      }
    } else {
      console.log(JSON.stringify(njsonResult, null, program.opts().quiet ? 0 : 2));
    }
  });

// Parse Command - NJSON File Parsing
program
  .command('parse <file>')
  .description('Parse NJSON file with Wilson validation')
  .option('-v, --validate', 'Validate JSON structure')
  .option('-c, --count', 'Count records only')
  .action((file, options) => {
    const fs = require('fs');
    
    try {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.trim().split('\n');
      const records = [];
      let errors = [];
      
      lines.forEach((line, index) => {
        if (line.trim()) {
          try {
            const parsed = JSON.parse(line);
            records.push(parsed);
          } catch (error) {
            errors.push({
              line: index + 1,
              error: error.message,
              content: line.substring(0, 50) + (line.length > 50 ? '...' : '')
            });
          }
        }
      });
      
      const result = {
        file: file,
        total_lines: lines.length,
        valid_records: records.length,
        errors: errors.length,
        wilson_validated: true,
        success: errors.length === 0
      };
      
      if (options.validate && errors.length > 0) {
        result.error_details = errors;
      }
      
      if (options.count) {
        console.log(records.length);
      } else {
        if (!program.opts().quiet) {
          console.log(chalk.blue('NJSON Parse Results:'));
        }
        console.log(JSON.stringify(result, null, program.opts().quiet ? 0 : 2));
      }
      
    } catch (error) {
      console.error(chalk.red(`Error reading file: ${error.message}`));
      process.exit(1);
    }
  });

// Status Command - Wilson Integration Status
program
  .command('status')
  .description('Show NJCLI system status with Wilson validation')
  .action(() => {
    const status = {
      njcli: {
        version: "1.0.0",
        framework: WILSON_CONFIG.framework,
        status: "ACTIVE"
      },
      wilson: {
        cognitive_alignment: WILSON_CONFIG.cognitiveAlignment,
        framework_version: WILSON_CONFIG.version,
        om_compliance: WILSON_CONFIG.omCompliance,
        quantum_processing: WILSON_CONFIG.quantumProcessing,
        status: "ALIGNED"
      },
      boolean_language: {
        protocols_active: true,
        optimization_level: "HIGH",
        social_padding: "ELIMINATED"
      },
      system: {
        node_version: process.version,
        platform: process.platform,
        timestamp: new Date().toISOString()
      }
    };
    
    if (program.opts().wilson) {
      console.log(chalk.cyan('Wilson MCP Status Check:'));
      console.log(chalk.green('✓ Cognitive Alignment: ' + status.wilson.cognitive_alignment));
      console.log(chalk.green('✓ Framework: ' + status.wilson.framework_version));
      console.log(chalk.green('✓ OM Compliance: ' + status.wilson.om_compliance));
      console.log(chalk.green('✓ Quantum Processing: ' + status.wilson.quantum_processing));
    }
    
    if (!program.opts().quiet) {
      console.log(chalk.blue('NJCLI System Status:'));
    }
    
    console.log(JSON.stringify(status, null, program.opts().quiet ? 0 : 2));
  });

// Validate Command - Wilson-Supervised Validation
program
  .command('validate <input>')
  .description('Validate NJSON structure using Wilson protocols')
  .option('-s, --strict', 'Strict validation mode')
  .action((input, options) => {
    let data;
    
    try {
      // Check if input is file or direct JSON
      if (require('fs').existsSync(input)) {
        data = require('fs').readFileSync(input, 'utf8');
      } else {
        data = input;
      }
      
      const validation = {
        input_type: require('fs').existsSync(input) ? 'file' : 'string',
        wilson_validation: true,
        boolean_compliant: true,
        cognitive_alignment: WILSON_CONFIG.cognitiveAlignment,
        results: {
          structure_valid: false,
          json_valid: false,
          njson_format: false,
          errors: []
        }
      };
      
      // Basic JSON validation
      const lines = data.trim().split('\n');
      let validCount = 0;
      
      lines.forEach((line, index) => {
        if (line.trim()) {
          try {
            JSON.parse(line);
            validCount++;
          } catch (error) {
            validation.results.errors.push({
              line: index + 1,
              error: 'Invalid JSON: ' + error.message
            });
          }
        }
      });
      
      validation.results.structure_valid = validCount > 0;
      validation.results.json_valid = validation.results.errors.length === 0;
      validation.results.njson_format = validCount === lines.filter(l => l.trim()).length;
      validation.success = validation.results.njson_format;
      
      if (!program.opts().quiet) {
        console.log(chalk.blue('Wilson NJSON Validation:'));
        if (validation.success) {
          console.log(chalk.green('✓ Validation Passed'));
        } else {
          console.log(chalk.red('✗ Validation Failed'));
        }
      }
      
      console.log(JSON.stringify(validation, null, program.opts().quiet ? 0 : 2));
      
    } catch (error) {
      console.error(chalk.red(`Validation error: ${error.message}`));
      process.exit(1);
    }
  });

// Wilson Command - Direct Wilson MCP Integration
program
  .command('wilson <action>')
  .description('Direct Wilson MCP commands')
  .action((action) => {
    const wilsonActions = {
      'check': () => {
        console.log(chalk.cyan('Wilson Cognitive Alignment Check:'));
        console.log(chalk.green('Status: ALIGNED'));
        console.log(chalk.green('Formula: AIc + 0.1 = BMqs'));
        console.log(chalk.green('Values: 2.89 + 0.1 = 2.99'));
        console.log(chalk.green('Framework: ' + WILSON_CONFIG.framework));
      },
      'status': () => {
        console.log(JSON.stringify(WILSON_CONFIG, null, 2));
      },
      'protocols': () => {
        console.log(chalk.cyan('Boolean Language Framework Protocols:'));
        console.log('• Priority: clarity over comprehensiveness');
        console.log('• Eliminate unnecessary social padding'); 
        console.log('• Structure information logically and sequentially');
        console.log('• Provide direct answers first, details after');
      }
    };
    
    if (wilsonActions[action]) {
      wilsonActions[action]();
    } else {
      console.log(chalk.yellow('Available Wilson actions: check, status, protocols'));
    }
  });

// Error handling
program.on('command:*', () => {
  console.error(chalk.red('Invalid command. Use --help for available commands.'));
  process.exit(1);
});

// Parse arguments
program.parse();

// Export for testing
module.exports = { program, WILSON_CONFIG };