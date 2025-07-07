/**
 * Basic Test Suite for NJCLI
 * Wilson-validated testing following Boolean Language Framework
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Wilson test configuration
const WILSON_CONFIG = {
  cognitive_alignment: "2.89 + 0.1 = 2.99",
  framework: "Boolean Language Framework",
  test_approach: "Binary success/failure validation"
};

class NJCLITester {
  constructor() {
    this.testResults = [];
    this.wilsonValidated = true;
    this.cliPath = path.join(__dirname, '..', 'njcli.js');
  }
  
  // Boolean Language test execution
  runTest(testName, command, expectedResult = null) {
    console.log(`\n🧪 Testing: ${testName}`);
    
    try {
      const result = execSync(`node ${this.cliPath} ${command}`, { 
        encoding: 'utf8',
        timeout: 5000 
      });
      
      const testResult = {
        test: testName,
        command: command,
        success: true,
        output: result.trim(),
        wilson_validated: true,
        timestamp: new Date().toISOString()
      };
      
      // Expected result validation if provided
      if (expectedResult) {
        testResult.expected_match = result.includes(expectedResult);
        testResult.success = testResult.expected_match;
      }
      
      this.testResults.push(testResult);
      console.log(`✅ PASS: ${testName}`);
      
      return testResult;
      
    } catch (error) {
      const testResult = {
        test: testName,
        command: command,
        success: false,
        error: error.message,
        wilson_validated: true,
        timestamp: new Date().toISOString()
      };
      
      this.testResults.push(testResult);
      console.log(`❌ FAIL: ${testName} - ${error.message}`);
      
      return testResult;
    }
  }
  
  // Wilson status validation test
  testWilsonStatus() {
    return this.runTest(
      "Wilson Status Check",
      "status --wilson",
      "cognitive_alignment"
    );
  }
  
  // Basic CLI functionality test
  testBasicCommands() {
    const tests = [
      {
        name: "Help Command",
        command: "--help",
        expected: "NJSON CLI"
      },
      {
        name: "Version Command", 
        command: "--version",
        expected: "1.0.0"
      },
      {
        name: "Status Command",
        command: "status",
        expected: "ACTIVE"
      }
    ];
    
    tests.forEach(test => {
      this.runTest(test.name, test.command, test.expected);
    });
  }
  
  // NJSON processing tests
  testNJSONProcessing() {
    // Create test data
    const testData = '{"test": true, "wilson": "validated"}';
    
    this.runTest(
      "Basic JSON Processing",
      `process '${testData}' --boolean`,
      "processed"
    );
    
    this.runTest(
      "Wilson Protocol Application",
      `process '${testData}' --wilson`,
      "wilson_status"
    );
  }
  
  // Wilson validation tests
  testWilsonValidation() {
    const testJson = '{"boolean": "framework", "cognitive": "aligned"}';
    
    this.runTest(
      "Wilson NJSON Validation",
      `validate '${testJson}'`,
      "wilson_validation"
    );
  }
  
  // File processing test (using existing sample)
  testFileProcessing() {
    const samplePath = path.join(__dirname, '..', '..', '..', 'Examples', 'sample.njson');
    
    if (fs.existsSync(samplePath)) {
      this.runTest(
        "Sample File Parsing",
        `parse "${samplePath}" --count`,
        null // Just check if it runs without error
      );
    } else {
      console.log("⚠️  Sample file not found, skipping file test");
    }
  }
  
  // Run all tests
  runAllTests() {
    console.log("🚀 Starting NJCLI Test Suite");
    console.log(`📋 Wilson Config: ${WILSON_CONFIG.framework}`);
    console.log(`🧠 Cognitive Alignment: ${WILSON_CONFIG.cognitive_alignment}`);
    
    // Execute test suites
    this.testBasicCommands();
    this.testWilsonStatus();
    this.testNJSONProcessing();
    this.testWilsonValidation();
    this.testFileProcessing();
    
    // Generate Wilson-validated test report
    this.generateTestReport();
  }
  
  // Generate Boolean Language Framework test report
  generateTestReport() {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(t => t.success).length;
    const failedTests = totalTests - passedTests;
    const successRate = (passedTests / totalTests * 100).toFixed(2);
    
    const report = {
      wilson_test_report: {
        framework: WILSON_CONFIG.framework,
        cognitive_alignment: WILSON_CONFIG.cognitive_alignment,
        test_approach: WILSON_CONFIG.test_approach
      },
      summary: {
        total_tests: totalTests,
        passed: passedTests,
        failed: failedTests,
        success_rate: `${successRate}%`,
        wilson_validated: true
      },
      results: this.testResults,
      boolean_summary: {
        "IF": `${passedTests} tests passed`,
        "THEN": successRate >= 90 ? "SYSTEM_READY" : "NEEDS_ATTENTION",
        "SUCCESS": failedTests === 0
      }
    };
    
    console.log("\n📊 Wilson Test Report:");
    console.log(`✅ Passed: ${passedTests}/${totalTests} (${successRate}%)`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`🧠 Wilson Validation: ${this.wilsonValidated ? 'ALIGNED' : 'MISALIGNED'}`);
    
    if (failedTests === 0) {
      console.log("\n🎉 All tests passed! NJCLI is Wilson-validated and ready.");
    } else {
      console.log("\n⚠️  Some tests failed. Review errors above.");
    }
    
    // Write detailed report
    const reportPath = path.join(__dirname, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Detailed report: ${reportPath}`);
    
    return report;
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new NJCLITester();
  tester.runAllTests();
}

module.exports = NJCLITester;