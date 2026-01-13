# Bookora Client

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.2.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.1-blue)](https://react.dev/)

Frontend application for the Bookora book writing platform. Built with Next.js 15, TypeScript, and modern React patterns.

[Live Demo](https://bookora.vercel.app)

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Bookora Client is the frontend application of the Bookora platform—a full-stack web application that provides authors with a platform to write, organize, and manage their books. It offers a clean, intuitive interface with a rich text editor and features designed to streamline the book writing process.

This application is part of the [Bookora Monorepo](../../README.md) and works in conjunction with the [Bookora API](../api/README.md) backend.

## ✨ Features

- **Authentication** - Secure user registration and login with NextAuth.js
- **Book Management** - Create, edit, and delete books with intuitive UI
- **Chapter Organization** - Add, reorder, and manage chapters within a book
- **Rich Text Editor** - Powerful and intuitive Tiptap editor for writing content
- **Drag and Drop** - Easily reorder chapters with a drag-and-drop interface using dnd-kit
- **Internationalization (i18n)** - Support for multiple languages (English, Spanish, German)
- **Dark Mode** - Comfortable reading and writing experience in low-light environments
- **Responsive Design** - Seamless experience across all devices
- **Auto-save** - Automatic saving while you write
- **Real-time Updates** - Data synchronization with SWR
- **Modern UI** - Built with Radix UI and Tailwind CSS

## 🛠️ Tech Stack

### Frontend Framework

- [Next.js 15](https://nextjs.org/) - React framework with App Router for server-rendered applications
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [React 19](https://react.dev/) - UI library

### Styling & UI

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible component primitives
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support

### Core Libraries

- [Tiptap](https://tiptap.dev/) - Headless, framework-agnostic rich text editor
- [SWR](https://swr.vercel.app/) - React Hooks for data fetching and caching
- [React Hook Form](https://react-hook-form.com/) - Performant forms with easy validation
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Axios](https://axios-http.com/) - HTTP client for API requests

### State Management & Data

- [Easy Peasy](https://easy-peasy.vercel.app/) - Global state management
- [SWR](https://swr.vercel.app/) - Server state management and caching

### Additional Features

- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization for Next.js
- [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- [@dnd-kit](https://dndkit.com/) - Modern drag and drop toolkit

### Shared Packages

This app uses shared packages from the monorepo:

- `@workspace/ui` - Shared UI component library
- `@workspace/eslint-config` - Shared ESLint configuration
- `@workspace/typescript-config` - Shared TypeScript configuration

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.x
- **pnpm** (recommended) or npm/yarn
- Running [Bookora API](../api/README.md) instance (for full functionality)

### Installation

This application is part of a monorepo. Follow these steps:

1. **Clone the monorepo repository:**

   ```bash
   git clone https://github.com/yourusername/bookora-mono-repo.git
   cd bookora-mono-repo
   ```

2. **Install dependencies from the root:**

   ```bash
   pnpm install
   ```

   This will install dependencies for all apps and packages in the monorepo.

3. **Set up environment variables:**

   Create a `.env.local` file in the `apps/client` directory:

   ```bash
   cd apps/client
   cp example.env .env.local
   ```

   Update the values in `.env.local` (see [Environment Variables](#environment-variables) below).

4. **Run the development server:**

   From the root directory:

   ```bash
   pnpm dev
   ```

   Or run only the client:

   ```bash
   pnpm --filter client dev
   ```

   Or from the client directory:

   ```bash
   cd apps/client
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Environment Variables

Create a `.env.local` file in the `apps/client` directory with the following variables:

| Variable              | Description                                                                                         | Required             |
| --------------------- | --------------------------------------------------------------------------------------------------- | -------------------- |
| `NEXT_PUBLIC_API_URI` | Base URL of the API backend (e.g., `http://localhost:8080/api` or `https://bookora.vercel.app/api`) | Yes                  |
| `AUTH_SECRET`         | Secret for NextAuth.js (generate with `openssl rand -base64 32`)                                    | Yes (for production) |
| `AUTH_GOOGLE_ID`      | Google OAuth Client ID                                                                              | Optional             |
| `AUTH_GOOGLE_SECRET`  | Google OAuth Client Secret                                                                          | Optional             |

Example `.env.local` file:

```env
NEXT_PUBLIC_API_URI=http://localhost:8080/api
AUTH_SECRET=your-auth-secret-here
```

## 📜 Available Scripts

Run these commands from the `apps/client` directory or use Turborepo filtering from the root:

| Command            | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| `pnpm dev`         | Runs the app in development mode on `http://localhost:3000` |
| `pnpm build`       | Builds the app for production to the `.next` folder         |
| `pnpm start`       | Starts a Next.js production server                          |
| `pnpm lint`        | Runs ESLint to find and fix problems in your code           |
| `pnpm check-types` | Type-checks TypeScript without emitting files               |

From the root directory:

```bash
pnpm --filter client dev      # Run dev
pnpm --filter client build    # Build for production
pnpm --filter client lint     # Lint code
```

## 📁 Project Structure

```
client/
├── app/                      # Next.js App Router
│   ├── (custom-layout)/     # Layout group
│   ├── (global-layout)/     # Global layout group
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── ...
├── components/              # React components
│   ├── book/               # Book-related components
│   ├── global/             # Global components
│   ├── layout/             # Layout components
│   ├── modals/             # Modal components
│   └── ...
├── hooks/                   # Custom React hooks
├── lib/                     # Utility libraries
├── providers/               # Context providers
├── store/                   # Easy Peasy store
├── translations/            # i18n translation files
├── types/                   # TypeScript types
├── public/                  # Static assets
├── auth.ts                  # NextAuth configuration
├── middleware.ts            # Next.js middleware
└── ...
```

## 💻 Development

### Adding New Components

Components can be added to the `components/` directory. For shared UI components, consider adding them to the `@workspace/ui` package instead.

### Using Shared UI Components

Import components from the shared UI package:

```tsx
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
```

### Adding shadcn/ui Components

To add new shadcn/ui components to the shared UI package:

```bash
pnpm dlx shadcn@latest add button -c packages/ui
```

### Internationalization

Translation files are located in `translations/`. Supported languages:

- English (`en.json`)
- Spanish (`es.json`)
- German (`de.json`)

Add new translations by updating the JSON files.

### Styling

- Use Tailwind CSS utility classes for styling
- Global styles are in `@workspace/ui/src/styles/globals.css`
- Component-specific styles should use Tailwind classes or CSS modules

### API Integration

The app uses Axios with an interceptor for authentication. API calls are made through:

```tsx
import axiosInstance from "@/lib/axiosInstance";

const response = await axiosInstance.get("/book");
```

The base URL is configured via `NEXT_PUBLIC_API_URI` environment variable.

### Authentication

Authentication is handled by NextAuth.js. The configuration is in `auth.ts`. The app uses:

- Credentials provider (email/password)
- Optional Google OAuth provider

Session management is handled automatically by NextAuth.js.

## 🤝 Contributing

Contributions are welcome! Please see the root [CONTRIBUTING.md](../../CONTRIBUTING.md) (if available) or the root README for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Run linting and type checking (`pnpm lint`, `pnpm check-types`)
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

## 📄 License

Distributed under the MIT License. See root [LICENSE](../../LICENSE) for more information.

---

<div align="center">

**Part of the Bookora Monorepo**

[API Documentation](../api/README.md) • [Root README](../../README.md) • [Live Demo](https://bookora.vercel.app)

</div>
