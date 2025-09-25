# 🚀 LenoDigital Quick Start - New Database Setup

## ⚡ Choose Your Database Setup (Pick One)

### Option 1: 🐘 Local PostgreSQL (Recommended)
```bash
# Run the setup script
npm run db:setup
```

### Option 2: 🐳 Docker PostgreSQL
```bash
# Run the Docker setup script
npm run db:setup-docker
```

### Option 3: ☁️ Supabase (For Production)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy database URL
4. Update `.env.local` with Supabase URL

---

## 🎯 What Each Option Does

### Local PostgreSQL (`npm run db:setup`)
- ✅ Installs PostgreSQL locally
- ✅ Creates `lenodigital` database
- ✅ Creates user `lenodigital_user`
- ✅ Sets up `.env.local` file
- ✅ Runs Prisma migrations
- ✅ Seeds database with demo data

### Docker PostgreSQL (`npm run db:setup-docker`)
- ✅ Starts PostgreSQL in Docker container
- ✅ Creates database and user
- ✅ Sets up `.env.local` file
- ✅ Runs Prisma migrations
- ✅ Seeds database with demo data
- ✅ Optional: pgAdmin UI at http://localhost:5050

### Supabase (Manual)
- ✅ Cloud-hosted PostgreSQL
- ✅ Free tier available
- ✅ Great for production
- ✅ Easy to scale

---

## 🔧 After Setup

### Start Development Server
```bash
npm run dev
```

### Test Demo Credentials
- **Teacher**: `sarah.johnson@rivoniaprimary.co.za` / `password123`
- **Parent**: `jane.smith@email.com` / `password123`
- **Student**: `alex.smith@student.co.za` / `password123`

### Database Management
```bash
# Open Prisma Studio
npm run db:studio

# Reset database
npm run db:reset

# View database logs (Docker only)
docker-compose logs postgres
```

---

## 🚨 Troubleshooting

### Local PostgreSQL Issues
```bash
# Check if PostgreSQL is running
pg_isready

# Start PostgreSQL service
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Linux

# Check database exists
psql -l | grep lenodigital
```

### Docker Issues
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs postgres

# Restart containers
docker-compose restart
```

### Connection Issues
```bash
# Test database connection
psql "postgresql://lenodigital_user:lenodigital123@localhost:5432/lenodigital"

# Check environment variables
cat .env.local | grep DATABASE_URL
```

---

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Setup script completes without errors
- ✅ `npm run dev` starts successfully
- ✅ You can register new accounts
- ✅ You can login with demo credentials
- ✅ Role-based dashboards load correctly

---

## 📞 Need Help?

1. **Check the logs** from the setup script
2. **Verify PostgreSQL is running** (`pg_isready` or `docker-compose ps`)
3. **Check environment variables** in `.env.local`
4. **Try the reset command** (`npm run db:reset`)

**Choose your preferred option and run the setup script!** 🚀
