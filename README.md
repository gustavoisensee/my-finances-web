# My Finances Web

A personal finance management application built with **Vite**, **React**, **TypeScript**, **React Router**, **TanStack Query**, and **Clerk** for authentication.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query) for server state
- **Authentication**: Clerk
- **Styling**: Tailwind CSS + DaisyUI
- **Form Handling**: React Hook Form + Yup validation
- **HTTP Client**: Axios (centralized API client)
- **Backend API**: External REST API at https://my-finances-api-v4.onrender.com

## Getting Started

### Prerequisites

- Node.js >= 23.0.0 <= 23.3.0
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
VITE_API_BASE_URL=https://my-finances-api-v4.onrender.com
```

> **Note**: Get your Clerk Publishable Key from the [Clerk Dashboard](https://dashboard.clerk.com/~/api-keys)

### Development

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the application for production:

```bash
pnpm build
# or
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
# or
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── category/    # Category-related components
│   ├── dashboard/   # Dashboard components
│   ├── form/        # Reusable form components
│   ├── month/       # Month management components
│   ├── shared/      # Shared/common components
│   ├── sidebar-menu/# Navigation components
│   └── svgs/        # SVG icon components
├── helpers/         # Utility functions
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── lib/             # Core libraries (API client)
├── pages/           # Page components (routes)
├── services/        # API service layer
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## Features

- **Dashboard**: Overview of monthly finances
- **Month Management**: Create, edit, and delete financial months
- **Income Tracking**: Manage income sources
- **Budget Management**: Set and track budgets
- **Expense Tracking**: Record and categorize expenses
- **Category Management**: Organize transactions by category
- **User Authentication**: Secure login with Clerk
- **Responsive Design**: Mobile-friendly interface

## API Integration

The application connects to an external REST API. All API calls are centralized through the `apiClient` in `src/lib/api-client.ts`, which handles:

- Authentication token injection
- Base URL configuration
- Error handling
- Request/response interceptors

## Authentication

This application uses [Clerk](https://clerk.com/) for authentication. Clerk provides:

- Sign in / Sign up flows
- User management
- Session handling
- JWT token management

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key for authentication | Yes |
| `VITE_API_BASE_URL` | Base URL for the REST API backend | Yes |

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## License

This project is private.
