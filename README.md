# Chronicle

A modern editorial blogging platform built with Next.js 14, Prisma, TipTap, and Cloudinary.

---

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Database** — PostgreSQL via Prisma ORM
- **Auth** — JWT in HTTP-only cookies
- **Editor** — TipTap rich text
- **Images** — Cloudinary signed uploads
- **Styling** — Tailwind v4 + CSS custom properties
- **Validation** — Zod v3
- **Security** — bcryptjs, DOMPurify, rate limiting

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in all values in `.env.local`.

### 3. Set up the database
```bash
# Run migrations
npx prisma migrate dev --name init

# Seed with sample data
npx prisma db seed
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Seed Credentials

After running `npx prisma db seed`:

| Role   | Email                    | Password      |
|--------|--------------------------|---------------|
| Admin  | admin@chronicle.dev      | Admin@1234    |
| Author | priya@chronicle.dev      | Author@1234   |
| Author | marcus@chronicle.dev     | Author@1234   |

---

## Project Structure

```
chronicle/
├── app/
│   ├── (auth)/          # Login & signup pages
│   ├── (dashboard)/     # Protected dashboard
│   ├── (public)/        # Public blog pages
│   ├── api/             # All API routes
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Design system + CSS vars
├── components/
│   ├── dashboard/       # Dashboard UI components
│   └── public/          # Public page components
├── context/
│   └── AuthContext.tsx  # Auth state management
├── lib/                 # Shared utilities
├── middleware/          # Auth, RBAC, rate limit, error handler
└── prisma/
    ├── schema.prisma    # Database schema
    └── seed.ts          # Seed data
```

---

## API Routes

| Method | Route                        | Auth     | Description                     |
|--------|------------------------------|----------|---------------------------------|
| POST   | /api/auth/signup             | No       | Register new user               |
| POST   | /api/auth/login              | No       | Login, set JWT cookie           |
| POST   | /api/auth/logout             | Yes      | Clear JWT cookie                |
| GET    | /api/auth/me                 | No       | Get current user from cookie    |
| GET    | /api/posts                   | No       | Paginated published posts       |
| GET    | /api/posts?mine=true         | Yes      | Current user's posts (all)      |
| POST   | /api/posts                   | Author+  | Create post                     |
| GET    | /api/posts/[slug]            | No       | Single post by slug             |
| GET    | /api/posts/by-id/[id]        | Owner+   | Post by ID (for edit page)      |
| PUT    | /api/posts/by-id/[id]        | Owner+   | Update post                     |
| DELETE | /api/posts/by-id/[id]        | Owner+   | Delete post                     |
| GET    | /api/categories              | No       | All categories                  |
| POST   | /api/categories              | Admin    | Create category                 |
| POST   | /api/comments                | Yes      | Post a comment                  |
| DELETE | /api/comments/[id]           | Owner+   | Delete comment                  |
| GET    | /api/search?q=               | No       | Full-text search                |
| POST   | /api/upload                  | Author+  | Get Cloudinary upload signature |

---

## Deployment (Vercel + Railway)

1. Push to GitHub
2. Create a PostgreSQL database on [Railway](https://railway.app)
3. Import project to [Vercel](https://vercel.com)
4. Add all environment variables from `.env.example` to Vercel
5. Run `npx prisma migrate deploy` in the Railway shell or via Vercel build command
6. Deploy
