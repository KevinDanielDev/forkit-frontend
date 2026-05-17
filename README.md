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

## 🔍 Recent Commits

Latest commits from the main development branch:

| Commit    | Message                                                       | Date       |
| --------- | ------------------------------------------------------------- | ---------- |
| `44d48bc` | Integrate Vue Query for reactive authentication state         | 2026-05-13 |
| `e0b4eea` | Installation and configuration of Vue Query + DevTools        | 2026-05-13 |
| `4548dd7` | feat: 🎸 Implement authentication system with Parse SDK       | 2026-05-13 |
| `48dfa91` | feat: 🎸 Connection to parse-server via boot initialization   | 2026-05-12 |
| `b01f2f1` | feat: 🎸 Setup project guidelines and documentation           | 2026-05-12 |
| `3b20665` | Implement responsive multi-step create order dialog           | 2026-05-12 |
| `427f35e` | feat: 🎸 Implement a professional control panel design        | 2026-05-11 |
| `c1e4694` | feat: 🎸 Implementation of auth system visual design          | 2026-05-10 |
| `0bda958` | feat: Implement sign-up authentication system with validation | 2026-05-10 |

For a complete commit history, visit the [commits page](https://github.com/KevinDanielDev/forkit-frontend/commits/develop).

## 📚 Documentation

### JSDoc Coverage Overview

The project has comprehensive JSDoc documentation (90%+ coverage) across all core modules with detailed parameter descriptions, return types, error handling, and usage examples.

**Documentation Coverage by Module:**

| Module           | Files  | Status      | Details                                             |
| ---------------- | ------ | ----------- | --------------------------------------------------- |
| **Services**     | 2      | ✅ 100%     | Auth, Order services with full method documentation |
| **Composables**  | 7      | ✅ 100%     | State management, validation, layout utilities      |
| **Router**       | 3      | ✅ 100%     | Routes, auth guard, router initialization           |
| **Stores**       | 1      | ✅ 100%     | Theme state management                              |
| **Boot Modules** | 4      | ✅ 100%     | Vue Query, Axios, Parse, i18n configuration         |
| **Interfaces**   | 8      | ✅ 100%     | Order, User, Auth, Layout type definitions          |
| **Components**   | 17     | ✅ 100%     | Layouts, pages, dialogs, steps, utilities           |
| **Total**        | **47** | **✅ ~95%** | Comprehensive documentation                         |

### Quick Navigation by Category

#### 🔧 Infrastructure & Services

- **Authentication** — `src/infrastructure/parse/auth/auth.service.ts`
  - `signIn()` — User login with credentials
  - `signUp()` — New user registration with ACL
  - `logout()` — Session termination
  - `isValidSessionToken()` — Session validation

- **Order Management** — `src/infrastructure/parse/order/order.service.ts`
  - `createOrder()` — Save new orders to database
  - `getOrders()` — Retrieve all orders with mapping
  - `deleteOrder()` — Remove orders by ID

#### 🎣 Composables (Vue Composition API Hooks)

- **Authentication** — `useAuth()` — Sign-in, sign-up, logout mutations
- **Common Utilities**
  - `useNotify()` — Success/error toast notifications
  - `useValidationRules()` — Form validation rules (11+ validators)
- **Dashboard**
  - `useDashboard()` — KPI cards, table columns, statistics
  - `useOrder()` — Orders queries and mutations
  - `useOrderCreateDialog()` — Multi-step dialog state management
- **Layout** — `useDashboardLayout()` — Navigation, theme switching

#### 🗂️ Configuration & Initialization

- **Router** — `src/router/`
  - `routes.ts` — Route definitions with guards
  - `authGuard.ts` — Authentication middleware
  - `index.ts` — Router setup and history mode

- **Boot Modules** — `src/boot/`
  - `vue-query.ts` — TanStack Vue Query configuration (staleTime, gc, retry)
  - `axios.ts` — HTTP client setup with TypeScript types
  - `parse.ts` — Parse SDK initialization
  - `i18n.ts` — Internationalization setup with type safety

#### 🏪 State Management

- **Pinia Stores** — `src/stores/`
  - `theme-store.ts` — Dark/light theme state

#### 📦 Type Definitions

- **Order** — `IOrder`, `IClientData`, `IProjectData`, `IFinanceData`
- **User** — `IUser`, `ISignUp`
- **Layout** — `IMenuOption`, `IMenuGroup`

#### 🎨 Vue Components

**Layouts (2)**

- `AuthLayout.vue` — Two-column authentication layout with features showcase
- `DashboardLayout.vue` — Main dashboard with sidebar, header, navigation

**Pages (7)**

- **Authentication** — `SignInPage.vue`, `SignUpPage.vue`
- **Dashboard**
  - `DashboardPage.vue` — KPI overview and recent orders
  - `OrderPage.vue`, `ClientPage.vue`, `FinancePage.vue`, `ReportPage.vue` (WIP)

**Dialog Components (6)**

- `OrderCreateDialog.vue` — Multi-step order creation modal
- `ClientStep.vue` — Step 1: Client information
- `ProjectStep.vue` — Step 2: Project details with file upload
- `FinanceStep.vue` — Step 3: Financial terms
- `OrderStepProgress.vue` — Progress indicator

**Other (4)**

- `App.vue` — Root application component
- `ErrorNotFound.vue` — 404 error page
- `WorkInProgress.vue` — Development placeholder component

### Code Organization

The project follows a clean layered architecture:

```
src/
├── infrastructure/
│   └── parse/              # Backend integration (Parse SDK)
│       ├── auth/           # Authentication services
│       └── order/          # Order CRUD operations
├── composables/            # Reusable Vue 3 hooks
│   ├── auth/               # Authentication composable
│   ├── common/             # Shared utilities
│   ├── dashboard/          # Dashboard specific hooks
│   └── layouts/            # Layout composables
├── stores/                 # Pinia state management
│   └── theme-store.ts      # Dark/light theme
├── models/
│   └── interfaces/         # TypeScript types
│       ├── auth/           # Auth types
│       ├── user/           # User types
│       ├── order/          # Order types
│       └── layout/         # Layout types
├── router/                 # Vue Router configuration
│   ├── routes.ts           # Route definitions
│   ├── authGuard.ts        # Auth middleware
│   └── index.ts            # Router setup
├── boot/                   # Framework initialization
│   ├── axios.ts            # HTTP client
│   ├── parse.ts            # Parse SDK
│   ├── vue-query.ts        # TanStack Vue Query
│   └── i18n.ts             # i18n setup
├── components/             # Reusable Vue components
│   ├── dashboard/          # Dashboard components
│   │   └── order/          # Order dialog & steps
│   └── tmp/                # Temporary components
├── pages/                  # Route views
│   ├── auth/               # Login/signup
│   └── dashboard/          # Dashboard pages
├── layouts/                # Layout wrappers
│   ├── auth/               # Auth layout
│   └── dashboard/          # Dashboard layout
├── i18n/                   # Translations
├── css/                    # Global styles
├── animations/             # Lottie animations
├── App.vue                 # Root component
└── env.d.ts                # Environment types
```

### Best Practices

1. **Type Safety** — Every file uses TypeScript strict mode
2. **JSDoc Comments** — All public APIs documented with @param, @returns, @example
3. **Composable Hooks** — Composition API for component logic reusability
4. **State Management** — Pinia for app state, Vue Query for server state
5. **Error Handling** — Try-catch blocks with user-friendly error notifications
6. **Validation** — Client-side validation with comprehensive rule set
7. **Responsive Design** — Mobile-first approach with Quasar breakpoints

### Finding Help

To understand specific functionality:

1. **Component structure** — Check the related `.vue` file JSDoc header
2. **Data flow** — Look at the composable that manages that feature
3. **API operations** — Check the service file in `src/infrastructure/parse/`
4. **Type information** — See the interface definition in `src/models/interfaces/`
5. **Configuration** — Check `src/boot/` for framework setup details

---

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
