# 🚨 IMMEDIATE FIX: Production Database Setup

## The Problem
Your production site (lenodigital.netlify.app) is trying to connect to the old Neon database, but we've moved to a local Docker setup. Production needs its own cloud database.

## ⚡ Quick Fix (5 minutes)

### Option 1: Supabase (Recommended)
1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/login with GitHub**
3. **Click "New Project"**
4. **Fill in:**
   - Name: `lenodigital-prod`
   - Database Password: `Generate a strong password` (save it!)
   - Region: `us-east-1` (or closest to you)
5. **Click "Create new project"**
6. **Wait 2-3 minutes for setup**

### Get Database URL
1. **Go to Settings → Database**
2. **Scroll to "Connection string"**
3. **Copy the URI** (looks like: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`)

### Update Netlify
1. **Go to [netlify.com](https://netlify.com)**
2. **Click your `lenodigital` site**
3. **Go to Site settings → Environment variables**
4. **Add/Update these:**

```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
NEXTAUTH_URL=https://lenodigital.netlify.app
NEXTAUTH_SECRET=JHdD8/EOJHmePuBg6QV/1bwzKTfOM04jUrrUbPAFSvU=
APP_URL=https://lenodigital.netlify.app
```

### Deploy & Test
1. **Go to Deploys tab**
2. **Click "Trigger deploy" → "Deploy site"**
3. **Wait for build to complete**
4. **Test login at: https://lenodigital.netlify.app/auth/signin**

## 🎯 Demo Credentials (After Setup)
- **Teacher**: `sarah.johnson@rivoniaprimary.co.za` / `password123`
- **Student**: `alex.smith@student.co.za` / `password123`
- **Parent**: `jane.smith@email.com` / `password123`

## 🆘 Alternative: Railway (Even Easier)
If Supabase seems complex:
1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project" → "Provision PostgreSQL"**
4. **Copy the DATABASE_URL from Variables tab**
5. **Use this URL in Netlify environment variables**

## ✅ This Will Fix Your Login Issues!

The "Invalid email or password" error happens because:
- Production is trying to connect to old Neon database
- Neon database doesn't have the demo users we created
- We need a fresh cloud database with the demo data

**Follow the steps above and your production login will work!** 🚀
