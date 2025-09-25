import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { toast } from '@/hooks/use-toast'

// User hooks
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiClient.get('/users')
      return response.data
    },
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiClient.post('/users', userData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast({
        title: "Success",
        description: "User created successfully",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create user",
        variant: "destructive",
      })
    },
  })
}

// Class hooks
export function useClasses() {
  return useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const response = await apiClient.get('/classes')
      return response.data
    },
  })
}

export function useClass(id: string) {
  return useQuery({
    queryKey: ['classes', id],
    queryFn: async () => {
      const response = await apiClient.get(`/classes/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export function useCreateClass() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (classData: any) => {
      const response = await apiClient.post('/classes', classData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      toast({
        title: "Success",
        description: "Class created successfully",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create class",
        variant: "destructive",
      })
    },
  })
}

// Lesson hooks
export function useLessons(classId?: string) {
  return useQuery({
    queryKey: ['lessons', classId],
    queryFn: async () => {
      const url = classId ? `/lessons?classId=${classId}` : '/lessons'
      const response = await apiClient.get(url)
      return response.data
    },
  })
}

export function useLesson(id: string) {
  return useQuery({
    queryKey: ['lessons', id],
    queryFn: async () => {
      const response = await apiClient.get(`/lessons/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export function useCreateLesson() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (lessonData: any) => {
      const response = await apiClient.post('/lessons', lessonData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
      toast({
        title: "Success",
        description: "Lesson created successfully",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create lesson",
        variant: "destructive",
      })
    },
  })
}

// Assessment hooks
export function useAssessments(classId?: string) {
  return useQuery({
    queryKey: ['assessments', classId],
    queryFn: async () => {
      const url = classId ? `/assessments?classId=${classId}` : '/assessments'
      const response = await apiClient.get(url)
      return response.data
    },
  })
}

export function useAssessment(id: string) {
  return useQuery({
    queryKey: ['assessments', id],
    queryFn: async () => {
      const response = await apiClient.get(`/assessments/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export function useCreateAssessment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (assessmentData: any) => {
      const response = await apiClient.post('/assessments', assessmentData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] })
      toast({
        title: "Success",
        description: "Assessment created successfully",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create assessment",
        variant: "destructive",
      })
    },
  })
}

// Attendance hooks
export function useAttendance(classId?: string, date?: string) {
  return useQuery({
    queryKey: ['attendance', classId, date],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (classId) params.append('classId', classId)
      if (date) params.append('date', date)
      
      const response = await apiClient.get(`/attendance?${params.toString()}`)
      return response.data
    },
  })
}

export function useMarkAttendance() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (attendanceData: any) => {
      const response = await apiClient.post('/attendance', attendanceData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
      toast({
        title: "Success",
        description: "Attendance marked successfully",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to mark attendance",
        variant: "destructive",
      })
    },
  })
}

// School hooks
export function useSchools() {
  return useQuery({
    queryKey: ['schools'],
    queryFn: async () => {
      const response = await apiClient.get('/schools')
      return response.data
    },
  })
}

export function useCreateSchool() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (schoolData: any) => {
      const response = await apiClient.post('/schools', schoolData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] })
      toast({
        title: "Success",
        description: "School created successfully",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create school",
        variant: "destructive",
      })
    },
  })
}

// Notification hooks
export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await apiClient.get('/notifications')
      return response.data
    },
  })
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await apiClient.patch(`/notifications/${notificationId}/read`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

// Export hooks
export function useExportData() {
  return useMutation({
    mutationFn: async (exportData: any) => {
      const response = await apiClient.post('/export', exportData, {
        responseType: 'blob',
      })
      return response.data
    },
    onSuccess: (data, variables) => {
      // Create download link
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `export.${variables.format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      
      toast({
        title: "Success",
        description: "Data exported successfully",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to export data",
        variant: "destructive",
      })
    },
  })
}
