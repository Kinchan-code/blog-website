# Blog Website

A modern, full-stack blog platform built with React, TypeScript, and Supabase. Features user authentication, post creation, and a clean, responsive UI.

## ✨ Features

- **User Authentication** - Sign up, sign in, and secure user sessions
- **Post Management** - Create, read, and manage blog posts
- **Modern UI** - Beautiful interface built with Tailwind CSS and shadcn/ui components
- **Real-time Database** - Powered by Supabase for scalable data management
- **Type Safety** - Full TypeScript support throughout the application
- **State Management** - Redux Toolkit for predictable state updates
- **Form Validation** - Robust forms with Zod schema validation
- **Responsive Design** - Mobile-first approach with modern styling

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: Redux Toolkit
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Form Handling**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite with SWC

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd blog-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   Run the SQL script located in `scripts/setup-database.sql` in your Supabase SQL editor to create the necessary tables and security policies.

   - Go to your Supabase dashboard
   - Navigate to the SQL Editor
   - Copy and paste the contents of `scripts/setup-database.sql`
   - Execute the script

5. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/ui/          # Reusable UI components (shadcn/ui)
├── context/               # React contexts
├── features/              # Feature-based modules
│   ├── auth/             # Authentication pages and components
│   └── post/             # Blog post features
├── lib/                  # Utility functions and configurations
├── providers/            # Context providers
├── slices/               # Redux slices
├── store/                # Redux store configuration
└── types/                # TypeScript type definitions
```

## 🔐 Authentication

The application uses Supabase Auth for user management:

- Email/password authentication
- Secure session management
- User profiles with usernames

## 📖 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
