# NJSON CLI Project

## Project Overview
This is the NJSON CLI project directory structure for developing a command-line interface tool for NJSON (Named JSON) processing.

## Directory Structure

```
NJSON-CLI/
├── Documentation/
│   ├── Specifications/       # Technical specifications and requirements
│   ├── Architecture/         # System architecture documentation
│   └── User-Guide/          # User documentation and guides
├── Source-Code/
│   ├── Working-Builds/      # Stable, tested builds ready for use
│   ├── Development/         # Active development code
│   └── Backups/            # Code backups and version snapshots
├── Tests/
│   ├── Unit-Tests/         # Individual component tests
│   ├── Integration-Tests/   # System integration tests
│   └── Test-Data/          # Test data files and fixtures
├── Examples/               # Example NJSON files and usage demonstrations
├── Wilson-MCP/
│   ├── Server-Implementation/  # Wilson MCP server code
│   ├── Tool-Definitions/      # MCP tool definitions
│   └── Integration-Configs/   # Integration configuration files
├── Project-Management/     # Project planning and management files
└── Resources/
    ├── Reference-Materials/  # Reference documents and research
    ├── Dependencies/        # External dependencies and libraries
    └── Build-Scripts/       # Build automation scripts
```

## Purpose
Each directory serves a specific purpose in the NJSON CLI development lifecycle:

- **Documentation**: All project documentation including specs, architecture, and user guides
- **Source-Code**: All source code organized by development stage
- **Tests**: Comprehensive testing framework and test data
- **Examples**: Demonstration files and usage examples
- **Wilson-MCP**: Wilson MCP server integration components
- **Project-Management**: Project planning, tracking, and management
- **Resources**: Supporting materials, dependencies, and build tools

## Dropbox Sync
This directory structure is automatically synchronized to Dropbox cloud storage via the local Dropbox sync client.

## Getting Started
1. Development work should begin in `Source-Code/Development/`
2. Stable builds should be moved to `Source-Code/Working-Builds/`
3. All features should have corresponding tests in `Tests/`
4. Documentation should be maintained in `Documentation/`

## Foundation
This project builds upon the Boolean Language Foundation (BLF) located at:
`~/Library/CloudStorage/Dropbox/AMF/BLF/`

The BLF provides the core AMF (AI Maturation Formula) implementation and processing capabilities that serve as the foundation for NJSON CLI functionality.