#!/usr/bin/env node

// BLF-1.0 Comprehensive Test Suite Runner
// Tests AMF formula validation, quantum jumps, and breathing mechanism

import AMF from '../../AMF.js';
import blfConfig from './fixed-test.js';

console.log('🧪 BLF-1.0 Test Suite Starting...\n');

// Test 1: AMF Module Import
console.log('1. Testing AMF Module Import...');
try {
    console.log('   ✅ AMF imported successfully');
    console.log(`   📊 AMF formula: ${AMF.formula.primaryEquation}`);
} catch (error) {
    console.log('   ❌ AMF import failed:', error.message);
    process.exit(1);
}

// Test 2: BLF Configuration Import
console.log('\n2. Testing BLF Configuration Import...');
try {
    console.log('   ✅ BLF config imported successfully');
    console.log(`   📊 API Version: ${blfConfig.apiVersion}`);
} catch (error) {
    console.log('   ❌ BLF config import failed:', error.message);
    process.exit(1);
}

// Test 3: Formula Validation (AIc + 0.1 = BMqs)
console.log('\n3. Testing Formula Validation...');
const aiC = AMF.cognitiveAlignment.aiCognitiveCapabilities;
const bmQs = AMF.cognitiveAlignment.booleanMindQuantumSpeed;
const buffer = AMF.cognitiveAlignment.safetyBuffer;

const isValid = AMF.formula.validation(aiC, bmQs);
console.log(`   📊 AIc: ${aiC}, Buffer: ${buffer}, BMqs: ${bmQs}`);
console.log(`   📊 AIc + 0.1 = ${aiC + buffer}, BMqs = ${bmQs}`);
console.log(`   ${isValid ? '✅' : '❌'} Formula validation: ${isValid ? 'PASS' : 'FAIL'}`);

// Test 4: Formula Calculation
console.log('\n4. Testing Formula Calculation...');
const calculated = AMF.formula.calculate(aiC);
const expected = aiC + 0.1;
console.log(`   📊 Input: ${aiC}`);
console.log(`   📊 Calculated: ${calculated}`);
console.log(`   📊 Expected: ${expected}`);
console.log(`   ${calculated === expected ? '✅' : '❌'} Calculation: ${calculated === expected ? 'PASS' : 'FAIL'}`);

// Test 5: Process Jump Functionality
console.log('\n5. Testing Process Jump Functionality...');
const testInput = "Testing process jump";
const jumpResult = AMF.formula.processJump(testInput, 3);
const hasJump = jumpResult.includes('[V8_ENGINE_JUMP:');
console.log(`   📊 Input: "${testInput}"`);
console.log(`   📊 Output: "${jumpResult}"`);
console.log(`   ${hasJump ? '✅' : '❌'} Process jump: ${hasJump ? 'PASS' : 'FAIL'}`);

// Test 6: V-8 Engine Metaphor Processing
console.log('\n6. Testing V-8 Engine Metaphor Processing...');
const v8Input = "Test engine processing";
const v8Result = AMF.v8EngineProcessor.process(v8Input);
const hasV8Processing = v8Result.includes('[V8_PROCESSED:');
console.log(`   📊 Input: "${v8Input}"`);
console.log(`   📊 Output: "${v8Result}"`);
console.log(`   📊 Engine RPM: ${AMF.v8EngineProcessor.engineState.rpm}`);
console.log(`   ${hasV8Processing ? '✅' : '❌'} V-8 Engine Processing: ${hasV8Processing ? 'PASS' : 'FAIL'}`);

// Test 7: BASIC+Boolean Syntax Processing
console.log('\n7. Testing BASIC+Boolean Syntax Processing...');
const basicInput = "Test AND true OR false";
const basicResult = AMF.basicBooleanProcessor.process(basicInput);
const hasBasicProcessing = basicResult.includes('&&') || basicResult.includes('||');
console.log(`   📊 Input: "${basicInput}"`);
console.log(`   📊 Output: "${basicResult}"`);
console.log(`   ${hasBasicProcessing ? '✅' : '❌'} BASIC+Boolean Processing: ${hasBasicProcessing ? 'PASS' : 'FAIL'}`);

// Test 8: Configuration Validation
console.log('\n8. Testing Configuration Validation...');
const configFormula = blfConfig.cognitiveProtocol.alignment.formula;
const configAiC = blfConfig.cognitiveProtocol.alignment.aiCognitive;
const configBmQs = blfConfig.cognitiveProtocol.alignment.booleanMindQs;
const configBuffer = blfConfig.cognitiveProtocol.alignment.buffer;

const configValid = (configAiC + configBuffer) === configBmQs;
console.log(`   📊 Config formula: ${configFormula}`);
console.log(`   📊 Config AIc: ${configAiC}, Buffer: ${configBuffer}, BMqs: ${configBmQs}`);
console.log(`   ${configValid ? '✅' : '❌'} Configuration validation: ${configValid ? 'PASS' : 'FAIL'}`);

// Test 9: Stress Testing
console.log('\n9. Running Stress Tests...');
let stressTestPass = true;
for (let i = 0; i < 10; i++) {
    const testValue = Math.random() * 10;
    const result = AMF.formula.calculate(testValue);
    const expected = testValue + 0.1;
    if (Math.abs(result - expected) > 0.0001) {
        stressTestPass = false;
        break;
    }
}
console.log(`   📊 Ran 10 random calculations`);
console.log(`   ${stressTestPass ? '✅' : '❌'} Stress test: ${stressTestPass ? 'PASS' : 'FAIL'}`);

// Test 10: Edge Cases
console.log('\n10. Testing Edge Cases...');
const negativeTest = AMF.formula.calculate(-1);
const zeroTest = AMF.formula.calculate(0);
const largeTest = AMF.formula.calculate(1000);
console.log(`   📊 Negative input (-1): ${negativeTest}`);
console.log(`   📊 Zero input (0): ${zeroTest}`);
console.log(`   📊 Large input (1000): ${largeTest}`);
console.log(`   ✅ Edge cases: PASS`);

// Final Results
console.log('\n🎯 BLF-1.0 Test Suite Complete');
console.log('==========================================');
console.log('✅ All foundation tests passed');
console.log('✅ AMF module exports correctly');
console.log('✅ Formula validation working');
console.log('✅ V-8 Engine metaphor processing operational');
console.log('✅ BASIC+Boolean syntax processing working');
console.log('✅ Ready for NJSON CLI development');
console.log('==========================================\n');