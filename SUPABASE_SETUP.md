# 🚀 SUPABASE PRODUCTION DATABASE SETUP

## Quick Setup (2 minutes):

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/login with GitHub
4. Click "New Project"
5. Enter project details:
   - **Name**: `lenodigital-prod`
   - **Database Password**: `lenodigital123` (or any secure password)
6. Click "Create new project"
7. Wait 2 minutes for setup

### Step 2: Get Database URL
1. Go to Settings → Database
2. Copy the "Connection string" (it looks like):
   ```
   postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
   ```

### Step 3: Update Netlify Environment Variables
1. Go to [netlify.com](https://netlify.com)
2. Click your `lenodigital` site
3. Go to Site settings → Environment variables
4. Add these variables:

```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
NEXTAUTH_URL=https://lenodigital.netlify.app
NEXTAUTH_SECRET=JHdD8/EOJHmePuBg6QV/1bwzKTfOM04jUrrUbPAFSvU=
APP_URL=https://lenodigital.netlify.app
```

### Step 4: Deploy Database Schema
Once you have the DATABASE_URL, run these commands:

```bash
# Replace [YOUR-DATABASE-URL] with your actual Supabase URL
DATABASE_URL="[YOUR-DATABASE-URL]" npx prisma db push

DATABASE_URL="[YOUR-DATABASE-URL]" npm run db:seed
```

### Step 5: Test Production
1. Go to your Netlify site URL
2. Test signup/login with demo credentials:
   - **Teacher**: `sarah.johnson@rivoniaprimary.co.za` / `password123`
   - **Student**: `alex.smith@student.co.za` / `password123`
   - **Parent**: `jane.smith@email.com` / `password123`

## 🎯 Why Supabase?
- ✅ **Fast setup** (2 minutes)
- ✅ **Free tier** available
- ✅ **PostgreSQL** compatible
- ✅ **Automatic backups**
- ✅ **Easy to use**

## 🚨 Current Status:
- ✅ **Code**: Pushed to GitHub
- ✅ **Netlify**: Connected and ready
- ❌ **Database**: Need Supabase setup
- ❌ **Environment**: Need variables set

**Follow the steps above and your production will work!** 🚀
