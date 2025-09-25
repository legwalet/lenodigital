# 🗄️ LenoDigital Database Setup Guide

## 🎯 Database Options (Choose One)

### Option 1: 🐘 Local PostgreSQL (Recommended for Development)
- **Pros**: Full control, free, fast, reliable
- **Cons**: Requires local installation
- **Best for**: Development and testing

### Option 2: ☁️ Supabase (Recommended for Production)
- **Pros**: Free tier, managed, easy setup, great for production
- **Cons**: External dependency
- **Best for**: Production deployment

### Option 3: 🐳 Docker PostgreSQL
- **Pros**: Isolated, consistent, easy to manage
- **Cons**: Requires Docker knowledge
- **Best for**: Development with Docker

### Option 4: 🚀 Railway PostgreSQL
- **Pros**: Simple deployment, good free tier
- **Cons**: External dependency
- **Best for**: Production deployment

---

## 🚀 Quick Start: Supabase (Recommended)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login
3. Click "New Project"
4. Choose organization
5. Enter project details:
   - **Name**: `lenodigital`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
6. Click "Create new project"

### Step 2: Get Database URL
1. Go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Copy the **URI** connection string
4. It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### Step 3: Update Environment Variables
Replace your current `DATABASE_URL` with the Supabase URL:

```bash
# Local development (.env.local)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Production (Netlify Environment Variables)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

---

## 🐘 Local PostgreSQL Setup

### macOS (using Homebrew)
```bash
# Install PostgreSQL
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create database
createdb lenodigital

# Create user (optional)
psql -d lenodigital -c "CREATE USER lenodigital_user WITH PASSWORD 'your_password';"
psql -d lenodigital -c "GRANT ALL PRIVILEGES ON DATABASE lenodigital TO lenodigital_user;"
```

### Ubuntu/Debian
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb lenodigital

# Create user
sudo -u postgres psql -c "CREATE USER lenodigital_user WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE lenodigital TO lenodigital_user;"
```

### Windows
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Install with default settings
3. Use pgAdmin or command line to create database

### Local Database URL
```bash
# For local PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/lenodigital"

# Or with custom user
DATABASE_URL="postgresql://lenodigital_user:your_password@localhost:5432/lenodigital"
```

---

## 🐳 Docker PostgreSQL Setup

### Create docker-compose.yml
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: lenodigital
      POSTGRES_USER: lenodigital_user
      POSTGRES_PASSWORD: your_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Run Docker Container
```bash
# Start PostgreSQL
docker-compose up -d

# Check if running
docker-compose ps

# Stop PostgreSQL
docker-compose down
```

### Docker Database URL
```bash
DATABASE_URL="postgresql://lenodigital_user:your_password@localhost:5432/lenodigital"
```

---

## 🚀 Railway PostgreSQL Setup

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Choose "Provision PostgreSQL"

### Step 2: Get Database URL
1. Click on your PostgreSQL service
2. Go to **Variables** tab
3. Copy the `DATABASE_URL`

### Step 3: Use Railway URL
```bash
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/railway"
```

---

## 🔧 Database Migration Commands

After setting up your database, run these commands:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with demo data
npm run db:seed

# Open Prisma Studio (optional)
npx prisma studio
```

---

## 🎯 Recommended Setup for Production

### For Production Deployment:
1. **Use Supabase** - Free tier, reliable, managed
2. **Set up local PostgreSQL** - For development
3. **Use Railway** - Alternative to Supabase

### Environment Variables:
```bash
# Development (.env.local)
DATABASE_URL="postgresql://postgres:password@localhost:5432/lenodigital"

# Production (Netlify Environment Variables)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

---

## 🚨 Migration from Neon

If you're currently using Neon:

1. **Export data** (if needed):
   ```bash
   pg_dump "postgresql://neondb_owner:npg_bP0lKTQ1EUoR@ep-blue-dust-adpzyffd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" > backup.sql
   ```

2. **Import to new database**:
   ```bash
   psql "postgresql://postgres:password@localhost:5432/lenodigital" < backup.sql
   ```

3. **Update environment variables**

4. **Test the new setup**

---

## ✅ Next Steps

1. **Choose your database option**
2. **Set up the database**
3. **Update environment variables**
4. **Run migration commands**
5. **Test locally**
6. **Deploy to production**

Which option would you like to use? I recommend **Supabase** for production and **Local PostgreSQL** for development.
