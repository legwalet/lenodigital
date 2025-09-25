#!/bin/bash

# Quick Netlify Production Deployment Script
echo "🚀 LenoDigital Production Deployment Helper"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the LenoDigital project root"
    exit 1
fi

echo "✅ Project directory confirmed"
echo ""

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes"
    echo "   Run: git add . && git commit -m 'Your message'"
    echo ""
fi

echo "📋 DEPLOYMENT CHECKLIST:"
echo "========================"
echo ""
echo "1. ✅ Code pushed to GitHub"
echo "2. ✅ Netlify connected to repository"
echo "3. ❌ Need to create Supabase database"
echo "4. ❌ Need to set Netlify environment variables"
echo "5. ❌ Need to deploy database schema"
echo ""

echo "🚀 QUICK SETUP STEPS:"
echo "===================="
echo ""
echo "Step 1: Create Supabase Database"
echo "  - Go to: https://supabase.com"
echo "  - Create new project: 'lenodigital-prod'"
echo "  - Wait 2 minutes for setup"
echo "  - Copy DATABASE_URL from Settings → Database"
echo ""

echo "Step 2: Update Netlify Environment Variables"
echo "  - Go to: https://netlify.com"
echo "  - Click your 'lenodigital' site"
echo "  - Go to Site settings → Environment variables"
echo "  - Add these variables:"
echo ""
echo "    DATABASE_URL=[YOUR-SUPABASE-URL]"
echo "    NEXTAUTH_URL=https://lenodigital.netlify.app"
echo "    NEXTAUTH_SECRET=JHdD8/EOJHmePuBg6QV/1bwzKTfOM04jUrrUbPAFSvU="
echo "    APP_URL=https://lenodigital.netlify.app"
echo ""

echo "Step 3: Deploy Database Schema"
echo "  - Run: DATABASE_URL='[YOUR-URL]' npx prisma db push"
echo "  - Run: DATABASE_URL='[YOUR-URL]' npm run db:seed"
echo ""

echo "Step 4: Test Production"
echo "  - Go to your Netlify site URL"
echo "  - Test with demo credentials:"
echo "    Teacher: sarah.johnson@rivoniaprimary.co.za / password123"
echo "    Student: alex.smith@student.co.za / password123"
echo "    Parent: jane.smith@email.com / password123"
echo ""

echo "🎯 ALTERNATIVE: Use Railway (Even Faster)"
echo "=========================================="
echo "  - Go to: https://railway.app"
echo "  - Sign up with GitHub"
echo "  - Click 'New Project' → 'Provision PostgreSQL'"
echo "  - Wait 30 seconds"
echo "  - Copy DATABASE_URL from Variables tab"
echo ""

echo "📞 NEED HELP?"
echo "============="
echo "  - Check SUPABASE_SETUP.md for detailed instructions"
echo "  - All code is ready and pushed to GitHub"
echo "  - Netlify will auto-deploy when you push changes"
echo ""

echo "🚀 Ready to deploy! Follow the steps above."
