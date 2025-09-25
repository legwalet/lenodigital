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
  Trophy, 
  Calendar, 
  Bell, 
  Star, 
  Target, 
  Play, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  Gamepad2,
  Sparkles,
  Rocket,
  Heart
} from 'lucide-react'

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [lessonStates, setLessonStates] = useState({
    math: 'ready',
    science: 'in-progress', 
    english: 'upcoming'
  })

  const handleStartLesson = (lesson: string) => {
    setLessonStates(prev => ({
      ...prev,
      [lesson]: 'in-progress'
    }))
    
    toast({
      title: "🎉 Lesson Started!",
      description: `Great job starting your ${lesson} lesson! Keep up the awesome work!`,
    })
  }

  const handleContinueLesson = (lesson: string) => {
    toast({
      title: "📚 Continuing Lesson",
      description: `Welcome back to your ${lesson} lesson! You're doing amazing!`,
    })
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-lg text-purple-600">Loading your awesome dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const userName = session.user.name || 'Student'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Fun Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Gamepad2 className="h-8 w-8 text-white" />
                <Sparkles className="h-6 w-6 text-yellow-300" />
              </div>
              <span className="ml-2 text-2xl font-bold text-white">LenoDigital</span>
              <Badge className="ml-3 bg-yellow-400 text-purple-800">Student Zone</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-200" />
                <span className="text-sm text-white">Hey {userName.split(' ')[0]}! 👋</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => signOut()} className="bg-white/20 border-white text-white hover:bg-white/30">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Welcome to Your Learning Adventure! 🚀
          </h1>
          <p className="text-lg text-gray-600">
            Ready to explore, learn, and have fun? Let's make today amazing!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Points Earned</p>
                  <p className="text-3xl font-bold">1,250</p>
                </div>
                <Trophy className="h-12 w-12 text-yellow-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Lessons Completed</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Current Streak</p>
                  <p className="text-3xl font-bold">7 days</p>
                </div>
                <Rocket className="h-12 w-12 text-pink-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-400 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Average Grade</p>
                  <p className="text-3xl font-bold">85%</p>
                </div>
                <Star className="h-12 w-12 text-yellow-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Lessons */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-6 w-6" />
                  <span>Today's Learning Adventure</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Mathematics: Fractions</h3>
                        <p className="text-sm text-gray-600">Grade 6 • 45 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">Ready</Badge>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" onClick={() => handleStartLesson('math')}>
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Science: Plant Life</h3>
                        <p className="text-sm text-gray-600">Grade 6 • 30 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                      <Button size="sm" variant="outline" onClick={() => handleContinueLesson('science')}>
                        <Clock className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">English: Creative Writing</h3>
                        <p className="text-sm text-gray-600">Grade 6 • 60 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
                      <Button size="sm" variant="outline" disabled>
                        <Clock className="h-4 w-4 mr-2" />
                        Starts at 2:00 PM
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-600">
                  <Target className="h-5 w-5" />
                  <span>Your Progress</span>
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

            {/* Achievements */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-600">
                  <Trophy className="h-5 w-5" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="font-semibold text-sm">Math Master</p>
                    <p className="text-xs text-gray-600">Completed 10 math lessons</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <Star className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-semibold text-sm">Perfect Score</p>
                    <p className="text-xs text-gray-600">Got 100% on Science quiz</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <Rocket className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="font-semibold text-sm">Week Warrior</p>
                    <p className="text-xs text-gray-600">7-day learning streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-600">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">New lesson available!</p>
                    <p className="text-xs text-gray-600">Creative Writing starts at 2 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Assignment due soon</p>
                    <p className="text-xs text-gray-600">Science project due tomorrow</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Trophy className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Congratulations!</p>
                    <p className="text-xs text-gray-600">You earned 50 points today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
