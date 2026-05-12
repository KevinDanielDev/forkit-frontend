# 🍴 ForkIt Frontend

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-green)](https://nodejs.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)
[![Quasar 2](https://img.shields.io/badge/Quasar-2.16-blue)](https://quasar.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

> **The official ForkIt dashboard** — A clean, intuitive interface for managing freelance clients, task tracking, and invoice generation.

ForkIt is a comprehensive solution for freelancers who need a professional dashboard to manage their clients, projects, tasks, and billing in an organized and efficient way.

## ✨ Features

- 📊 **Professional Dashboard** — Visualize a complete overview of your business
- 👥 **Client Management** — Organize and track all your freelance clients
- ✅ **Task Tracking** — Create and manage projects and associated tasks
- 💰 **Invoice Generation** — Create professional invoices automatically
- 🔐 **Secure Authentication** — Sign-up system with complete validation
- 🌍 **Multi-language Support** — Internationalization (i18n) support with Spanish included
- 🌙 **Dark Theme** — Modern interface with theme support
- ⚡ **TypeScript type-safe** — Type-safe code with static types
- 🔄 **Automatic CI/CD** — Continuous validation pipeline
- 📱 **Responsive Design** — Adaptive design for all devices

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Tech Stack](#-tech-stack)
- [Development](#-development)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Contact](#-contact)
- [License](#-license)

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 20.0.0 (v22+ recommended)
- **Package manager**: npm (>= 6.13.4), yarn (>= 1.21.1), pnpm (>= 10.0.0) or bun (recommended)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/KevinDanielDev/forkit-frontend.git
cd forkit-frontend
```

2. **Install dependencies**

```bash
# With bun (recommended)
bun install

# With npm
npm install

# With yarn
yarn

# With pnpm
pnpm install
```

3. **Start the development server**

```bash
# With bun
bun run dev

# With npm
npm run dev

# With yarn
yarn dev

# With pnpm
pnpm dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Tech Stack

### Frontend Framework

- **[Vue 3](https://vuejs.org/)** (3.5.22) — Progressive JavaScript framework
- **[Quasar Framework](https://quasar.dev/)** (2.16.0) — High-performance Vue 3 framework
- **[TypeScript](https://www.typescriptlang.org/)** (5.9) — Static typing for JavaScript

### State Management & Routing

- **[Pinia](https://pinia.vuejs.org/)** (3.0.1) — State management
- **[Vue Router](https://router.vuejs.org/)** (5.0.0) — Client-side routing

### HTTP & Utilities

- **[Axios](https://axios-http.com/)** (1.2.1) — HTTP client
- **[vue-i18n](https://vue-i18n.intlify.dev/)** (11.0.0) — Internationalization
- **[Lucide Vue](https://lucide.dev/docs/lucide-vue)** (1.14.0) — Icon library

### Animations

- **[vue3-lottie](https://github.com/chenqiaoen521/vue3-lottie)** (3.3.1) — Lottie animations

### Development Tools

- **[ESLint](https://eslint.org/)** (9.14.0) — Linting
- **[Prettier](https://prettier.io/)** (3.3.3) — Code formatting
- **[Vite](https://vitejs.dev/)** — Build tool (integrated with Quasar)

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev           # Start development server with hot-reload

# Code Quality
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run type-check    # Validate types with TypeScript

# Production
npm run build         # Optimized build for production

# Setup
npm run postinstall   # Prepare Quasar (runs automatically)
```

### Local Setup

1. Make sure you have the required tools installed
2. Copy `.env.local.example` to `.env.local` if it exists
3. Run `npm install`
4. Run `npm run dev`

### Linting and Formatting

The project uses **ESLint** and **Prettier** to maintain clean and consistent code.

```bash
# Lint
npm run lint

# Lint with automatic fixes
npm run lint -- --fix

# Format
npm run format
```

### Type Checking

TypeScript runs in strict mode. Check types before pushing:

```bash
npm run type-check
```

### Build for Production

```bash
npm run build
```

Compiled files will be in the `/dist` folder

## 📁 Project Structure

```
forkit-frontend/
├── src/
│   ├── animations/          # Animations and Lottie files
│   ├── boot/                # Application initializers
│   ├── components/          # Reusable Vue components
│   ├── composables/         # Vue composables
│   ├── css/                 # Global styles
│   ├── i18n/                # Language configuration
│   ├── layouts/             # Application layouts
│   ├── models/              # TypeScript types and interfaces
│   ├── pages/               # Pages/Views
│   ├── router/              # Route configuration
│   ├── stores/              # Pinia stores
│   ├── App.vue              # Root component
│   └── env.d.ts             # Environment types
├── public/                  # Static files
├── .github/
│   └── workflows/           # GitHub Actions CI/CD
├── quasar.config.ts         # Quasar configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
├── .prettierrc.json         # Prettier configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

### Commit Convention

This project follows semantic commit convention:

- `feat:` New functionality
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code format changes (does not affect logic)
- `refactor:` Code refactoring without changing functionality
- `perf:` Performance improvements
- `test:` Test additions or modifications
- `chore:` Configuration or dependency changes
- `ci:` CI/CD changes

Emojis are optional but recommended (e.g., `feat: ✨ New feature`)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details about our code of conduct and pull request process.

### Steps to Contribute

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: ✨ Add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

### Before Submitting

- ✅ Run `npm run lint`
- ✅ Run `npm run format`
- ✅ Run `npm run type-check`
- ✅ Run `npm run build`

All must pass without errors.

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes in each version.

## ❓ Questions / Support

- 📮 GitHub Issues: [Open an issue](https://github.com/KevinDanielDev/forkit-frontend/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/KevinDanielDev/forkit-frontend/discussions)

## 👤 Author

**KevinDanielDev**

- GitHub: [@KevinDanielDev](https://github.com/KevinDanielDev)
- Email: k4vind@gmail.com

## 📄 License

This project does not have a defined license yet. It will be added soon.

For more information about the ForkIt project, check the [organization](https://github.com/KevinDanielDev).

---

<div align="center">

Made with ❤️ by [KevinDanielDev](https://github.com/KevinDanielDev)

[⬆ Back to top](#-forkit-frontend)

</div>
