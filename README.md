# LenoDigital - Educational Platform

A comprehensive web platform connecting Teachers, Parents, and Students to deliver curriculum content, manage assessments and attendance, and provide administrators with digital reporting for South African schools.

## Features

### Core Functionality
- **User Management**: Role-based access for Teachers, Parents, Students, School Admins, and District Admins
- **Lesson Management**: Create rich lessons with text, videos, and attachments
- **Assessment Engine**: Build assessments with multiple choice, short answers, and file uploads
- **Attendance Tracking**: Mark attendance per lesson and per day
- **Gradebook**: Track student progress and grades
- **Export & Reporting**: Export data in CSV, Excel, PDF formats for national submissions
- **Notifications**: Email and in-app notifications for important updates
- **Offline Support**: PWA capabilities for offline lesson access

### User Roles
- **Teachers**: Create lessons, manage assessments, track attendance, export reports
- **Students**: View lessons, complete assessments, track progress
- **Parents**: Monitor child's progress, receive notifications, view reports
- **School Admins**: Manage users, generate reports, system configuration
- **District Admins**: Oversee multiple schools, aggregated reporting

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS + Radix UI components (shadcn/ui style)
- **State & Data Fetching**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form + Zod for validation
- **Charts/Analytics**: Recharts for data visualization
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **File Upload**: Multer, Sharp for image processing
- **Export**: PDF-lib, ExcelJS, CSV parser
- **Video**: Custom HLS.js player component for streaming
- **PWA**: Next PWA with service worker for offline lesson caching
- **HTTP Client**: Axios for API requests

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LenoDigital
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update the `.env.local` file with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/lenodigital"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses Prisma with PostgreSQL and includes the following main entities:

- **Users**: Core user accounts with role-based access
- **Schools & Districts**: Organizational structure
- **Classes**: Subject-based class management
- **Lessons**: Educational content with rich media
- **Assessments**: Quizzes, tests, and assignments
- **Attendance**: Student attendance tracking
- **Notifications**: System-wide communication

## Project Structure

```
LenoDigital/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── providers/        # Context providers
├── lib/                  # Utility functions
├── prisma/              # Database schema
├── types/               # TypeScript type definitions
└── hooks/               # Custom React hooks
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Key Features Implementation

1. **Authentication**: NextAuth.js with credentials provider
2. **File Upload**: Multer middleware for handling file uploads
3. **Rich Text Editor**: React Quill for lesson content creation
4. **Video Support**: React Player with HLS streaming
5. **Export Functionality**: Multiple format support (PDF, Excel, CSV)
6. **PWA Support**: Service worker for offline capabilities

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.

## Roadmap

### Phase 2 Features
- Mobile apps (React Native)
- Advanced analytics and reporting
- Integration with national SIS standards
- Multi-language support (isiZulu, Afrikaans, Xhosa)
- Parent-teacher scheduling
- Video conferencing integration
- Plagiarism detection
- Advanced proctoring options
