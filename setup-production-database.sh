#!/bin/bash

# Production Database Setup Script for LenoDigital
# This script helps you set up Supabase for production

echo "🚀 LenoDigital Production Database Setup"
echo "========================================"
echo ""

echo "📋 Prerequisites:"
echo "1. Supabase account (supabase.com)"
echo "2. Netlify site deployed"
echo "3. Your Netlify site URL"
echo ""

read -p "Do you have a Supabase account? (y/n): " has_account

if [ "$has_account" != "y" ]; then
    echo "🔗 Please create a Supabase account first:"
    echo "   Visit: https://supabase.com"
    echo "   Sign up with GitHub"
    echo ""
    read -p "Press Enter when you have created your account..."
fi

echo ""
echo "📊 Step 1: Create Supabase Project"
echo "1. Go to https://supabase.com/dashboard"
echo "2. Click 'New Project'"
echo "3. Fill in:"
echo "   - Name: lenodigital-prod"
echo "   - Database Password: [Generate strong password]"
echo "   - Region: Choose closest to your users"
echo "4. Click 'Create new project'"
echo "5. Wait for project to be ready (2-3 minutes)"
echo ""

read -p "Press Enter when your Supabase project is ready..."

echo ""
echo "🔗 Step 2: Get Database URL"
echo "1. Go to Settings → Database"
echo "2. Scroll down to 'Connection string'"
echo "3. Copy the 'URI' connection string"
echo "4. It looks like: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
echo ""

read -p "Paste your DATABASE_URL here: " database_url

if [ -z "$database_url" ]; then
    echo "❌ Database URL is required!"
    exit 1
fi

echo ""
echo "🌐 Step 3: Get Your Netlify URL"
echo "What is your Netlify site URL? (e.g., https://lenodigital.netlify.app)"
read -p "Netlify URL: " netlify_url

if [ -z "$netlify_url" ]; then
    echo "❌ Netlify URL is required!"
    exit 1
fi

echo ""
echo "⚙️ Step 4: Update Netlify Environment Variables"
echo "Go to your Netlify dashboard and set these environment variables:"
echo ""
echo "DATABASE_URL=$database_url"
echo "NEXTAUTH_URL=$netlify_url"
echo "NEXTAUTH_SECRET=JHdD8/EOJHmePuBg6QV/1bwzKTfOM04jUrrUbPAFSvU="
echo "APP_URL=$netlify_url"
echo ""

read -p "Press Enter when you have updated Netlify environment variables..."

echo ""
echo "🚀 Step 5: Deploy Database Schema"
echo "Setting up database schema..."

# Test database connection
echo "Testing database connection..."
if DATABASE_URL="$database_url" npx prisma db push --accept-data-loss; then
    echo "✅ Database schema deployed successfully!"
else
    echo "❌ Failed to deploy database schema!"
    echo "Please check your DATABASE_URL and try again."
    exit 1
fi

echo ""
echo "🌱 Step 6: Seed Database with Demo Data"
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
echo "3. Test login at $netlify_url/auth/signin"
echo ""
echo "🎯 Your production database is ready!"
