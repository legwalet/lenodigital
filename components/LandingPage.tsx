'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, BarChart3, Shield, Smartphone, Globe, Heart } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">LenoDigital</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting Education
              <span className="text-blue-600 block">Digitally</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A comprehensive platform connecting Teachers, Parents, and Students to deliver curriculum content, 
              manage assessments and attendance, and provide administrators with digital reporting for South African schools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Digital Education
            </h2>
            <p className="text-xl text-gray-600">
              Streamline your school's digital transformation with our comprehensive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Comprehensive role-based access for Teachers, Parents, Students, and Administrators
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Lesson Management</CardTitle>
                <CardDescription>
                  Create rich lessons with text, videos, and attachments. Schedule and assign to classes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Assessment Engine</CardTitle>
                <CardDescription>
                  Build assessments with multiple choice, short answers, and file uploads. Auto-grade objective items
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Attendance Tracking</CardTitle>
                <CardDescription>
                  Mark attendance per lesson and per day with comprehensive reporting
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Export & Reporting</CardTitle>
                <CardDescription>
                  Export data in CSV, Excel, PDF formats for national submissions and compliance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Smartphone className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Offline Support</CardTitle>
                <CardDescription>
                  PWA capabilities for offline lesson access in low-connectivity environments
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Login Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Try LenoDigital Now
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the platform with our demo accounts
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Teacher Demo</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Experience lesson creation, student management, and grading tools
                </p>
                <div className="space-y-2 text-sm text-blue-100">
                  <p><strong>Email:</strong> sarah.johnson@rivoniaprimary.co.za</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
                <Link href="/auth/signin">
                  <Button className="w-full mt-4 bg-white text-blue-600 hover:bg-blue-50">
                    Sign In as Teacher
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Student Demo</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Explore fun lessons, track progress, and earn achievements
                </p>
                <div className="space-y-2 text-sm text-blue-100">
                  <p><strong>Email:</strong> alex.smith@student.co.za</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
                <Link href="/auth/signin">
                  <Button className="w-full mt-4 bg-white text-purple-600 hover:bg-purple-50">
                    Sign In as Student
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Parent Demo</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Monitor your child's progress and stay connected with teachers
                </p>
                <div className="space-y-2 text-sm text-blue-100">
                  <p><strong>Email:</strong> jane.smith@email.com</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
                <Link href="/auth/signin">
                  <Button className="w-full mt-4 bg-white text-green-600 hover:bg-green-50">
                    Sign In as Parent
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold">LenoDigital</span>
            </div>
            <div className="text-gray-400">
              © 2024 LenoDigital. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
