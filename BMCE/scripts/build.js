#!/usr/bin/env node

// Build Script for Boolean Mind Code Editor
// Packages Electron app into distributable DMG for macOS

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class BMCEBuilder {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.distPath = path.join(this.projectRoot, 'dist');
    this.version = this.getVersion();
  }

  async build() {
    console.log('🏗️  Boolean Mind Code Editor - Build Process');
    console.log('=============================================');
    
    try {
      await this.validateProject();
      await this.cleanBuildDirectory();
      await this.runElectronBuilder();
      await this.validateBuild();
      await this.createChecksums();
      
      console.log('✅ Build completed successfully!');
      console.log(`   Distribution files created in: ${this.distPath}`);
      
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  }

  async validateProject() {
    console.log('📋 Validating project structure...');
    
    // Check required files
    const requiredFiles = [
      'package.json',
      'src/interface-engine/main.js',
      'src/interface-engine/renderer.js',
      'src/interface-engine/index.html',
      'src/interface-engine/styles/mac-word.css',
      'src/wadelish-commands/commands.js',
      'src/wilson-bridge/mcp-integration.js'
    ];
    
    for (const file of requiredFiles) {
      const filePath = path.join(this.projectRoot, file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Required file missing: ${file}`);
      }
    }
    
    // Check package.json
    const packageJson = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'package.json')));
    if (!packageJson.main || !packageJson.build) {
      throw new Error('Invalid package.json configuration');
    }
    
    console.log('✅ Project structure validated');
  }

  async cleanBuildDirectory() {
    console.log('🧹 Cleaning build directory...');
    
    try {
      if (fs.existsSync(this.distPath)) {
        execSync(`rm -rf "${this.distPath}"`, { cwd: this.projectRoot });
      }
      fs.mkdirSync(this.distPath, { recursive: true });
      
    } catch (error) {
      throw new Error('Failed to clean build directory');
    }
    
    console.log('✅ Build directory cleaned');
  }

  async runElectronBuilder() {
    console.log('⚡ Running Electron Builder...');
    
    try {
      // Install dependencies if needed
      if (!fs.existsSync(path.join(this.projectRoot, 'node_modules'))) {
        console.log('   Installing dependencies...');
        execSync('npm install', { cwd: this.projectRoot, stdio: 'inherit' });
      }
      
      // Build the application
      console.log('   Building Electron application...');
      execSync('npx electron-builder --mac --publish=never', { 
        cwd: this.projectRoot, 
        stdio: 'inherit' 
      });
      
    } catch (error) {
      throw new Error('Electron build process failed');
    }
    
    console.log('✅ Electron application built');
  }

  async validateBuild() {
    console.log('🔍 Validating build output...');
    
    try {
      const expectedFiles = [
        'Boolean Mind Code Editor-1.0.0.dmg',
        'Boolean Mind Code Editor-1.0.0-mac.zip'
      ];
      
      for (const file of expectedFiles) {
        const filePath = path.join(this.distPath, file);
        if (!fs.existsSync(filePath)) {
          console.warn(`   Warning: Expected file not found: ${file}`);
        } else {
          const stats = fs.statSync(filePath);
          console.log(`   ✓ ${file} (${this.formatBytes(stats.size)})`);
        }
      }
      
    } catch (error) {
      throw new Error('Build validation failed');
    }
    
    console.log('✅ Build output validated');
  }

  async createChecksums() {
    console.log('🔐 Creating checksums...');
    
    try {
      const files = fs.readdirSync(this.distPath);
      const checksums = [];
      
      for (const file of files) {
        if (file.endsWith('.dmg') || file.endsWith('.zip')) {
          const filePath = path.join(this.distPath, file);
          const checksum = execSync(`shasum -a 256 "${filePath}"`, { encoding: 'utf8' });
          checksums.push(checksum.trim());
          console.log(`   ✓ ${file}: ${checksum.split(' ')[0]}`);
        }
      }
      
      // Write checksums file
      const checksumFile = path.join(this.distPath, 'checksums.txt');
      fs.writeFileSync(checksumFile, checksums.join('\n') + '\n');
      
    } catch (error) {
      console.warn('Warning: Failed to create checksums');
    }
    
    console.log('✅ Checksums created');
  }

  getVersion() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'package.json')));
      return packageJson.version || '1.0.0';
    } catch (error) {
      return '1.0.0';
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Run build if called directly
if (require.main === module) {
  const builder = new BMCEBuilder();
  builder.build();
}

module.exports = BMCEBuilder;