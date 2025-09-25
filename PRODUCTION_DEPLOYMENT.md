# 🚀 LenoDigital Production Deployment Guide

## Overview
This guide will help you deploy LenoDigital to Netlify with your Neon PostgreSQL database.

## Prerequisites
- ✅ GitHub repository connected to Netlify
- ✅ Neon PostgreSQL database set up
- ✅ All code committed and pushed to GitHub

## Step 1: Netlify Environment Variables

### Go to Netlify Dashboard
1. Visit [netlify.com](https://netlify.com) and log in
2. Select your LenoDigital site
3. Go to **Site Settings** → **Environment Variables**

### Add Required Variables
Click **Add Variable** and add each of these:

```
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=your-secure-random-string-here
DATABASE_URL=postgresql://neondb_owner:npg_bP0lKTQ1EUoR@ep-blue-dust-adpzyffd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
APP_URL=https://your-site-name.netlify.app
```

### Generate NEXTAUTH_SECRET
Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

## Step 2: Deploy to Netlify

### Automatic Deployment
1. Netlify will automatically detect the new commit
2. Go to **Deploys** tab to monitor the build
3. The build should succeed with the new PostgreSQL configuration

### Manual Deployment (if needed)
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**

## Step 3: Seed Production Database

### Option A: Use Demo Credentials
The production database will be empty initially. You can:
1. Use the registration form to create new accounts
2. Or seed the database with demo data

### Option B: Seed with Demo Data
If you want to populate the production database with demo data:

1. **Connect to your Neon database**:
   ```bash
   # Install Neon CLI (optional)
   npm install -g @neondatabase/cli
   
   # Or use the connection string directly
   psql "postgresql://neondb_owner:npg_bP0lKTQ1EUoR@ep-blue-dust-adpzyffd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
   ```

2. **Run the seed script**:
   ```bash
   DATABASE_URL="postgresql://neondb_owner:npg_bP0lKTQ1EUoR@ep-blue-dust-adpzyffd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" npm run db:seed
   ```

## Step 4: Test Production Deployment

### Test Registration
1. Visit your deployed site: `https://your-site-name.netlify.app`
2. Click **Create Account**
3. Fill out the registration form
4. Verify account creation works

### Test Login
1. Use the demo credentials (if you seeded the database):
   - **Teacher**: `sarah.johnson@rivoniaprimary.co.za` / `password123`
   - **Parent**: `jane.smith@email.com` / `password123`
   - **Student**: `alex.smith@student.co.za` / `password123`

### Test Role-Based Dashboards
1. Login with different roles
2. Verify each dashboard loads correctly
3. Test interactive features (buttons, forms)

## Step 5: Production Database Management

### Monitor Database Usage
- Visit your Neon dashboard to monitor database usage
- Check connection limits and performance

### Backup Strategy
- Neon provides automatic backups
- Consider setting up additional backup strategies for critical data

### Scaling Considerations
- Monitor database performance as users increase
- Consider upgrading Neon plan if needed

## Troubleshooting

### Build Failures
- Check Netlify build logs for specific errors
- Ensure all environment variables are set correctly
- Verify Prisma client generation is working

### Database Connection Issues
- Verify DATABASE_URL is correct in Netlify environment variables
- Check Neon database is active and accessible
- Ensure SSL requirements are met

### Authentication Issues
- Verify NEXTAUTH_URL matches your deployed domain
- Check NEXTAUTH_SECRET is set correctly
- Ensure APP_URL matches your deployed domain

## Production Checklist

- [ ] Environment variables set in Netlify
- [ ] Build successful on Netlify
- [ ] Registration form working
- [ ] Login functionality working
- [ ] Role-based dashboards loading
- [ ] Database operations working
- [ ] Demo data seeded (optional)
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)

## Support

If you encounter issues:
1. Check Netlify build logs
2. Check Neon database logs
3. Verify environment variables
4. Test locally first

## Next Steps

After successful deployment:
1. Set up custom domain (optional)
2. Configure email notifications
3. Set up monitoring and analytics
4. Plan for user onboarding
5. Consider additional features

---

**🎉 Congratulations! Your LenoDigital educational platform is now live in production!**
