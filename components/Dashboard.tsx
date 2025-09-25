'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import StudentDashboard from './StudentDashboard'
import TeacherDashboard from './TeacherDashboard'
import ParentDashboard from './ParentDashboard'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const userRole = session.user.role

  // Route to appropriate dashboard based on user role
  switch (userRole) {
    case 'STUDENT':
      return <StudentDashboard />
    case 'TEACHER':
      return <TeacherDashboard />
    case 'PARENT':
      return <ParentDashboard />
    default:
      return <TeacherDashboard /> // Default fallback
  }
}