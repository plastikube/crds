# AGENTS.md

This document provides guidelines for agentic coding assistants working with this Kubernetes Custom Resource Definitions (CRDs) codebase.

## Build Commands

```bash
# Build the project (compiles TypeScript and generates CRDs)
npm run build

# This runs:
# 1. npx tsc (TypeScript compilation)
# 2. cd src && npx pepr crd generate --output ../crds (CRD generation)
```

## Linting Commands

```bash
# Lint the source code
npm run lint

# This runs:
# npx eslint src/

# Auto-fix linting issues
npx eslint src/ --fix
```

## Formatting Commands

```bash
# Format code with Prettier
npx prettier --write src/

# Check formatting without making changes
npx prettier --check src/
```

## Testing Commands

This project currently doesn't have unit tests configured. ESLint is used for static code analysis.

## Code Style Guidelines

### Language and Runtime

- Node.js version >= 24.0.0
- TypeScript with ES modules (ESM)
- Strict TypeScript mode enabled

### Imports and Exports

- Use ES Module syntax (`import`/`export`)
- Use explicit file extensions in imports (`.mjs` for JavaScript, `.mts` for TypeScript)
- Prefer named exports over default exports
- Group imports in this order:
  1. External packages
  2. Internal modules
  3. Type imports (./, ../)

### File Naming Conventions

- Use `.mts` extension for TypeScript files
- Use `.mjs` extension for JavaScript files
- Use kebab-case for file names
- Use PascalCase for class and type names
- Use camelCase for variables and functions

### Formatting

- Indentation: 2 spaces (no tabs)
- Semicolons: Required at end of statements
- Quotes: Single quotes preferred
- Trailing commas: Enabled for ES5+ compatibility
- Line width: 80 characters preferred, 100 max

### Type System

- Use TypeScript strictly (strict: true in tsconfig)
- Explicitly type all function parameters and return values
- Prefer interfaces over types for object shapes
- Use enums for fixed sets of values
- Avoid `any` type unless absolutely necessary with explicit justification

### Error Handling

- Always handle Promise rejections
- Use try/catch blocks for synchronous operations that might throw
- Create custom error classes for specific error types
- Include meaningful error messages with context
- Log errors appropriately but don't expose sensitive information

### Kubernetes CRD Specifics

- Follow Kubernetes naming conventions for CRDs
- Use proper API versioning (apiextensions.k8s.io/v1)
- Define proper validation schemas using OpenAPI v3
- Include meaningful descriptions for all fields
- Use appropriate structural schemas
- Follow pluralization rules for resource names

### Documentation

- Document all public APIs with JSDoc/TSDoc
- Include examples for complex functionality
- Keep README.md updated with major changes
- Comment non-obvious code logic

## Project Structure

- `src/` - Source code
- `src/api/` - API definitions and models
- `dist/` - Compiled output
- `crds/` - Generated CRD manifests (created during build)

## Dependencies

- `pepr` - Framework for Kubernetes operators
- `cdk8s` - Cloud Development Kit for Kubernetes
- `@kubernetes/client-node` - Official Kubernetes client
- `constructs` - Construct programming model

## Development Workflow

1. Make changes to source files in `src/`
2. Run `npm run lint` to check for issues
3. Run `npm run build` to compile and generate CRDs
4. Test changes locally if applicable

## CI/CD Considerations

- All code must pass linting checks
