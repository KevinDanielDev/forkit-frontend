# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- **Comprehensive JSDoc documentation** — Enhanced developer experience with detailed JSDoc for all core modules
  - Services documentation (`src/infrastructure/parse/auth/auth.service.ts`) — Complete method documentation with parameters, return types, and examples
  - Composables documentation (`src/composables/`) — 6 composables fully documented with usage examples
  - Interfaces documentation (`src/models/interfaces/`) — 6 type definitions with detailed property descriptions
  - Enhanced README with documentation reference section and recent commits table

### Changed

- Updated README with documentation section highlighting JSDoc coverage and code organization

## [0.0.1] - 2026-05-12

### Added

- **Multi-step responsive dialog** — Interactive dialog for creating orders with responsive interface ([#7](https://github.com/KevinDanielDev/forkit-frontend/pull/7), [3b20665](https://github.com/KevinDanielDev/forkit-frontend/commit/3b20665))
- **Professional control panel design** — Professional visual architecture for the dashboard with consistent design system, modular navigation and recent orders views ([#7](https://github.com/KevinDanielDev/forkit-frontend/pull/7), [427f35e](https://github.com/KevinDanielDev/forkit-frontend/commit/427f35e))
  - Reusable global classes for containers
  - Consistent iconography system
  - High-contrast typography
  - Structured navigation (Management, Analysis, Home)

- **Authentication system** — Complete authentication system with sign-up ([#5](https://github.com/KevinDanielDev/forkit-frontend/pull/5), [#6](https://github.com/KevinDanielDev/forkit-frontend/pull/6))
  - [0bda958](https://github.com/KevinDanielDev/forkit-frontend/commit/0bda958) Sign-up functionality with complete validation
    - Form with 7 fields: firstName, lastName, email, phone, countryCode, password, confirmPassword
    - Reusable FormInput component
    - AuthCard and AuthToggle components
    - Pinia store for authentication state management
    - Password strength indicator
    - Complete i18n translations for authentication
    - TypeScript strict mode fixes
    - ESLint error resolution
  - [c1e4694](https://github.com/KevinDanielDev/forkit-frontend/commit/c1e4694) Authentication system visual design
    - Professional UI for login and registration
    - Integrated dark theme
    - Reusable components

- **Automated CI/CD pipeline** — GitHub Actions continuous integration pipeline ([#3](https://github.com/KevinDanielDev/forkit-frontend/pull/3), [326539e](https://github.com/KevinDanielDev/forkit-frontend/commit/326539e))
  - Automatic linting validation (ESLint)
  - Type checking with TypeScript
  - Build testing
  - Execution on pull requests to develop
  - Controlled concurrency

- **Type checking** — TypeScript support with strict type validation
  - `type-check` script for validation without emit
  - Strict TypeScript configuration

- **Internationalization (i18n)** — Multi-language support with Spanish included
  - Vue-i18n v11.0.0
  - Authentication system translations
  - Extensible configuration for multiple languages

- **Dark theme support** — Modern dark theme integrated into components

- **Icon library** — Lucide Vue for consistent iconography

- **Linting & Formatting** — ESLint and Prettier configured
  - Configuration with Vue 3 and TypeScript support
  - Lint and format scripts
  - Code validation in CI/CD

### Changed

- [5f0d0f6](https://github.com/KevinDanielDev/forkit-frontend/commit/5f0d0f6) - **Project cleanup** — Initial project cleanup and base configuration
- [d0e40dd](https://github.com/KevinDanielDev/forkit-frontend/commit/d0e40dd) - **Routing configuration** — Initial route configuration with redirection from `/` to `/auth/sign-up`

### Fixed

- TypeScript strict mode errors — Strict type validation fixes
- ESLint configuration issues — Linting configuration problem resolution
- Error handling and validation — Improvements in error handling and form validation

### Technical Details

**Commit History:**

```
44d48bc - Integrate Vue Query for reactive authentication state
e0b4eea - Installation and configuration of Vue Query + DevTools
f3d437e - Merge pull request #14 from KevinDanielDev/feat/13-auth-system-implementation
4548dd7 - feat: 🎸 Implement authentication system with Parse SDK
b0f02f4 - Merge pull request #12 from KevinDanielDev/feat/11-parse-server-connection
48dfa91 - feat: 🎸 Connection to parse-server via boot initialization
2e2dca2 - Merge pull request #10 from KevinDanielDev/feat/9-new-order-dialog
b01f2f1 - feat: 🎸 Setup project guidelines and documentation
3b20665 - Implement responsive multi-step create order dialog
fe91693 - Merge pull request #8 from KevinDanielDev/feat/7-dashboard-ui
427f35e - feat: 🎸 Implement a professional control panel design
4954508 - Merge pull request #6 from KevinDanielDev/feat/5-auth-system-identity-design
c1e4694 - feat: 🎸 Implementation of auth system visual design
d0e40dd - docs: Update decision log with error fixes and routing config
0bda958 - feat: Implement sign-up authentication system with validation
2d0b416 - Merge pull request #4 from KevinDanielDev/feat/3-ci-pipeline-automated-testing
326539e - ci: 🎡 Implement automated testing and build validation
d40a724 - Merge pull request #2 from KevinDanielDev/chore/1-initial-quasar-cleanup
5f0d0f6 - chore: 🤖 Project cleanup
d8fe4fc - Initialize the project 🚀
```

## Conventions

This project follows these conventions:

### Commits

- `feat:` New functionality
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code formatting changes (does not affect logic)
- `refactor:` Code refactoring without changing functionality
- `perf:` Performance improvements
- `test:` Tests
- `chore:` Configuration changes
- `ci:` CI/CD changes

### Versioning

- **MAJOR** — Breaking changes
- **MINOR** — New features (backward compatible)
- **PATCH** — Bug fixes

---

[Unreleased]: https://github.com/KevinDanielDev/forkit-frontend/compare/v0.0.1...develop
[0.0.1]: https://github.com/KevinDanielDev/forkit-frontend/releases/tag/v0.0.1
