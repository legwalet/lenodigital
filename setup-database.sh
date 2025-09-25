#!/bin/bash

# LenoDigital Database Setup Script
# This script sets up a local PostgreSQL database for development

echo "🗄️ Setting up LenoDigital Database..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install it first:"
    echo "   macOS: brew install postgresql"
    echo "   Ubuntu: sudo apt install postgresql postgresql-contrib"
    echo "   Windows: Download from https://postgresql.org/download/windows/"
    exit 1
fi

# Check if PostgreSQL service is running
if ! pg_isready -q; then
    echo "⚠️  PostgreSQL service is not running. Starting it..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew services start postgresql
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo systemctl start postgresql
    fi
    sleep 3
fi

# Create database
echo "📊 Creating database 'lenodigital'..."
createdb lenodigital 2>/dev/null || echo "Database 'lenodigital' already exists"

# Create user (optional)
echo "👤 Creating user 'lenodigital_user'..."
psql -d lenodigital -c "CREATE USER lenodigital_user WITH PASSWORD 'lenodigital123';" 2>/dev/null || echo "User 'lenodigital_user' already exists"
psql -d lenodigital -c "GRANT ALL PRIVILEGES ON DATABASE lenodigital TO lenodigital_user;" 2>/dev/null || echo "Privileges already granted"

# Test connection
echo "🔍 Testing database connection..."
if psql -d lenodigital -c "SELECT 1;" &> /dev/null; then
    echo "✅ Database connection successful!"
else
    echo "❌ Database connection failed!"
    exit 1
fi

# Create .env.local with database URL
echo "📝 Creating .env.local file..."
cat > .env.local << 'EOF'
# Database - Local PostgreSQL
DATABASE_URL="postgresql://lenodigital_user:lenodigital123@localhost:5432/lenodigital"

# NextAuth
NEXTAUTH_URL="http://localhost:3400"
NEXTAUTH_SECRET="JHdD8/EOJHmePuBg6QV/1bwzKTfOM04jUrrUbPAFSvU="

# Email Configuration
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@lenodigital.com"

# File Upload
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=10485760

# SMS Configuration (optional)
SMS_API_KEY="your-sms-api-key"
SMS_SENDER_ID="LenoDigital"

# App Configuration
APP_NAME="LenoDigital"
APP_URL="http://localhost:3400"
EOF

echo "✅ .env.local file created!"

# Run Prisma commands
echo "🔧 Setting up Prisma..."
npx prisma generate
npx prisma db push

echo "🌱 Seeding database with demo data..."
npm run db:seed

echo ""
echo "🎉 Database setup complete!"
echo ""
echo "📊 Database Details:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: lenodigital"
echo "   User: lenodigital_user"
echo "   Password: lenodigital123"
echo ""
echo "🔗 Connection URL:"
echo "   postgresql://lenodigital_user:lenodigital123@localhost:5432/lenodigital"
echo ""
echo "🚀 Next steps:"
echo "   1. Start the development server: npm run dev"
echo "   2. Visit: http://localhost:3400"
echo "   3. Test with demo credentials:"
echo "      Teacher: sarah.johnson@rivoniaprimary.co.za / password123"
echo "      Parent: jane.smith@email.com / password123"
echo "      Student: alex.smith@student.co.za / password123"
echo ""
echo "📖 For production deployment, see DATABASE_SETUP.md"
