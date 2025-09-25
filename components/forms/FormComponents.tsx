'use client'

import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { zodSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  options: { value: string; label: string }[]
  className?: string
}

interface FormProps<T extends FieldValues> {
  schema: any
  onSubmit: (data: T) => void | Promise<void>
  defaultValues?: Partial<T>
  children: (form: UseFormReturn<T>) => ReactNode
  className?: string
  title?: string
  description?: string
  submitText?: string
  isLoading?: boolean
}

export function FormField<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  className,
}: FormFieldProps<T>) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full"
      />
    </div>
  )
}

export function FormSelect<T extends FieldValues>({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  options,
  className,
}: FormSelectProps<T>) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  children,
  className,
  title,
  description,
  submitText = 'Submit',
  isLoading = false,
}: FormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = async (data: T) => {
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const content = (
    <form onSubmit={form.handleSubmit(handleSubmit)} className={cn('space-y-6', className)}>
      {children(form)}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Submitting...' : submitText}
      </Button>
    </form>
  )

  if (title || description) {
    return (
      <Card>
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>{content}</CardContent>
      </Card>
    )
  }

  return content
}

// Pre-built form components for common use cases
export function LoginForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading?: boolean }) {
  return (
    <Form
      schema={zodSchema.loginSchema}
      onSubmit={onSubmit}
      title="Sign In"
      description="Enter your credentials to access your account"
      submitText="Sign In"
      isLoading={isLoading}
    >
      {(form) => (
        <>
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </>
      )}
    </Form>
  )
}

export function RegisterForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading?: boolean }) {
  return (
    <Form
      schema={zodSchema.registerSchema}
      onSubmit={onSubmit}
      title="Create Account"
      description="Join LenoDigital and transform your educational experience"
      submitText="Create Account"
      isLoading={isLoading}
    >
      {(form) => (
        <>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="firstName"
              label="First Name"
              placeholder="John"
              required
            />
            <FormField
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              required
            />
          </div>
          
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            required
          />

          <FormSelect
            name="role"
            label="Role"
            placeholder="Select your role"
            required
            options={[
              { value: 'TEACHER', label: 'Teacher' },
              { value: 'PARENT', label: 'Parent' },
              { value: 'STUDENT', label: 'Student' },
              { value: 'SCHOOL_ADMIN', label: 'School Admin' },
              { value: 'DISTRICT_ADMIN', label: 'District Admin' },
            ]}
          />

          <FormField
            name="phone"
            label="Phone (Optional)"
            type="tel"
            placeholder="+27 12 345 6789"
          />

          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            required
          />

          <FormField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            required
          />
        </>
      )}
    </Form>
  )
}

export function LessonForm({ onSubmit, isLoading, defaultValues }: { 
  onSubmit: (data: any) => void
  isLoading?: boolean
  defaultValues?: any
}) {
  return (
    <Form
      schema={zodSchema.lessonSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      title="Create Lesson"
      description="Create a new lesson with content, videos, and attachments"
      submitText="Create Lesson"
      isLoading={isLoading}
    >
      {(form) => (
        <>
          <FormField
            name="title"
            label="Lesson Title"
            placeholder="Enter lesson title"
            required
          />
          
          <FormField
            name="description"
            label="Description"
            placeholder="Brief description of the lesson"
          />

          <FormField
            name="videoUrl"
            label="Video URL"
            type="url"
            placeholder="https://example.com/video.mp4"
          />

          <FormField
            name="scheduledAt"
            label="Scheduled Date"
            type="datetime-local"
          />
        </>
      )}
    </Form>
  )
}

export function AssessmentForm({ onSubmit, isLoading, defaultValues }: { 
  onSubmit: (data: any) => void
  isLoading?: boolean
  defaultValues?: any
}) {
  return (
    <Form
      schema={zodSchema.assessmentSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      title="Create Assessment"
      description="Create a new assessment with questions and settings"
      submitText="Create Assessment"
      isLoading={isLoading}
    >
      {(form) => (
        <>
          <FormField
            name="title"
            label="Assessment Title"
            placeholder="Enter assessment title"
            required
          />
          
          <FormField
            name="description"
            label="Description"
            placeholder="Brief description of the assessment"
          />

          <FormSelect
            name="type"
            label="Assessment Type"
            placeholder="Select assessment type"
            required
            options={[
              { value: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
              { value: 'SHORT_ANSWER', label: 'Short Answer' },
              { value: 'FILE_UPLOAD', label: 'File Upload' },
              { value: 'ESSAY', label: 'Essay' },
            ]}
          />

          <FormField
            name="dueDate"
            label="Due Date"
            type="datetime-local"
          />

          <FormField
            name="timeLimit"
            label="Time Limit (minutes)"
            type="number"
            placeholder="60"
          />

          <FormField
            name="maxAttempts"
            label="Maximum Attempts"
            type="number"
            placeholder="1"
          />
        </>
      )}
    </Form>
  )
}
