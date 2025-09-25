import { PrismaClient, UserRole, AssessmentType, AttendanceStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create Districts
  const district1 = await prisma.district.create({
    data: {
      name: 'Johannesburg Central District',
      region: 'Gauteng',
    },
  })

  const district2 = await prisma.district.create({
    data: {
      name: 'Cape Town Metro District',
      region: 'Western Cape',
    },
  })

  console.log('✅ Created districts')

  // Create Schools
  const school1 = await prisma.school.create({
    data: {
      name: 'Rivonia Primary School',
      address: '123 Rivonia Road, Sandton, Johannesburg',
      phone: '+27 11 234 5678',
      email: 'info@rivoniaprimary.co.za',
      districtId: district1.id,
    },
  })

  const school2 = await prisma.school.create({
    data: {
      name: 'Sea Point High School',
      address: '456 Main Road, Sea Point, Cape Town',
      phone: '+27 21 345 6789',
      email: 'admin@seapointhigh.co.za',
      districtId: district2.id,
    },
  })

  const school3 = await prisma.school.create({
    data: {
      name: 'Soweto Secondary School',
      address: '789 Vilakazi Street, Soweto, Johannesburg',
      phone: '+27 11 456 7890',
      email: 'contact@sowetosecondary.co.za',
      districtId: district1.id,
    },
  })

  console.log('✅ Created schools')

  // Create Users and Profiles
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Teachers
  const teacher1 = await prisma.user.create({
    data: {
      email: 'sarah.johnson@rivoniaprimary.co.za',
      password: hashedPassword,
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: UserRole.TEACHER,
      phone: '+27 82 123 4567',
    },
  })

  const teacher2 = await prisma.user.create({
    data: {
      email: 'mike.wilson@seapointhigh.co.za',
      password: hashedPassword,
      firstName: 'Mike',
      lastName: 'Wilson',
      role: UserRole.TEACHER,
      phone: '+27 83 234 5678',
    },
  })

  const teacher3 = await prisma.user.create({
    data: {
      email: 'thabo.mthembu@sowetosecondary.co.za',
      password: hashedPassword,
      firstName: 'Thabo',
      lastName: 'Mthembu',
      role: UserRole.TEACHER,
      phone: '+27 84 345 6789',
    },
  })

  // Parents
  const parent1 = await prisma.user.create({
    data: {
      email: 'jane.smith@email.com',
      password: hashedPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      role: UserRole.PARENT,
      phone: '+27 85 456 7890',
    },
  })

  const parent2 = await prisma.user.create({
    data: {
      email: 'david.brown@email.com',
      password: hashedPassword,
      firstName: 'David',
      lastName: 'Brown',
      role: UserRole.PARENT,
      phone: '+27 86 567 8901',
    },
  })

  const parent3 = await prisma.user.create({
    data: {
      email: 'nomfundo.ndlovu@email.com',
      password: hashedPassword,
      firstName: 'Nomfundo',
      lastName: 'Ndlovu',
      role: UserRole.PARENT,
      phone: '+27 87 678 9012',
    },
  })

  // Students
  const student1 = await prisma.user.create({
    data: {
      email: 'alex.smith@student.co.za',
      password: hashedPassword,
      firstName: 'Alex',
      lastName: 'Smith',
      role: UserRole.STUDENT,
      phone: '+27 88 789 0123',
    },
  })

  const student2 = await prisma.user.create({
    data: {
      email: 'emma.brown@student.co.za',
      password: hashedPassword,
      firstName: 'Emma',
      lastName: 'Brown',
      role: UserRole.STUDENT,
      phone: '+27 89 890 1234',
    },
  })

  const student3 = await prisma.user.create({
    data: {
      email: 'sipho.ndlovu@student.co.za',
      password: hashedPassword,
      firstName: 'Sipho',
      lastName: 'Ndlovu',
      role: UserRole.STUDENT,
      phone: '+27 90 901 2345',
    },
  })

  const student4 = await prisma.user.create({
    data: {
      email: 'lisa.johnson@student.co.za',
      password: hashedPassword,
      firstName: 'Lisa',
      lastName: 'Johnson',
      role: UserRole.STUDENT,
      phone: '+27 91 012 3456',
    },
  })

  const student5 = await prisma.user.create({
    data: {
      email: 'tom.wilson@student.co.za',
      password: hashedPassword,
      firstName: 'Tom',
      lastName: 'Wilson',
      role: UserRole.STUDENT,
      phone: '+27 92 123 4567',
    },
  })

  console.log('✅ Created users')

  // Create Teacher Profiles
  const teacherProfile1 = await prisma.teacherProfile.create({
    data: {
      userId: teacher1.id,
      schoolId: school1.id,
      subjects: ['Mathematics', 'Science'],
      grade: 'Grade 6',
    },
  })

  const teacherProfile2 = await prisma.teacherProfile.create({
    data: {
      userId: teacher2.id,
      schoolId: school2.id,
      subjects: ['English', 'History'],
      grade: 'Grade 10',
    },
  })

  const teacherProfile3 = await prisma.teacherProfile.create({
    data: {
      userId: teacher3.id,
      schoolId: school3.id,
      subjects: ['Geography', 'Life Sciences'],
      grade: 'Grade 11',
    },
  })

  console.log('✅ Created teacher profiles')

  // Create Parent Profiles
  const parentProfile1 = await prisma.parentProfile.create({
    data: {
      userId: parent1.id,
    },
  })

  const parentProfile2 = await prisma.parentProfile.create({
    data: {
      userId: parent2.id,
    },
  })

  const parentProfile3 = await prisma.parentProfile.create({
    data: {
      userId: parent3.id,
    },
  })

  console.log('✅ Created parent profiles')

  // Create Student Profiles
  const studentProfile1 = await prisma.studentProfile.create({
    data: {
      userId: student1.id,
      schoolId: school1.id,
      parentId: parentProfile1.id,
      studentNumber: 'RPS2024001',
      grade: 'Grade 6',
      subjects: ['Mathematics', 'Science', 'English', 'History', 'Geography'],
    },
  })

  const studentProfile2 = await prisma.studentProfile.create({
    data: {
      userId: student2.id,
      schoolId: school2.id,
      parentId: parentProfile2.id,
      studentNumber: 'SPH2024002',
      grade: 'Grade 10',
      subjects: ['English', 'History', 'Mathematics', 'Geography', 'Life Sciences'],
    },
  })

  const studentProfile3 = await prisma.studentProfile.create({
    data: {
      userId: student3.id,
      schoolId: school3.id,
      parentId: parentProfile3.id,
      studentNumber: 'SSS2024003',
      grade: 'Grade 11',
      subjects: ['Geography', 'Life Sciences', 'Mathematics', 'English', 'History'],
    },
  })

  const studentProfile4 = await prisma.studentProfile.create({
    data: {
      userId: student4.id,
      schoolId: school1.id,
      parentId: parentProfile1.id,
      studentNumber: 'RPS2024004',
      grade: 'Grade 6',
      subjects: ['Mathematics', 'Science', 'English', 'History', 'Geography'],
    },
  })

  const studentProfile5 = await prisma.studentProfile.create({
    data: {
      userId: student5.id,
      schoolId: school2.id,
      parentId: parentProfile2.id,
      studentNumber: 'SPH2024005',
      grade: 'Grade 10',
      subjects: ['English', 'History', 'Mathematics', 'Geography', 'Life Sciences'],
    },
  })

  console.log('✅ Created student profiles')

  // Create Classes
  const class1 = await prisma.class.create({
    data: {
      name: 'Grade 6 Mathematics',
      subject: 'Mathematics',
      grade: 'Grade 6',
      schoolId: school1.id,
      teacherId: teacherProfile1.id,
      term: 'Term 1',
      year: 2024,
    },
  })

  const class2 = await prisma.class.create({
    data: {
      name: 'Grade 10 English',
      subject: 'English',
      grade: 'Grade 10',
      schoolId: school2.id,
      teacherId: teacherProfile2.id,
      term: 'Term 1',
      year: 2024,
    },
  })

  const class3 = await prisma.class.create({
    data: {
      name: 'Grade 11 Geography',
      subject: 'Geography',
      grade: 'Grade 11',
      schoolId: school3.id,
      teacherId: teacherProfile3.id,
      term: 'Term 1',
      year: 2024,
    },
  })

  console.log('✅ Created classes')

  // Create Class Enrollments
  await prisma.classEnrollment.createMany({
    data: [
      { classId: class1.id, studentId: studentProfile1.id },
      { classId: class1.id, studentId: studentProfile4.id },
      { classId: class2.id, studentId: studentProfile2.id },
      { classId: class2.id, studentId: studentProfile5.id },
      { classId: class3.id, studentId: studentProfile3.id },
    ],
  })

  console.log('✅ Created class enrollments')

  // Create Lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'Introduction to Fractions',
      description: 'Understanding basic fractions and their applications',
      content: 'Today we will learn about fractions, how to identify them, and basic operations.',
      videoUrl: 'https://example.com/video1.mp4',
      attachments: ['fraction-worksheet.pdf', 'homework.pdf'],
      classId: class1.id,
      teacherId: teacherProfile1.id,
      scheduledAt: new Date('2024-01-15T09:00:00Z'),
      isPublished: true,
    },
  })

  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'Shakespeare\'s Sonnets',
      description: 'Analysis of Shakespeare\'s most famous sonnets',
      content: 'We will explore the themes, structure, and literary devices in Shakespeare\'s sonnets.',
      videoUrl: 'https://example.com/video2.mp4',
      attachments: ['sonnet-analysis.pdf'],
      classId: class2.id,
      teacherId: teacherProfile2.id,
      scheduledAt: new Date('2024-01-16T10:00:00Z'),
      isPublished: true,
    },
  })

  const lesson3 = await prisma.lesson.create({
    data: {
      title: 'Climate Change and Weather Patterns',
      description: 'Understanding global climate systems',
      content: 'Exploring how climate change affects weather patterns globally.',
      videoUrl: 'https://example.com/video3.mp4',
      attachments: ['climate-data.xlsx', 'research-paper.pdf'],
      classId: class3.id,
      teacherId: teacherProfile3.id,
      scheduledAt: new Date('2024-01-17T11:00:00Z'),
      isPublished: true,
    },
  })

  console.log('✅ Created lessons')

  // Create Assessments
  const assessment1 = await prisma.assessment.create({
    data: {
      title: 'Fractions Quiz',
      description: 'Test your understanding of basic fractions',
      type: AssessmentType.MULTIPLE_CHOICE,
      questions: [
        {
          id: 1,
          question: 'What is 1/2 + 1/4?',
          options: ['1/6', '2/6', '3/4', '1/4'],
          correctAnswer: '3/4',
        },
        {
          id: 2,
          question: 'Which fraction is larger: 2/3 or 3/4?',
          options: ['2/3', '3/4', 'They are equal', 'Cannot determine'],
          correctAnswer: '3/4',
        },
      ],
      classId: class1.id,
      teacherId: teacherProfile1.id,
      dueDate: new Date('2024-01-20T23:59:59Z'),
      timeLimit: 30,
      maxAttempts: 2,
      isPublished: true,
    },
  })

  const assessment2 = await prisma.assessment.create({
    data: {
      title: 'Sonnet Analysis Essay',
      description: 'Write an analysis of a Shakespearean sonnet',
      type: AssessmentType.ESSAY,
      questions: [
        {
          id: 1,
          question: 'Analyze the theme of love in Sonnet 18. Include specific examples from the text.',
          type: 'essay',
          wordLimit: 500,
        },
      ],
      classId: class2.id,
      teacherId: teacherProfile2.id,
      dueDate: new Date('2024-01-25T23:59:59Z'),
      timeLimit: 60,
      maxAttempts: 1,
      isPublished: true,
    },
  })

  console.log('✅ Created assessments')

  // Create Assessment Submissions
  await prisma.assessmentSubmission.create({
    data: {
      assessmentId: assessment1.id,
      studentId: studentProfile1.id,
      answers: [
        { questionId: 1, answer: '3/4' },
        { questionId: 2, answer: '3/4' },
      ],
      score: 100.0,
      feedback: 'Excellent work! You have a strong understanding of fractions.',
      submittedAt: new Date('2024-01-18T14:30:00Z'),
      gradedAt: new Date('2024-01-19T09:00:00Z'),
    },
  })

  await prisma.assessmentSubmission.create({
    data: {
      assessmentId: assessment2.id,
      studentId: studentProfile2.id,
      answers: [
        {
          questionId: 1,
          answer: 'Sonnet 18 explores the theme of eternal love through the metaphor of comparing the beloved to a summer\'s day...',
        },
      ],
      score: 85.0,
      feedback: 'Good analysis with solid examples. Consider exploring the metaphor more deeply.',
      submittedAt: new Date('2024-01-24T16:45:00Z'),
      gradedAt: new Date('2024-01-26T10:30:00Z'),
    },
  })

  console.log('✅ Created assessment submissions')

  // Create Attendance Records
  const attendanceData = [
    {
      studentId: studentProfile1.id,
      classId: class1.id,
      date: new Date('2024-01-15T09:00:00Z'),
      status: AttendanceStatus.PRESENT,
    },
    {
      studentId: studentProfile4.id,
      classId: class1.id,
      date: new Date('2024-01-15T09:00:00Z'),
      status: AttendanceStatus.LATE,
      notes: 'Arrived 10 minutes late due to traffic',
    },
    {
      studentId: studentProfile2.id,
      classId: class2.id,
      date: new Date('2024-01-16T10:00:00Z'),
      status: AttendanceStatus.PRESENT,
    },
    {
      studentId: studentProfile5.id,
      classId: class2.id,
      date: new Date('2024-01-16T10:00:00Z'),
      status: AttendanceStatus.ABSENT,
      notes: 'Sick leave',
    },
    {
      studentId: studentProfile3.id,
      classId: class3.id,
      date: new Date('2024-01-17T11:00:00Z'),
      status: AttendanceStatus.PRESENT,
    },
  ]

  await prisma.attendance.createMany({
    data: attendanceData,
  })

  console.log('✅ Created attendance records')

  // Create Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: parent1.id,
        title: 'New Assessment Posted',
        message: 'A new fractions quiz has been posted for Alex Smith.',
        type: 'assignment',
      },
      {
        userId: parent2.id,
        title: 'Attendance Alert',
        message: 'Emma Brown was absent from English class on January 16.',
        type: 'attendance',
      },
      {
        userId: student1.id,
        title: 'Grade Posted',
        message: 'Your fractions quiz grade (100%) has been posted.',
        type: 'grade',
      },
      {
        userId: teacher1.id,
        title: 'New Student Enrollment',
        message: 'Lisa Johnson has been enrolled in your Grade 6 Mathematics class.',
        type: 'enrollment',
      },
    ],
  })

  console.log('✅ Created notifications')

  // Create Messages
  await prisma.message.createMany({
    data: [
      {
        senderId: teacher1.id,
        receiverId: parent1.id,
        title: 'Parent-Teacher Meeting',
        content: 'Dear Mrs. Smith, I would like to schedule a meeting to discuss Alex\'s progress in mathematics. Please let me know your availability.',
      },
      {
        senderId: parent2.id,
        receiverId: teacher2.id,
        title: 'Concern about Emma\'s Attendance',
        content: 'Dear Mr. Wilson, I noticed Emma was marked absent on January 16. She was actually sick that day. Please update her attendance record.',
      },
      {
        senderId: teacher3.id,
        classId: class3.id,
        title: 'Field Trip Permission',
        content: 'Dear Grade 11 Geography students, we have a field trip planned for next week. Please ensure your permission forms are signed and returned.',
      },
    ],
  })

  console.log('✅ Created messages')

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`- Districts: 2`)
  console.log(`- Schools: 3`)
  console.log(`- Teachers: 3`)
  console.log(`- Parents: 3`)
  console.log(`- Students: 5`)
  console.log(`- Classes: 3`)
  console.log(`- Lessons: 3`)
  console.log(`- Assessments: 2`)
  console.log(`- Attendance Records: 5`)
  console.log(`- Notifications: 4`)
  console.log(`- Messages: 3`)
  console.log('\n🔑 Demo Login Credentials:')
  console.log('Teachers:')
  console.log('  - sarah.johnson@rivoniaprimary.co.za / password123')
  console.log('  - mike.wilson@seapointhigh.co.za / password123')
  console.log('  - thabo.mthembu@sowetosecondary.co.za / password123')
  console.log('Parents:')
  console.log('  - jane.smith@email.com / password123')
  console.log('  - david.brown@email.com / password123')
  console.log('  - nomfundo.ndlovu@email.com / password123')
  console.log('Students:')
  console.log('  - alex.smith@student.co.za / password123')
  console.log('  - emma.brown@student.co.za / password123')
  console.log('  - sipho.ndlovu@student.co.za / password123')
  console.log('  - lisa.johnson@student.co.za / password123')
  console.log('  - tom.wilson@student.co.za / password123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
