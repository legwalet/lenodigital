#!/bin/bash

# LenoDigital Docker Database Setup Script
# This script sets up a PostgreSQL database using Docker

echo "🐳 Setting up LenoDigital Database with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first:"
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

# Create init.sql file
echo "📝 Creating database initialization script..."
cat > init.sql << 'EOF'
-- Initialize database
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOF

# Start PostgreSQL container
echo "🚀 Starting PostgreSQL container..."
docker-compose up -d postgres

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Check if container is running
if docker-compose ps postgres | grep -q "Up"; then
    echo "✅ PostgreSQL container is running!"
else
    echo "❌ PostgreSQL container failed to start!"
    docker-compose logs postgres
    exit 1
fi

# Test database connection
echo "🔍 Testing database connection..."
if docker-compose exec postgres psql -U lenodigital_user -d lenodigital -c "SELECT 1;" &> /dev/null; then
    echo "✅ Database connection successful!"
else
    echo "❌ Database connection failed!"
    exit 1
fi

# Create .env.local with Docker database URL
echo "📝 Creating .env.local file..."
cat > .env.local << 'EOF'
# Database - Docker PostgreSQL
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
echo "🎉 Docker database setup complete!"
echo ""
echo "📊 Database Details:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: lenodigital"
echo "   User: lenodigital_user"
echo "   Password: lenodigital123"
echo ""
echo "🐳 Docker Commands:"
echo "   Start: docker-compose up -d"
echo "   Stop: docker-compose down"
echo "   Logs: docker-compose logs postgres"
echo "   Shell: docker-compose exec postgres psql -U lenodigital_user -d lenodigital"
echo ""
echo "🌐 Optional: pgAdmin (Database Management UI)"
echo "   URL: http://localhost:5050"
echo "   Email: admin@lenodigital.com"
echo "   Password: admin123"
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
