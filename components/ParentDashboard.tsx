'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Calendar, 
  Bell, 
  Settings,
  Heart,
  TrendingUp,
  Award,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Target
} from 'lucide-react'

export default function ParentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [eventStates, setEventStates] = useState({
    meeting: 'scheduled',
    project: 'pending',
    sports: 'upcoming'
  })

  const handleMessageTeacher = () => {
    toast({
      title: "Message Teacher",
      description: "Opening message composer to contact your child's teacher. Stay connected!",
    })
  }

  const handleScheduleMeeting = () => {
    toast({
      title: "Schedule Meeting",
      description: "Opening calendar to schedule a parent-teacher meeting. Choose your preferred time.",
    })
  }

  const handleViewReportCard = () => {
    toast({
      title: "View Report Card",
      description: "Opening your child's academic report card. Great progress this term!",
    })
  }

  const handleSetGoals = () => {
    toast({
      title: "Set Goals",
      description: "Opening goal-setting tool to help your child achieve their academic targets.",
    })
  }

  const handleViewDetails = (event: string) => {
    toast({
      title: "Event Details",
      description: `Opening detailed information about ${event}. All the details you need!`,
    })
  }

  const handleRemindChild = () => {
    toast({
      title: "Reminder Sent",
      description: "Reminder sent to your child about the upcoming Science project deadline.",
    })
  }

  const handleRSVP = () => {
    setEventStates(prev => ({
      ...prev,
      sports: 'confirmed'
    }))
    
    toast({
      title: "RSVP Confirmed",
      description: "Successfully RSVP'd for School Sports Day. Looking forward to seeing you there!",
    })
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const userName = session.user.name || 'Parent'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">LenoDigital</span>
              <Badge className="ml-3 bg-green-100 text-green-800">Parent Portal</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {userName}</span>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Parent Dashboard
          </h1>
          <p className="text-gray-600">
            Stay connected with your child's education and track their progress.
          </p>
        </div>

        {/* Children Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Alex Smith</h3>
                  <p className="text-sm text-gray-600">Grade 6 • Rivonia Primary School</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Average</span>
                  <span className="font-semibold text-green-600">85%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Attendance</span>
                  <span className="font-semibold text-blue-600">96%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Assignments Completed</span>
                  <span className="font-semibold text-purple-600">23/25</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Lisa Johnson</h3>
                  <p className="text-sm text-gray-600">Grade 6 • Rivonia Primary School</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Average</span>
                  <span className="font-semibold text-green-600">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Attendance</span>
                  <span className="font-semibold text-blue-600">100%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Assignments Completed</span>
                  <span className="font-semibold text-purple-600">25/25</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span>Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Alex - Excellent Math Grade</h3>
                        <p className="text-sm text-gray-600">Scored 95% on Fractions Quiz</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Today</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Lisa - Assignment Submitted</h3>
                        <p className="text-sm text-gray-600">Science Project on Plant Life</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Yesterday</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Alex - Attendance Marked</h3>
                        <p className="text-sm text-gray-600">Present for all classes today</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">2 days ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                      <h3 className="font-semibold">Parent-Teacher Meeting</h3>
                      <p className="text-sm text-gray-600">Scheduled with Ms. Johnson • Jan 25, 2024</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleViewDetails('Parent-Teacher Meeting')}>View Details</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <h3 className="font-semibold">Science Project Due</h3>
                      <p className="text-sm text-gray-600">Alex's Plant Life Project • Jan 30, 2024</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleRemindChild}>Remind Child</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <h3 className="font-semibold">School Sports Day</h3>
                      <p className="text-sm text-gray-600">Annual Sports Event • Feb 15, 2024</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleRSVP}>RSVP</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Academic Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Academic Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Mathematics</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Science</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>English</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>History</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-green-600" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Award className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Great job Alex!</p>
                    <p className="text-xs text-gray-600">Improved math grade by 10%</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Message from teacher</p>
                    <p className="text-xs text-gray-600">Ms. Johnson sent a note about Alex's progress</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Assignment reminder</p>
                    <p className="text-xs text-gray-600">Science project due in 3 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-green-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" onClick={handleMessageTeacher}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Teacher
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={handleScheduleMeeting}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={handleViewReportCard}>
                  <FileText className="h-4 w-4 mr-2" />
                  View Report Card
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={handleSetGoals}>
                  <Target className="h-4 w-4 mr-2" />
                  Set Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
