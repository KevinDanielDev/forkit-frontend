# Contributing to ForkIt Frontend

First of all, thank you for your interest in contributing to ForkIt! 🎉

This document provides guidelines and procedures for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Pull Requests](#pull-requests)
- [Development Conventions](#development-conventions)
- [Review Process](#review-process)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to k4vind@gmail.com.

## How to Contribute

There are many ways to contribute:

- 🐛 Report bugs
- 💡 Suggest new features
- 📚 Improve documentation
- 🔧 Submit pull requests
- 💬 Participate in discussions

## Reporting Bugs

### Before Reporting

Check the [issues list](https://github.com/KevinDanielDev/forkit-frontend/issues) to ensure the bug hasn't been reported.

### How to Report

1. Go to [Issues](https://github.com/KevinDanielDev/forkit-frontend/issues)
2. Click "New issue"
3. Choose the "Bug report" template
4. Fill in all required information

**Include:**

- Clear description of the problem
- Steps to reproduce
- Current behavior
- Expected behavior
- Screenshots/videos if relevant
- Your environment (OS, Node version, browser, etc.)

### Example

```
## Description
The sign-up form fails to submit data...

## Steps to Reproduce
1. Navigate to /auth/sign-up
2. Fill in all fields
3. Click "Sign up"

## Expected Behavior
Should show success message

## Actual Behavior
Shows error 500

## Environment
- OS: Ubuntu 22.04
- Node: v22.0.0
- Browser: Chrome 125
```

## Suggesting Enhancements

### Before Suggesting

Check that the feature hasn't been suggested in [Issues](https://github.com/KevinDanielDev/forkit-frontend/issues).

### How to Suggest

1. Go to [Issues](https://github.com/KevinDanielDev/forkit-frontend/issues)
2. Click "New issue"
3. Choose the "Feature request" template
4. Provide all details

**Include:**

- Clear description of the feature
- Use case/motivation
- Examples of how it would work
- Possible alternatives considered

## Pull Requests

### Before Starting

1. Fork the repository
2. Clone your fork
3. Create a branch for your work

```bash
git checkout -b feat/my-amazing-feature
```

### During Development

#### Setup

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# In another terminal, check types
bun run type-check
```

#### Keep Your Code Clean

```bash
# Lint
bun run lint

# Lint with automatic fix
bun run lint -- --fix

# Format with Prettier
bun run format

# Type checking
bun run type-check
```

#### Commits

Follow semantic commit convention:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat:` New functionality
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code formatting (whitespace, commas, etc.)
- `refactor:` Code changes without affecting functionality
- `perf:` Performance improvement
- `test:` Test additions or modifications
- `chore:` Build, dependency changes, etc.
- `ci:` CI/CD changes

**Emojis (optional but recommended):**

- ✨ `feat:`
- 🐛 `fix:`
- 📚 `docs:`
- 🎨 `style:`
- ♻️ `refactor:`
- ⚡ `perf:`
- ✅ `test:`
- 🤖 `chore:`
- 🔄 `ci:`

**Examples:**

```
feat: ✨ Add email validation to sign-up

fix: 🐛 Fix type error in AuthStore

docs: 📚 Update README with installation instructions

refactor: ♻️ Extract form logic into composable
```

### Prepare Your Pull Request

1. **Make sure your code is clean:**

```bash
bun run lint -- --fix
bun run format
bun run type-check
bun run build
```

All must pass without errors.

2. **Push to your fork:**

```bash
git push origin feat/my-amazing-feature
```

3. **Open a Pull Request:**
   - Go to [Pull Requests](https://github.com/KevinDanielDev/forkit-frontend/pulls)
   - Click "New pull request"
   - Select `base: develop` and `compare: your-branch`
   - Fill in the template

## Development Conventions

### Folder Structure

```
src/
├── animations/    # Lottie animations
├── boot/          # Initializers
├── components/    # Reusable Vue components
├── composables/   # Vue composables
├── css/           # Global styles
├── i18n/          # Translations
├── layouts/       # Layouts
├── models/        # TypeScript types and interfaces
├── pages/         # Views/Pages
├── router/        # Route configuration
├── stores/        # Pinia stores
├── App.vue
└── env.d.ts
```

### TypeScript

- ✅ Use explicit types when possible
- ✅ Avoid `any`, use `unknown` if necessary
- ✅ Define interfaces in `src/models/`
- ✅ Use composables for reusable logic

### Vue Components

- ✅ Use `<script setup>` from Vue 3
- ✅ Components in PascalCase (e.g., `MyComponent.vue`)
- ✅ Props and emits with explicit types
- ✅ Descriptive names in template

**Example:**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  label: string;
  modelValue: string;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Input',
  modelValue: '',
});

const emit = defineEmits<Emits>();

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input v-model="value" type="text" />
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  margin-bottom: 1rem;
}
</style>
```

### Translations (i18n)

- Add all translations in `src/i18n/`
- Maintain consistency of keys
- Support multiple languages from the start

### Styles

- Use SCSS when possible
- Avoid inline styles
- Reuse global classes defined in `src/css/`
- Use BEM or similar for naming

### Quasar Components

Take advantage of Quasar components when possible:

```vue
<q-btn label="Click me" color="primary" />
<q-card>...</q-card>
<q-input label="Name" />
```

[Quasar Documentation](https://quasar.dev/vue-components)

## Review Process

### What We Look For

Our team reviews PRs considering:

- ✅ Follows project conventions
- ✅ Clean and maintainable code
- ✅ Tests (if applicable)
- ✅ Updated documentation
- ✅ Does not break existing functionality
- ✅ Lint and type check pass

### Feedback

- We will be constructive and respectful
- There may be requests for changes
- We expect you to respond in a reasonable time
- If you disappear, we may eventually close the PR

### Merge

Once approved:

- Your PR will be merged to `develop`
- It will be included in the next release
- You will be credited in the CHANGELOG

## Questions / Support

- 📮 Open an issue
- 💬 Use [Discussions](https://github.com/KevinDanielDev/forkit-frontend/discussions)
- 📧 Email: k4vind@gmail.com

---

**Thank you for contributing to ForkIt! 🚀**
