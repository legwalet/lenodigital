export enum UserRole {
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  STUDENT = 'STUDENT',
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  DISTRICT_ADMIN = 'DISTRICT_ADMIN'
}

export enum AssessmentType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SHORT_ANSWER = 'SHORT_ANSWER',
  FILE_UPLOAD = 'FILE_UPLOAD',
  ESSAY = 'ESSAY'
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED'
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  phone?: string
  avatar?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TeacherProfile {
  id: string
  userId: string
  schoolId: string
  subjects: string[]
  grade?: string
  user: User
  school: School
}

export interface StudentProfile {
  id: string
  userId: string
  schoolId: string
  parentId?: string
  studentNumber: string
  grade: string
  subjects: string[]
  user: User
  school: School
  parent?: ParentProfile
}

export interface ParentProfile {
  id: string
  userId: string
  user: User
  students: StudentProfile[]
}

export interface School {
  id: string
  name: string
  address?: string
  phone?: string
  email?: string
  districtId?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface District {
  id: string
  name: string
  region?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Class {
  id: string
  name: string
  subject: string
  grade: string
  schoolId: string
  teacherId: string
  term: string
  year: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  school: School
  teacher: TeacherProfile
}

export interface Lesson {
  id: string
  title: string
  description?: string
  content: string
  videoUrl?: string
  attachments: string[]
  classId: string
  teacherId: string
  scheduledAt?: Date
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  class: Class
  teacher: TeacherProfile
}

export interface Assessment {
  id: string
  title: string
  description?: string
  type: AssessmentType
  questions: any // JSON object
  classId: string
  teacherId: string
  dueDate?: Date
  timeLimit?: number
  maxAttempts: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  class: Class
  teacher: TeacherProfile
}

export interface AssessmentSubmission {
  id: string
  assessmentId: string
  studentId: string
  answers: any // JSON object
  score?: number
  feedback?: string
  submittedAt: Date
  gradedAt?: Date
  assessment: Assessment
  student: StudentProfile
}

export interface Attendance {
  id: string
  studentId: string
  classId?: string
  lessonId?: string
  date: Date
  status: AttendanceStatus
  notes?: string
  createdAt: Date
  updatedAt: Date
  student: StudentProfile
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: Date
}

export interface Message {
  id: string
  senderId: string
  receiverId?: string
  classId?: string
  title: string
  content: string
  isRead: boolean
  createdAt: Date
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  role: UserRole
  phone?: string
}

export interface LessonForm {
  title: string
  description?: string
  content: string
  videoUrl?: string
  attachments?: File[]
  scheduledAt?: Date
}

export interface AssessmentForm {
  title: string
  description?: string
  type: AssessmentType
  questions: any
  dueDate?: Date
  timeLimit?: number
  maxAttempts: number
}

export interface AttendanceForm {
  studentId: string
  status: AttendanceStatus
  notes?: string
  date: Date
}
