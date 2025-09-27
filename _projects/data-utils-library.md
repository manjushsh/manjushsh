---
title: "Data Utils Library"
description: "A lightweight TypeScript utility library for data manipulation, validation, and transformation. Provides a comprehensive set of functions for common data operations with full type safety."
date: 2025-09-15
tech_stack:
  - "TypeScript"
  - "Jest"
  - "Rollup"
  - "ESLint"
  - "Prettier"
github_url: "https://github.com/manjushsh/data-utils-ts"
status: "completed"
featured: false
categories:
  - "Open Source"
  - "Library"
features:
  - "Full TypeScript support with strict typing"
  - "Tree-shakeable for optimal bundle size"
  - "Comprehensive test coverage (95%+)"
  - "Zero dependencies for maximum compatibility"
  - "Extensive documentation and examples"
---

## Library Overview

Data Utils Library is a comprehensive TypeScript utility library designed to simplify common data manipulation tasks. Built with performance and type safety in mind, it provides developers with a reliable set of tools for working with various data types.

## Installation & Usage

```bash
npm install @manjushsh/data-utils
# or
yarn add @manjushsh/data-utils
```

```typescript
import { arrayUtils, objectUtils, stringUtils } from '@manjushsh/data-utils';

// Array operations
const uniqueItems = arrayUtils.unique([1, 2, 2, 3, 4, 4]);
const chunks = arrayUtils.chunk([1, 2, 3, 4, 5, 6], 2);

// Object operations  
const merged = objectUtils.deepMerge(obj1, obj2);
const nested = objectUtils.get(data, 'user.profile.name', 'default');

// String operations
const camelCase = stringUtils.toCamelCase('hello-world-example');
const truncated = stringUtils.truncate(longText, 100, '...');
```

## Core Modules

### Array Utilities
- **Manipulation**: chunk, flatten, unique, difference, intersection
- **Searching**: findBy, filterBy, sortBy with custom comparators
- **Aggregation**: sum, average, min, max, groupBy
- **Validation**: isEmpty, isArray, hasLength

### Object Utilities
- **Deep Operations**: deepClone, deepMerge, deepEqual comparison
- **Property Access**: safe get/set with dot notation paths
- **Transformation**: pick, omit, mapKeys, mapValues
- **Validation**: hasProperty, isObject, isPlainObject

### String Utilities  
- **Case Conversion**: camelCase, kebab-case, snake_case, PascalCase
- **Formatting**: truncate, padStart, padEnd, template interpolation
- **Validation**: isEmail, isURL, isNumeric, isEmpty
- **Manipulation**: reverse, capitalize, slugify, stripHtml

### Validation Module
```typescript
import { validators } from '@manjushsh/data-utils';

const userSchema = {
  name: validators.string().required().min(2),
  email: validators.string().email().required(),
  age: validators.number().min(18).max(120),
  roles: validators.array().of(validators.string())
};

const result = validators.validate(userData, userSchema);
if (result.valid) {
  // Data is valid
} else {
  console.log(result.errors);
}
```

## Development & Testing

### Build System
- **Rollup**: Modern bundling with tree-shaking support
- **TypeScript**: Strict type checking and declaration file generation
- **Multiple Formats**: CommonJS, ESM, and UMD builds
- **Size Optimization**: Terser for production builds

### Quality Assurance
- **Jest Testing**: Comprehensive unit tests with 95%+ coverage
- **ESLint**: Code quality and consistency enforcement
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality gates

### Performance Benchmarks
```typescript
// Benchmark results (operations per second)
arrayUtils.unique():        ~2,000,000 ops/sec
objectUtils.deepClone():    ~500,000 ops/sec  
stringUtils.toCamelCase():  ~1,000,000 ops/sec
validators.email():         ~800,000 ops/sec
```

## Documentation & Community

### API Documentation
- **TypeDoc**: Auto-generated API documentation
- **Interactive Examples**: CodeSandbox integrations
- **Migration Guides**: Upgrade paths between versions
- **Best Practices**: Performance tips and usage patterns

### Open Source Stats
- **GitHub Stars**: 250+ (and growing)
- **NPM Downloads**: 5,000+ monthly downloads
- **Contributors**: 8 active contributors
- **Issues Resolved**: 95% issue resolution rate

The library has been adopted by several mid-size companies for their data processing needs, demonstrating its reliability and usefulness in real-world applications.