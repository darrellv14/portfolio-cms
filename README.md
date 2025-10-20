<div align="center">

# 🚀 Fully Responsive Portfolio CMS

### Modern Full-Stack Portfolio & Content Management System

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.17-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![tRPC](https://img.shields.io/badge/tRPC-11.0-2596BE?style=for-the-badge&logo=trpc&logoColor=white)](https://trpc.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>A blazingly fast, type-safe portfolio platform with powerful CMS capabilities built on the T3 Stack</strong>
</p>

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <img src="https://res.cloudinary.com/drvu0dpry/image/upload/v1760967612/image-desktop_otifgc.webp" alt="Portfolio CMS Desktop" width="100%" />
      </td>
      <td width="50%">
        <img src="https://res.cloudinary.com/drvu0dpry/image/upload/v1760967618/image-mobile_nb6mv7.webp" alt="Portfolio CMS Mobile" width="100%" />
      </td>
    </tr>
  </table>
</div>

---

</div>

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎯 Architecture](#-architecture)
- [🚀 Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
- [📖 Documentation](#-documentation)
  - [Project Structure](#project-structure)
  - [Available Scripts](#available-scripts)
  - [Database Schema](#database-schema)
- [🎨 UI Components](#-ui-components)
- [🔐 Authentication](#-authentication)
- [👨‍💼 Admin Features](#-admin-features)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [💬 Contact](#-contact)

---

## ✨ Features

<table>
  <tr>
    <td width="50%">

### 🎯 Core Features

- ⚡ **Lightning Fast** - Built on Next.js 15 with App Router
- 🔒 **Type-Safe** - End-to-end type safety with TypeScript & tRPC
- 🎨 **Modern UI** - Beautiful components with shadcn/ui
- 🌙 **Dark Mode** - Seamless theme switching
- 📱 **Responsive** - Mobile-first design approach
- ♿ **Accessible** - WCAG compliant components

    </td>
    <td width="50%">

### 📝 CMS Features

- 📊 **Project Management** - Full CRUD operations
- 💼 **Experience Tracking** - Work history management
- 💬 **Testimonials** - User feedback system
- 🏷️ **Tag System** - Organize projects efficiently
- ✅ **Approval Workflow** - Admin testimonial moderation
- 🔍 **Infinite Scroll** - Smooth content loading

    </td>

    </tr>
  </table>

### 🎭 Advanced Features

```mermaid
graph LR
    A[User Experience] --> B[Server Components]
    A --> C[Optimistic Updates]
    A --> D[Smooth Animations]
    B --> E[Edge Caching]
    C --> F[React Query]
    D --> G[Framer Motion]
```

- 🚀 **Performance Optimized**
  - Server Components for optimal loading
  - Smart caching with Next.js `unstable_cache`
  - Lazy loading for components
  - Image optimization with next/image

- 🔐 **Security First**
  - NextAuth.js integration
  - Role-based access control (RBAC)
  - Secure environment variable validation
  - SQL injection protection via Prisma

- 🎨 **Rich Interactions**
  - Smooth animations with Framer Motion
  - Toast notifications via Sonner
  - Floating action buttons
  - Form validation with Zod + React Hook Form

---

## 🛠️ Tech Stack

<div align="center">

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)

### Backend

![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=flat&logo=trpc&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=flat&logo=next.js&logoColor=white)

### Developer Tools

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

</div>

### 📦 Key Dependencies

| Package                 | Version       | Purpose                            |
| ----------------------- | ------------- | ---------------------------------- |
| `next`                  | ^15.2.3       | React framework with App Router    |
| `@trpc/server`          | ^11.0.0       | End-to-end type-safe APIs          |
| `@prisma/client`        | ^6.17.1       | Next-gen ORM for Node.js           |
| `next-auth`             | 5.0.0-beta.25 | Authentication for Next.js         |
| `@tanstack/react-query` | ^5.69.0       | Powerful async state management    |
| `zod`                   | ^3.24.1       | TypeScript-first schema validation |
| `react-hook-form`       | ^7.54.2       | Performant form validation         |
| `framer-motion`         | ^12.23.24     | Production-ready animations        |
| `lucide-react`          | ^0.545.0      | Beautiful hand-crafted icons       |
| `sonner`                | ^1.7.5        | Opinionated toast component        |

---

## 🎯 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Next.js    │  │  React Query │  │ Framer Motion│       │
│  │  App Router  │  │   (tRPC)     │  │  Animations  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↕️
┌─────────────────────────────────────────────────────────────┐
│                      API Layer (tRPC)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Project    │  │  Experience  │  │ Testimonial  │       │
│  │   Router     │  │    Router    │  │   Router     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↕️
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer (Prisma)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  PostgreSQL  │  │   Caching    │  │ Accelerate   │       │
│  │   Database   │  │   Strategy   │  │  Extension   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns

- 🏗️ **Server Components First** - Leverage React Server Components for better performance
- 🔄 **Optimistic Updates** - Instant UI feedback with React Query mutations
- 🎯 **Type-Safe API** - Full-stack type safety with tRPC
- 📦 **Modular Architecture** - Organized by feature domains
- 🧩 **Component Composition** - Reusable UI components with shadcn/ui
- 🔐 **Secure by Default** - Environment validation and role-based access

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.18.0 ([Download](https://nodejs.org/))
- **npm** >= 10.9.0 (comes with Node.js)
- **PostgreSQL** >= 14 ([Download](https://www.postgresql.org/download/))
- **Docker** (optional, for database setup) ([Download](https://www.docker.com/))

### Installation

1️⃣ **Clone the repository**

```bash
git clone https://github.com/darrellv14/portfolio-cms.git
cd portfolio-cms
```

2️⃣ **Install dependencies**

```bash
npm install
```

This will also automatically run `prisma generate` to create the Prisma Client.

### Environment Setup

3️⃣ **Create environment file**

```bash
# Copy the example environment file
cp .env.example .env
```

4️⃣ **Configure environment variables**

Open `.env` and fill in the required values:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio-cms"
DIRECT_URL="postgresql://postgres:password@localhost:5432/portfolio-cms"

# NextAuth.js
AUTH_SECRET="your-secret-here" # Generate with: npx auth secret
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Admin Configuration
ADMIN_EMAIL="your-email@example.com"
NEXT_PUBLIC_ADMIN_EMAIL="your-email@example.com"
```

<details>
<summary>📝 <strong>How to get Google OAuth credentials</strong></summary>

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if needed
6. Set application type to **Web application**
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
8. Copy **Client ID** and **Client Secret** to your `.env` file

</details>

### Database Setup

5️⃣ **Start PostgreSQL database**

**Option A: Using Docker (Recommended)**

```bash
# Make the script executable
chmod +x ./start-database.sh

# Run the database setup script
./start-database.sh
```

**Option B: Manual Setup**

If you have PostgreSQL installed locally:

```bash
# Create a new database
createdb portfolio-cms

# Update DATABASE_URL in .env to point to your database
```

6️⃣ **Run database migrations**

```bash
npx prisma migrate dev
```

This will create all necessary tables based on the schema.

7️⃣ **Open Prisma Studio (optional)**

```bash
npm run db:studio
```

Access the database GUI at [http://localhost:5555](http://localhost:5555)

### Running the Application

8️⃣ **Start the development server**

```bash
npm run dev
```

🎉 Open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 📖 Documentation

### Project Structure

```
portfolio-cms/
├── prisma/
│   └── schema.prisma              # Database schema definition
├── public/                        # Static assets
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── api/                  # API routes
│   │   │   ├── auth/             # NextAuth.js endpoints
│   │   │   └── trpc/             # tRPC endpoint
│   │   └── _components/          # Page-specific components
│   ├── components/
│   │   ├── shared/               # Shared business components
│   │   │   ├── AddProjectForm.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectCardSkeleton.tsx
│   │   └── ui/                   # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       └── ...
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   ├── server/
│   │   ├── auth/                 # Authentication config
│   │   │   ├── config.ts
│   │   │   └── index.ts
│   │   ├── api/                  # tRPC configuration
│   │   │   ├── root.ts           # Root router
│   │   │   ├── trpc.ts           # tRPC instance
│   │   │   └── routers/          # Feature routers
│   │   │       ├── post.ts
│   │   │       └── project.ts
│   │   └── db.ts                 # Prisma client
│   ├── styles/
│   │   └── globals.css           # Global styles
│   ├── trpc/                     # Client-side tRPC
│   │   ├── query-client.ts
│   │   ├── react.tsx             # React hooks
│   │   └── server.ts             # Server utilities
│   └── env.js                    # Environment validation
├── components.json               # shadcn/ui config
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

### Available Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start development server with Turbopack |
| `npm run build`        | Build for production                    |
| `npm run start`        | Start production server                 |
| `npm run lint`         | Run ESLint                              |
| `npm run lint:fix`     | Fix ESLint issues                       |
| `npm run typecheck`    | Run TypeScript compiler check           |
| `npm run format:check` | Check code formatting                   |
| `npm run format:write` | Format code with Prettier               |
| `npm run db:generate`  | Generate Prisma client & run migrations |
| `npm run db:push`      | Push schema changes without migrations  |
| `npm run db:studio`    | Open Prisma Studio GUI                  |
| `npm run db:migrate`   | Deploy migrations in production         |

### Database Schema

```mermaid
erDiagram
    User ||--o{ Project : creates
    User ||--o{ Testimonial : submits
    User ||--o{ Account : has
    User ||--o{ Session : has
    Project ||--o{ Tag : has

    User {
        string id PK
        string name
        string email UK
        datetime emailVerified
        string image
    }

    Project {
        int id PK
        string title
        string description
        string imageURL
        datetime createdAt
        datetime updatedAt
        string createdById FK
    }

    Tag {
        int id PK
        string name UK
    }

    Testimonial {
        int id PK
        string title
        string description
        string position
        string avatarURL
        boolean approved
        datetime createdAt
        string createdById FK
    }
```

<details>
<summary><strong>View Full Schema Details</strong></summary>

**User Model**

- Stores user authentication data
- Links to projects and testimonials
- Managed by NextAuth.js

**Project Model**

- Portfolio projects with images
- Many-to-many relationship with tags
- Tracks creator and timestamps

**Tag Model**

- Categorization for projects
- Unique tag names
- Many-to-many with projects

**Testimonial Model**

- User feedback and reviews
- Approval workflow for moderation
- Links to user who submitted

**Experience Model** (Work History)

- Job positions and companies
- Date ranges for employment
- Company logos and descriptions

</details>

---

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) - beautifully designed components built with Radix UI and Tailwind CSS.

### Available Components

```tsx
// Example usage of components
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Project description goes here</p>
  </CardContent>
</Card>;
```

### Installed Components

- ✅ Avatar
- ✅ Button
- ✅ Card
- ✅ Dialog
- ✅ Dropdown Menu
- ✅ Field (Form control)
- ✅ Input
- ✅ Label
- ✅ Separator
- ✅ Skeleton
- ✅ Sonner (Toast notifications)
- ✅ Textarea

### Adding New Components

```bash
npx shadcn-ui@latest add [component-name]
```

---

## 🔐 Authentication

Authentication is powered by [NextAuth.js](https://next-auth.js.org/) v5 (beta).

### Supported Providers

- 🔵 **Google OAuth** - Primary authentication method

### How Authentication Works

```mermaid
sequenceDiagram
    participant User
    participant App
    participant NextAuth
    participant Google
    participant Database

    User->>App: Click "Sign In"
    App->>NextAuth: Redirect to /api/auth/signin
    NextAuth->>Google: OAuth request
    Google->>User: Login page
    User->>Google: Enter credentials
    Google->>NextAuth: OAuth token
    NextAuth->>Database: Create/update user
    NextAuth->>App: Set session cookie
    App->>User: Redirect to dashboard
```

### Protected Routes

```tsx
// Example: Protecting a page
import { auth } from "~/server/auth";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <div>Protected content</div>;
}
```

### Admin Role Check

```tsx
// Check if user is admin
import { auth } from "~/server/auth";

const session = await auth();
const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;
```

---

## 👨‍💼 Admin Features

Users with email matching `ADMIN_EMAIL` get special privileges:

### 📊 Content Management

| Feature               | Description                   | Access     |
| --------------------- | ----------------------------- | ---------- |
| **Add Project**       | Create new portfolio projects | Admin only |
| **Edit Project**      | Modify existing projects      | Admin only |
| **Delete Project**    | Remove projects               | Admin only |
| **Manage Tags**       | Add/remove project tags       | Admin only |
| **Add Experience**    | Create work history entries   | Admin only |
| **Edit Experience**   | Update work history           | Admin only |
| **Delete Experience** | Remove work history           | Admin only |

### 💬 Testimonial Moderation

Access the admin dashboard at `/admin/testimonials` to:

- ✅ **Approve** pending testimonials
- ❌ **Reject** inappropriate submissions
- 📝 **View** all testimonial details
- 🗑️ **Delete** approved testimonials

```tsx
// Admin-only component example
import { auth } from "~/server/auth";

export async function AdminButton() {
  const session = await auth();
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  if (!isAdmin) return null;

  return <Button>Admin Action</Button>;
}
```

---

## 🚢 Deployment

### Recommended Platforms

<table>
  <tr>
    <td align="center" width="33%">
      <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" width="60" /><br />
      <strong>Vercel</strong><br />
      <sub>Optimal for Next.js</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://railway.app/brand/logo-light.png" width="60" /><br />
      <strong>Railway</strong><br />
      <sub>Full-stack deployment</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://cdn.worldvectorlogo.com/logos/netlify.svg" width="60" /><br />
      <strong>Netlify</strong><br />
      <sub>JAMstack focused</sub>
    </td>
  </tr>
</table>

### Database Hosting

Choose a PostgreSQL hosting provider:

- **[Vercel Postgres](https://vercel.com/storage/postgres)** - Serverless SQL
- **[Supabase](https://supabase.com/)** - Open-source Firebase alternative
- **[Neon](https://neon.tech/)** - Serverless Postgres
- **[Railway](https://railway.app/)** - Full-stack platform
- **[PlanetScale](https://planetscale.com/)** - MySQL alternative (requires schema changes)

### Deployment Steps

#### 1. Build Configuration

```bash
# Build the application
npm run build

# Test production build locally
npm run preview
```

#### 2. Environment Variables

Set these in your hosting platform:

```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
AUTH_SECRET=your-secret-here
AUTH_GOOGLE_ID=your-google-id
AUTH_GOOGLE_SECRET=your-google-secret
ADMIN_EMAIL=admin@example.com
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
```

#### 3. Database Migration

```bash
# Deploy migrations to production
npm run db:migrate
```

#### 4. Google OAuth Setup

Update authorized redirect URIs in Google Cloud Console:

- `https://yourdomain.com/api/auth/callback/google`

### Vercel Deployment (One-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/darrellv14/portfolio-cms)

### Manual Deployment

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
vercel --prod

# 3. Run migrations
npm run db:migrate
```

### Docker Deployment (Optional)

<details>
<summary><strong>View Docker Configuration</strong></summary>

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t portfolio-cms .
docker run -p 3000:3000 portfolio-cms
```

</details>

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create! Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**

   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your Fork**

   ```bash
   git clone https://github.com/darrellv14/portfolio-cms.git
   cd portfolio-cms
   ```

3. **Create a Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Make your Changes**

   ```bash
   # Edit files, add features, fix bugs
   ```

5. **Commit your Changes**

   ```bash
   git add .
   git commit -m "Add some AmazingFeature"
   ```

6. **Push to the Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**
   - Go to your fork on GitHub
   - Click "Pull Request"
   - Provide a clear description

### Development Guidelines

- ✅ Follow the existing code style
- ✅ Write meaningful commit messages
- ✅ Update documentation if needed
- ✅ Add tests for new features
- ✅ Run `npm run check` before committing
- ✅ Keep PRs focused and small

### Code Standards

```bash
# Run linter
npm run lint

# Format code
npm run format:write

# Type check
npm run typecheck

# Run all checks
npm run check
```

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` file for more information.

```
MIT License

Copyright (c) 2025 Darrell Valentino

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 💬 Contact

<div align="center">

**Darrell Valentino**

[![GitHub](https://img.shields.io/badge/GitHub-darrellv14-181717?style=for-the-badge&logo=github)](https://github.com/darrellv14)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/darrellvalentino/)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:darrellspam14@gmail.com)

**Project Link:** [https://github.com/darrellv14/portfolio-cms](https://github.com/darrellv14/portfolio-cms)

</div>

---

## 🙏 Acknowledgments

This project was built with amazing open-source tools:

- [Next.js](https://nextjs.org/) - The React Framework
- [T3 Stack](https://create.t3.gg/) - Type-safe full-stack starter
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [tRPC](https://trpc.io/) - End-to-end type-safe APIs
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Query](https://tanstack.com/query) - Data synchronization
- [Zod](https://zod.dev/) - Schema validation

Special thanks to the open-source community! 💙

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with ❤️ by [Darrell Valentino](https://github.com/darrellv14)**

![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Powered by Next.js](https://img.shields.io/badge/Powered%20by-Next.js-000000?style=flat&logo=next.js&logoColor=white)
![Built with T3 Stack](https://img.shields.io/badge/Built%20with-T3%20Stack-purple?style=flat)

</div>
