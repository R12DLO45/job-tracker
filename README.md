# Job Application Tracker

MVP untuk tracking lamaran kerja dengan Next.js, TypeScript, Tailwind CSS, dan Supabase.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase

1. Buat project baru di [Supabase Dashboard](https://supabase.com/dashboard)
2. Di SQL Editor, jalankan schema ini:

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  platform TEXT,
  applied_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'Applied',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_applied_date ON applications(applied_date DESC);
```

3. Disable Row Level Security (RLS) untuk single-user:
   - Go to Authentication > Policies
   - Pilih table `applications`
   - Disable RLS atau buat policy `ALLOW ALL`

4. Copy Project URL dan anon key dari Settings > API

### 3. Environment Variables

Update `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### 5. Build & Deploy

#### Local Build
```bash
npm run build
npm start
```

#### Deploy ke Netlify

1. Push repo ke GitHub
2. Connect repo di [Netlify](https://app.netlify.com)
3. Set environment variables di Netlify:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

Build command dan publish directory sudah dikonfigurasi di `netlify.toml`.

## Features

- ✅ CRUD job applications
- ✅ Status tracking (Applied, Screening, Interview, Offering, Rejected)
- ✅ Filter by status
- ✅ Sort by date (newest first)
- ✅ Responsive design
- ✅ Modal form untuk add/edit
- ✅ Single user (no auth required)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Netlify

## Project Structure

```
job-tracker/
├── app/
│   ├── page.tsx              # Main dashboard
│   ├── layout.tsx            # Root layout
│   └── api/applications/
│       └── route.ts          # API endpoints
├── components/
│   ├── ApplicationCard.tsx   # Card component
│   ├── ApplicationForm.tsx   # Form modal
│   ├── FilterTabs.tsx        # Status filter
│   └── ApplicationList.tsx   # List container
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── types.ts              # TypeScript types
└── netlify.toml              # Netlify config
```
