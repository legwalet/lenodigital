# 🚀 PRODUCTION DATABASE SETUP - SUPABASE

## ⚡ Quick Setup (5 minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/login with GitHub
4. Click "New Project"
5. Fill in:
   - **Name**: `lenodigital-prod`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., `us-east-1`)
6. Click "Create new project"

### Step 2: Get Database URL
1. Wait for project to be ready (2-3 minutes)
2. Go to **Settings** → **Database**
3. Scroll down to **Connection string**
4. Copy the **URI** connection string
5. It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### Step 3: Update Netlify Environment Variables
1. Go to your Netlify dashboard
2. Click on your `lenodigital` site
3. Go to **Site settings** → **Environment variables**
4. Update these variables:

```bash
# Database - Supabase PostgreSQL
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# NextAuth (IMPORTANT: Replace with your actual Netlify URL)
NEXTAUTH_URL=https://lenodigital.netlify.app
NEXTAUTH_SECRET=JHdD8/EOJHmePuBg6QV/1bwzKTfOM04jUrrUbPAFSvU=

# App URL
APP_URL=https://lenodigital.netlify.app
```

### Step 4: Deploy Database Schema
After setting environment variables, trigger a new deployment:

1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** → **Deploy site**
3. Wait for build to complete

### Step 5: Seed Production Database
Once deployed, run this command to seed the production database:

```bash
# Replace [YOUR-DATABASE-URL] with your actual Supabase URL
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" npx prisma db push

DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" npm run db:seed
```

## 🎯 Alternative: Use Railway (Even Easier)

If Supabase seems complex, try Railway:

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"
4. Copy the `DATABASE_URL` from the Variables tab
5. Use this URL in Netlify environment variables

## ✅ Test Production Login

After setup, test with these credentials:
- **Teacher**: `sarah.johnson@rivoniaprimary.co.za` / `password123`
- **Student**: `alex.smith@student.co.za` / `password123`
- **Parent**: `jane.smith@email.com` / `password123`

## 🆘 Need Help?

If you get stuck:
1. **Check Netlify logs**: Go to Deploys → Click on latest deploy → View logs
2. **Verify environment variables**: Make sure DATABASE_URL is set correctly
3. **Test database connection**: Use the seed command to verify connection

**This will fix your production login issues!** 🚀
