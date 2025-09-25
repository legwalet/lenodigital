# LenoDigital Deployment Guide

## 🚀 Deploying to Netlify

### Prerequisites
- GitHub repository with your code (✅ Done)
- Netlify account (free tier available)

### Step 1: Connect Repository to Netlify

1. Go to [Netlify](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose "GitHub" as your Git provider
4. Select your `lenodigital` repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18

### Step 2: Set Environment Variables

In your Netlify dashboard, go to Site settings > Environment variables and add:

```
NEXTAUTH_URL=https://your-app-name.netlify.app
NEXTAUTH_SECRET=your-secure-random-string-here
DATABASE_URL=your-production-database-url
APP_URL=https://your-app-name.netlify.app
```

**Important**: Generate a secure `NEXTAUTH_SECRET` using:
```bash
openssl rand -base64 32
```

### Step 3: Database Setup (Required for Production)

Since SQLite won't work on Netlify, you'll need a hosted database:

#### Option A: Supabase (Recommended - Free tier available)
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Get your database URL from Settings > Database
4. Update your `DATABASE_URL` in Netlify

#### Option B: PlanetScale (MySQL)
1. Go to [PlanetScale](https://planetscale.com)
2. Create a new database
3. Get your connection string
4. Update your `DATABASE_URL` in Netlify

#### Option C: Railway (PostgreSQL)
1. Go to [Railway](https://railway.app)
2. Create a new PostgreSQL database
3. Get your connection string
4. Update your `DATABASE_URL` in Netlify

### Step 4: Update Prisma Schema (if needed)

If you choose a different database provider, update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql" // or "mysql"
  url      = env("DATABASE_URL")
}
```

Then run:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### Step 5: Deploy

1. Click "Deploy site" in Netlify
2. Wait for the build to complete
3. Your app will be available at `https://your-app-name.netlify.app`

### Step 6: Custom Domain (Optional)

1. In Netlify dashboard, go to Domain settings
2. Add your custom domain
3. Configure DNS settings as instructed

## 🔧 Build Configuration

The `netlify.toml` file includes:
- Build settings
- Redirects for SPA routing
- Security headers
- Caching rules

## 📱 PWA Features

Your app includes PWA features:
- Offline support
- Installable on mobile devices
- Service worker for caching

## 🐛 Troubleshooting

### Build Failures
- Check Node.js version (should be 18)
- Verify all environment variables are set
- Check build logs in Netlify dashboard

### Database Issues
- Ensure `DATABASE_URL` is correct
- Run migrations if needed: `npx prisma db push`
- Check database connection limits

### Authentication Issues
- Verify `NEXTAUTH_URL` matches your domain
- Ensure `NEXTAUTH_SECRET` is set
- Check callback URLs in NextAuth configuration

## 🔄 Continuous Deployment

Once connected, Netlify will automatically deploy when you push to your main branch.

## 📊 Monitoring

Consider adding:
- [Vercel Analytics](https://vercel.com/analytics) for performance monitoring
- [Sentry](https://sentry.io) for error tracking
- [Google Analytics](https://analytics.google.com) for user analytics

## 🎉 Success!

Your LenoDigital educational platform is now live! 🚀

Visit your deployed app and test all features:
- User registration and login
- Role-based dashboards
- Interactive functionality
- Mobile responsiveness
