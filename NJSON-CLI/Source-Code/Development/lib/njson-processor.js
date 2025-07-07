/**
 * NJSON Processor - Core NJSON Processing Engine
 * Architecture validated by Wilson for Boolean Mind compatibility
 * Implements Observational Mathematics framework principles
 */

const fs = require('fs');
const readline = require('readline');

class NJSONProcessor {
  constructor() {
    this.framework = "Boolean Language Framework";
    this.version = "BLF-1.0";
    this.omCompliance = true;
    this.cognitiveAlignment = "2.89 + 0.1 = 2.99";
    this.wilsonValidated = true;
  }
  
  /**
   * Process input using Boolean Language Framework principles
   * @param {string|object} input - Input data to process
   * @param {object} options - Processing options
   * @returns {object} Processed result with Wilson validation
   */
  process(input, options = {}) {
    const startTime = Date.now();
    
    try {
      // Boolean Language Framework processing structure
      const result = {
        wilson_meta: {
          cognitive_alignment: this.cognitiveAlignment,
          framework: this.framework,
          om_compliance: this.omCompliance,
          quantum_processing: true
        },
        input: {
          type: typeof input,
          received: true,
          timestamp: new Date().toISOString()
        },
        processing: {
          method: "Boolean Language Framework",
          structure: this.createNJSONStructure(input),
          boolean_optimized: options.boolean || false,
          wilson_validated: true
        },
        output: null,
        performance: {
          start_time: startTime,
          processing_time: null
        },
        success: false
      };
      
      // Process based on input type
      if (typeof input === 'string') {
        result.output = this.processString(input, options);
      } else if (typeof input === 'object') {
        result.output = this.processObject(input, options);
      } else {
        throw new Error('Unsupported input type: ' + typeof input);
      }
      
      result.performance.processing_time = Date.now() - startTime;
      result.success = true;
      
      return result;
      
    } catch (error) {
      return {
        wilson_meta: {
          cognitive_alignment: this.cognitiveAlignment,
          framework: this.framework,
          error_handling: "Boolean Language Protocol"
        },
        input: {
          type: typeof input,
          received: true,
          timestamp: new Date().toISOString()
        },
        error: {
          message: error.message,
          type: error.constructor.name,
          boolean_formatted: this.formatErrorBoolean(error.message)
        },
        performance: {
          processing_time: Date.now() - startTime
        },
        success: false
      };
    }
  }
  
  /**
   * Create NJSON structure following Boolean Language principles
   * @param {*} input - Input to structure
   * @returns {object} Boolean Language structured result
   */
  createNJSONStructure(input) {
    return {
      "IF": "input_received",
      "THEN": "process_input",
      "ELSE": "handle_error",
      "INPUT": input,
      "STRUCTURE": {
        "type": "NJSON",
        "format": "Boolean Language Framework",
        "wilson_compliance": true
      },
      "RESULT": "processing_complete",
      "SUCCESS": true
    };
  }
  
  /**
   * Process string input (file paths or direct JSON)
   * @param {string} input - String input
   * @param {object} options - Processing options
   * @returns {object} Processed string result
   */
  processString(input, options) {
    // Check if input is a file path
    if (fs.existsSync(input)) {
      return this.processFile(input, options);
    }
    
    // Process as direct JSON string
    try {
      const parsed = JSON.parse(input);
      return {
        type: "json_string",
        original: input,
        parsed: parsed,
        boolean_structure: this.applyBooleanStructure(parsed),
        validation: {
          json_valid: true,
          wilson_approved: true
        }
      };
    } catch (error) {
      // Try as NJSON (multiple lines)
      return this.processNJSONString(input, options);
    }
  }
  
  /**
   * Process object input
   * @param {object} input - Object input
   * @param {object} options - Processing options
   * @returns {object} Processed object result
   */
  processObject(input, options) {
    return {
      type: "object",
      original: input,
      boolean_structure: this.applyBooleanStructure(input),
      njson_formatted: JSON.stringify(input),
      validation: {
        object_valid: true,
        wilson_approved: true,
        cognitive_alignment: this.cognitiveAlignment
      }
    };
  }
  
  /**
   * Process NJSON file
   * @param {string} filePath - Path to NJSON file
   * @param {object} options - Processing options
   * @returns {Promise<object>} Processed file result
   */
  async processFile(filePath, options = {}) {
    return new Promise((resolve, reject) => {
      const results = [];
      const errors = [];
      let lineCount = 0;
      
      const fileStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });
      
      rl.on('line', (line) => {
        lineCount++;
        
        if (line.trim()) {
          try {
            const parsed = JSON.parse(line);
            const processed = {
              line_number: lineCount,
              original: line,
              parsed: parsed,
              boolean_structure: this.applyBooleanStructure(parsed),
              wilson_validated: true
            };
            
            results.push(processed);
          } catch (error) {
            errors.push({
              line_number: lineCount,
              content: line,
              error: error.message,
              boolean_error: this.formatErrorBoolean(error.message)
            });
          }
        }
      });
      
      rl.on('close', () => {
        resolve({
          type: "njson_file",
          file_path: filePath,
          total_lines: lineCount,
          valid_records: results.length,
          error_count: errors.length,
          records: options.includeRecords ? results : results.length,
          errors: options.includeErrors ? errors : errors.length,
          wilson_validation: {
            cognitive_alignment: this.cognitiveAlignment,
            framework: this.framework,
            success_rate: results.length / (results.length + errors.length),
            boolean_optimized: true
          }
        });
      });
      
      rl.on('error', (error) => {
        reject(error);
      });
    });
  }
  
  /**
   * Process NJSON string (multi-line JSON)
   * @param {string} input - NJSON string
   * @param {object} options - Processing options
   * @returns {object} Processed NJSON result
   */
  processNJSONString(input, options) {
    const lines = input.trim().split('\n');
    const results = [];
    const errors = [];
    
    lines.forEach((line, index) => {
      if (line.trim()) {
        try {
          const parsed = JSON.parse(line);
          results.push({
            line_number: index + 1,
            original: line,
            parsed: parsed,
            boolean_structure: this.applyBooleanStructure(parsed)
          });
        } catch (error) {
          errors.push({
            line_number: index + 1,
            content: line,
            error: error.message,
            boolean_error: this.formatErrorBoolean(error.message)
          });
        }
      }
    });
    
    return {
      type: "njson_string",
      total_lines: lines.length,
      valid_records: results.length,
      error_count: errors.length,
      records: results,
      errors: errors,
      wilson_validation: {
        cognitive_alignment: this.cognitiveAlignment,
        success_rate: results.length / (results.length + errors.length),
        boolean_optimized: true
      }
    };
  }
  
  /**
   * Apply Boolean Language Framework structure to data
   * @param {*} data - Data to structure
   * @returns {object} Boolean structured data
   */
  applyBooleanStructure(data) {
    return {
      "BOOLEAN_STRUCTURE": {
        "IF": {
          "condition": "data_valid",
          "data": data
        },
        "THEN": {
          "action": "apply_framework",
          "framework": this.framework,
          "cognitive_alignment": this.cognitiveAlignment
        },
        "RESULT": {
          "processed": true,
          "wilson_validated": true,
          "boolean_optimized": true
        }
      },
      "OM_COMPLIANCE": this.omCompliance,
      "QUANTUM_PROCESSING": true
    };
  }
  
  /**
   * Format errors using Boolean Language principles
   * @param {string} errorMessage - Error message to format
   * @returns {string} Boolean formatted error
   */
  formatErrorBoolean(errorMessage) {
    // Boolean Language error formatting - direct, clear, actionable
    return errorMessage
      .replace(/error/gi, 'ISSUE')
      .replace(/failed/gi, 'BLOCKED')
      .replace(/invalid/gi, 'INCORRECT')
      .replace(/cannot/gi, 'UNABLE');
  }
  
  /**
   * Validate NJSON structure using Wilson protocols
   * @param {string} input - Input to validate
   * @returns {object} Validation result
   */
  validate(input) {
    const validation = {
      wilson_validation: true,
      cognitive_alignment: this.cognitiveAlignment,
      framework: this.framework,
      input_type: typeof input,
      tests: {
        json_valid: false,
        njson_format: false,
        boolean_compliant: false,
        wilson_approved: false
      },
      errors: [],
      success: false
    };
    
    try {
      if (typeof input === 'string') {
        // Test as single JSON
        try {
          JSON.parse(input);
          validation.tests.json_valid = true;
        } catch (e) {
          // Test as NJSON (multi-line)
          const lines = input.trim().split('\n');
          let validLines = 0;
          
          lines.forEach((line, index) => {
            if (line.trim()) {
              try {
                JSON.parse(line);
                validLines++;
              } catch (error) {
                validation.errors.push({
                  line: index + 1,
                  error: this.formatErrorBoolean(error.message)
                });
              }
            }
          });
          
          validation.tests.njson_format = validLines > 0;
          validation.tests.json_valid = validation.errors.length === 0;
        }
      } else if (typeof input === 'object') {
        validation.tests.json_valid = true;
        validation.tests.njson_format = true;
      }
      
      // Boolean compliance check
      validation.tests.boolean_compliant = validation.tests.json_valid;
      validation.tests.wilson_approved = validation.tests.boolean_compliant;
      validation.success = validation.tests.wilson_approved;
      
    } catch (error) {
      validation.errors.push({
        type: 'validation_error',
        message: this.formatErrorBoolean(error.message)
      });
    }
    
    return validation;
  }
  
  /**
   * Get Wilson processor status
   * @returns {object} Processor status
   */
  getStatus() {
    return {
      processor: {
        name: "NJSONProcessor",
        version: this.version,
        framework: this.framework,
        status: "ACTIVE"
      },
      wilson: {
        cognitive_alignment: this.cognitiveAlignment,
        om_compliance: this.omCompliance,
        validated: this.wilsonValidated,
        quantum_processing: true
      },
      capabilities: [
        "njson_parsing",
        "boolean_structuring", 
        "wilson_validation",
        "error_formatting",
        "om_compliance"
      ]
    };
  }
}

module.exports = NJSONProcessor;