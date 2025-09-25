import { z } from 'zod'

// User schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  role: z.enum(['TEACHER', 'PARENT', 'STUDENT', 'SCHOOL_ADMIN', 'DISTRICT_ADMIN']),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Lesson schemas
export const lessonSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  videoUrl: z.string().url('Invalid video URL').optional().or(z.literal('')),
  attachments: z.array(z.string()).optional(),
  scheduledAt: z.date().optional(),
  classId: z.string().min(1, 'Class is required'),
})

// Assessment schemas
export const assessmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: z.enum(['MULTIPLE_CHOICE', 'SHORT_ANSWER', 'FILE_UPLOAD', 'ESSAY']),
  questions: z.array(z.object({
    id: z.string(),
    question: z.string().min(1, 'Question is required'),
    type: z.enum(['multiple_choice', 'short_answer', 'file_upload', 'essay']),
    options: z.array(z.string()).optional(),
    correctAnswer: z.string().optional(),
    points: z.number().min(1, 'Points must be at least 1'),
  })),
  dueDate: z.date().optional(),
  timeLimit: z.number().min(1).optional(),
  maxAttempts: z.number().min(1).default(1),
  classId: z.string().min(1, 'Class is required'),
})

// Class schemas
export const classSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  subject: z.string().min(1, 'Subject is required'),
  grade: z.string().min(1, 'Grade is required'),
  term: z.string().min(1, 'Term is required'),
  year: z.number().min(2020).max(2030),
})

// Attendance schemas
export const attendanceSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']),
  notes: z.string().optional(),
  date: z.date(),
  classId: z.string().optional(),
  lessonId: z.string().optional(),
})

// School schemas
export const schoolSchema = z.object({
  name: z.string().min(1, 'School name is required'),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  districtId: z.string().optional(),
})

// Student profile schemas
export const studentProfileSchema = z.object({
  studentNumber: z.string().min(1, 'Student number is required'),
  grade: z.string().min(1, 'Grade is required'),
  subjects: z.array(z.string()),
  parentId: z.string().optional(),
  schoolId: z.string().min(1, 'School is required'),
})

// Teacher profile schemas
export const teacherProfileSchema = z.object({
  subjects: z.array(z.string()).min(1, 'At least one subject is required'),
  grade: z.string().optional(),
  schoolId: z.string().min(1, 'School is required'),
})

// Message schemas
export const messageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  receiverId: z.string().optional(),
  classId: z.string().optional(),
})

// File upload schemas
export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  type: z.enum(['lesson', 'assessment', 'profile']),
  description: z.string().optional(),
})

// Export schemas
export const exportSchema = z.object({
  format: z.enum(['csv', 'excel', 'pdf']),
  type: z.enum(['attendance', 'grades', 'students', 'teachers', 'reports']),
  dateRange: z.object({
    start: z.date(),
    end: z.date(),
  }).optional(),
  filters: z.record(z.string()).optional(),
})

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type LessonFormData = z.infer<typeof lessonSchema>
export type AssessmentFormData = z.infer<typeof assessmentSchema>
export type ClassFormData = z.infer<typeof classSchema>
export type AttendanceFormData = z.infer<typeof attendanceSchema>
export type SchoolFormData = z.infer<typeof schoolSchema>
export type StudentProfileFormData = z.infer<typeof studentProfileSchema>
export type TeacherProfileFormData = z.infer<typeof teacherProfileSchema>
export type MessageFormData = z.infer<typeof messageSchema>
export type FileUploadFormData = z.infer<typeof fileUploadSchema>
export type ExportFormData = z.infer<typeof exportSchema>
