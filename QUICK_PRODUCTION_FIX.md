# 🚨 QUICK FIX: Production Database Setup

## ✅ Current Status:
- **Local Development**: ✅ Working perfectly with Docker PostgreSQL
- **Production (Netlify)**: ❌ Still using old Neon database (causing login errors)

## ⚡ IMMEDIATE SOLUTION (5 minutes):

### Step 1: Create Supabase Database
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Fill in:
   - **Name**: `lenodigital-prod`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: `us-east-1` (or closest to you)
5. Click "Create new project"
6. Wait 2-3 minutes for setup

### Step 2: Get Database URL
1. Go to **Settings** → **Database**
2. Scroll to **"Connection string"**
3. Copy the **URI** (looks like: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`)

### Step 3: Update Netlify Environment Variables
1. Go to [netlify.com](https://netlify.com)
2. Click your `lenodigital` site
3. Go to **Site settings** → **Environment variables**
4. Add/Update these:

```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
NEXTAUTH_URL=https://lenodigital.netlify.app
NEXTAUTH_SECRET=JHdD8/EOJHmePuBg6QV/1bwzKTfOM04jUrrUbPAFSvU=
APP_URL=https://lenodigital.netlify.app
```

### Step 4: Deploy Database Schema
After setting environment variables, trigger a new deployment:

1. Go to **Deploys** tab in Netlify
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for build to complete

### Step 5: Seed Production Database
Once deployed, run this command to seed the production database:

```bash
# Replace [YOUR-DATABASE-URL] with your actual Supabase URL
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" npx prisma db push

DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" npm run db:seed
```

## 🎯 Test Production Login

After setup, test with these credentials:
- **Teacher**: `sarah.johnson@rivoniaprimary.co.za` / `password123`
- **Student**: `alex.smith@student.co.za` / `password123`
- **Parent**: `jane.smith@email.com` / `password123`

## 🆘 Alternative: Railway (Even Easier)

If Supabase seems complex:
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"
4. Copy the DATABASE_URL from Variables tab
5. Use this URL in Netlify environment variables

## ✅ This Will Fix Your Production Login Issues!

The "Invalid email or password" error happens because:
- Production is trying to connect to old Neon database
- Neon database doesn't have the demo users we created
- We need a fresh cloud database with the demo data

**Follow the steps above and your production login will work immediately!** 🚀
