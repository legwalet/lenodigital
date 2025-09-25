#!/bin/bash

# Quick Production Database Setup Script
echo "🚀 LenoDigital Production Database Quick Setup"
echo "=============================================="
echo ""

echo "📊 Current Status:"
echo "✅ Local Development: Working with Docker PostgreSQL"
echo "❌ Production (Netlify): Using old Neon database (causing login errors)"
echo ""

echo "🎯 Solution: Set up Supabase for production"
echo ""

echo "Step 1: Create Supabase Project"
echo "1. Go to https://supabase.com"
echo "2. Sign up/login with GitHub"
echo "3. Click 'New Project'"
echo "4. Fill in:"
echo "   - Name: lenodigital-prod"
echo "   - Database Password: [Generate strong password]"
echo "   - Region: us-east-1 (or closest to you)"
echo "5. Click 'Create new project'"
echo "6. Wait 2-3 minutes for setup"
echo ""

read -p "Press Enter when your Supabase project is ready..."

echo ""
echo "Step 2: Get Database URL"
echo "1. Go to Settings → Database"
echo "2. Scroll to 'Connection string'"
echo "3. Copy the 'URI' connection string"
echo ""

read -p "Paste your DATABASE_URL here: " database_url

if [ -z "$database_url" ]; then
    echo "❌ Database URL is required!"
    exit 1
fi

echo ""
echo "Step 3: Update Netlify Environment Variables"
echo "Go to your Netlify dashboard and set these environment variables:"
echo ""
echo "DATABASE_URL=$database_url"
echo "NEXTAUTH_URL=https://lenodigital.netlify.app"
echo "NEXTAUTH_SECRET=JHdD8/EOJHmePuBg6QV/1bwzKTfOM04jUrrUbPAFSvU="
echo "APP_URL=https://lenodigital.netlify.app"
echo ""

read -p "Press Enter when you have updated Netlify environment variables..."

echo ""
echo "Step 4: Deploy Database Schema"
echo "Setting up database schema..."

if DATABASE_URL="$database_url" npx prisma db push --accept-data-loss; then
    echo "✅ Database schema deployed successfully!"
else
    echo "❌ Failed to deploy database schema!"
    echo "Please check your DATABASE_URL and try again."
    exit 1
fi

echo ""
echo "Step 5: Seed Database with Demo Data"
echo "Adding demo users and data..."

if DATABASE_URL="$database_url" npm run db:seed; then
    echo "✅ Database seeded successfully!"
else
    echo "❌ Failed to seed database!"
    echo "Please check your DATABASE_URL and try again."
    exit 1
fi

echo ""
echo "🎉 Production Database Setup Complete!"
echo "====================================="
echo ""
echo "✅ Database: Supabase PostgreSQL"
echo "✅ Schema: Deployed"
echo "✅ Demo Data: Seeded"
echo ""
echo "🔑 Demo Login Credentials:"
echo "Teacher: sarah.johnson@rivoniaprimary.co.za / password123"
echo "Student: alex.smith@student.co.za / password123"
echo "Parent: jane.smith@email.com / password123"
echo ""
echo "🚀 Next Steps:"
echo "1. Trigger a new deployment in Netlify"
echo "2. Wait for build to complete"
echo "3. Test login at https://lenodigital.netlify.app/auth/signin"
echo ""
echo "🎯 Your production database is ready!"
