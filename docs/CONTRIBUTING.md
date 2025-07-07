# Contributing to Boolean Mind Code Editor

Welcome to the Boolean Mind Code Editor (BMCE) project! This guide will help you understand how to contribute to this natural language IDE with Wilson AI integration.

## Project Overview

BMCE is a specialized code editor designed for:
- Natural language programming with NJSON support
- Wilson AI integration through MCP (Model Context Protocol)
- Mac Word aesthetic with Times Roman typography
- Wadelish command shortcuts (87 abbreviations)
- Boolean Language Framework integration

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- macOS (for full compatibility)
- Wilson MCP server access

### Installation
```bash
git clone https://github.com/WTM3/BMCE.git
cd BMCE
npm install
npm run wilson-setup
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run wilson-setup # Initialize Wilson MCP
npm test            # Run tests
```

## Architecture

### Core Components

#### Interface Engine (`src/interface-engine/`)
- **main.js**: Electron main process
- **renderer.js**: UI logic and Wilson integration
- **index.html**: Main interface structure
- **styles/mac-word.css**: Times Roman styling

#### Wadelish Commands (`src/wadelish-commands/`)
- **commands.js**: 87 abbreviation system
- Natural language command processing
- Context-aware execution

#### Wilson Bridge (`src/wilson-bridge/`)
- **mcp-integration.js**: Wilson MCP client
- Cognitive alignment validation
- Boolean Language Framework integration

## Code Style

### Typography Standards
- **Primary Font**: Times Roman for all NJSON content
- **Secondary Font**: System fonts for UI elements
- **Aesthetic**: Clean Mac Word-inspired design

### JavaScript Conventions
- ES6+ syntax preferred
- Async/await for asynchronous operations
- Modular architecture with clear separation of concerns
- Comprehensive error handling

### CSS Standards
- CSS custom properties for theming
- Mobile-first responsive design
- Semantic class naming
- Accessibility compliance

## Wilson Integration

### Cognitive Alignment
All Wilson integrations must maintain:
- AI Capabilities: 2.89
- Safety Buffer: 0.1
- Boolean Mind Qs: 2.99
- Formula: AIc + 0.1 = BMqs

### MCP Protocol
- Use proper MCP message formatting
- Handle connection failures gracefully
- Implement retry mechanisms
- Validate responses

## Boolean Language Framework

### NJSON Support
- Syntax highlighting for .njson files
- Validation and formatting
- Natural language annotations
- Wilson analysis integration

### Command Processing
- Support for 87 Wadelish abbreviations
- Natural language fallback
- Context-aware suggestions
- History tracking

## Testing

### Unit Tests
- Wilson bridge functionality
- Wadelish command processing
- NJSON parsing and validation
- UI component behavior

### Integration Tests
- Electron app launching
- Wilson MCP connection
- File operations
- Command execution

### Manual Testing
- Typography rendering
- Drag and drop functionality
- Keyboard shortcuts
- Multi-window support

## Pull Request Process

1. **Fork and Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Wilson Validation**
   - Ensure cognitive alignment is maintained
   - Run Wilson integration tests
   - Validate Boolean Language Framework compliance

3. **Code Review Checklist**
   - [ ] Times Roman typography preserved
   - [ ] Wilson integration functional
   - [ ] Wadelish commands working
   - [ ] No breaking changes to MCP protocol
   - [ ] Documentation updated

4. **Testing Requirements**
   - [ ] All existing tests pass
   - [ ] New tests added for new features
   - [ ] Manual testing completed
   - [ ] Electron app builds successfully

## Issue Reporting

### Bug Reports
Include:
- OS version and hardware
- Electron version
- Wilson MCP connection status
- Steps to reproduce
- Expected vs actual behavior

### Feature Requests
Describe:
- Use case and motivation
- Proposed implementation
- Wilson integration requirements
- Impact on existing functionality

## Code of Conduct

### Wilson Protocol
- Respect cognitive alignment requirements
- Maintain Boolean Language Framework standards
- Ensure accessibility and usability
- Follow security best practices

### Collaboration
- Be respectful and inclusive
- Provide constructive feedback
- Help maintain code quality
- Document changes thoroughly

## Resources

### Documentation
- [Wilson MCP Protocol](link-to-wilson-docs)
- [Boolean Language Framework](link-to-blf-docs)
- [Electron Documentation](https://electronjs.org/docs)
- [NJSON Specification](link-to-njson-spec)

### Tools
- [Wilson MCP Server](link-to-wilson-server)
- [Wadelish Command Reference](link-to-wadelish-ref)
- [BMCE Style Guide](link-to-style-guide)

## Getting Help

- Create an issue for bugs or feature requests
- Join the Discord server for real-time discussion
- Check existing documentation and issues first
- Provide detailed context for questions

Thank you for contributing to Boolean Mind Code Editor! Your involvement helps create a better natural language programming experience for everyone.