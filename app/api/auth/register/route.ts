import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, role, phone } = body

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Basic validation
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        phone,
      },
    })

    // Create appropriate profile based on role
    if (role === 'TEACHER') {
      // For demo purposes, assign to first school
      const school = await prisma.school.findFirst()
      if (school) {
        await prisma.teacherProfile.create({
          data: {
            userId: user.id,
            schoolId: school.id,
            subjects: ['Mathematics', 'Science'], // Array of subjects
            grade: 'Grade 6',
          },
        })
      }
    } else if (role === 'PARENT') {
      await prisma.parentProfile.create({
        data: {
          userId: user.id,
        },
      })
    } else if (role === 'STUDENT') {
      // For demo purposes, assign to first school and generate student number
      const school = await prisma.school.findFirst()
      if (school) {
        const studentCount = await prisma.studentProfile.count()
        const studentNumber = `${school.name.substring(0, 3).toUpperCase()}2024${String(studentCount + 1).padStart(3, '0')}`
        
        await prisma.studentProfile.create({
          data: {
            userId: user.id,
            schoolId: school.id,
            studentNumber,
            grade: 'Grade 6', // Default grade
            subjects: ['Mathematics', 'Science', 'English', 'History', 'Geography'],
          },
        })
      }
    }

    console.log('Registration successful:', { email, firstName, lastName, role })

    return NextResponse.json(
      { 
        message: 'Account created successfully! You can now sign in.',
        userId: user.id,
        email,
        firstName,
        lastName,
        role
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}