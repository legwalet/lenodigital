'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ChartProps {
  data: any[]
  type: 'bar' | 'line' | 'pie' | 'area'
  title?: string
  description?: string
  dataKey: string
  xAxisKey?: string
  yAxisKey?: string
  color?: string
  height?: number
  className?: string
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4']

export function Chart({
  data,
  type,
  title,
  description,
  dataKey,
  xAxisKey = 'name',
  yAxisKey = 'value',
  color = '#3b82f6',
  height = 300,
  className,
}: ChartProps) {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={yAxisKey} fill={color} />
          </BarChart>
        )

      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={yAxisKey} stroke={color} strokeWidth={2} />
          </LineChart>
        )

      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={yAxisKey} stroke={color} fill={color} fillOpacity={0.3} />
          </AreaChart>
        )

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={yAxisKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )

      default:
        return null
    }
  }

  if (title || description) {
    return (
      <Card className={className}>
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          <ResponsiveContainer width="100%" height={height}>
            {renderChart()}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}

// Predefined chart components for common use cases
export function AttendanceChart({ data, className }: { data: any[]; className?: string }) {
  return (
    <Chart
      data={data}
      type="bar"
      title="Attendance Overview"
      description="Daily attendance statistics"
      dataKey="attendance"
      xAxisKey="date"
      yAxisKey="count"
      color="#10b981"
      className={className}
    />
  )
}

export function GradeDistributionChart({ data, className }: { data: any[]; className?: string }) {
  return (
    <Chart
      data={data}
      type="pie"
      title="Grade Distribution"
      description="Distribution of student grades"
      dataKey="count"
      className={className}
    />
  )
}

export function PerformanceTrendChart({ data, className }: { data: any[]; className?: string }) {
  return (
    <Chart
      data={data}
      type="line"
      title="Performance Trend"
      description="Student performance over time"
      dataKey="average"
      xAxisKey="month"
      yAxisKey="score"
      color="#3b82f6"
      className={className}
    />
  )
}

export function SubjectComparisonChart({ data, className }: { data: any[]; className?: string }) {
  return (
    <Chart
      data={data}
      type="bar"
      title="Subject Performance"
      description="Average scores by subject"
      dataKey="score"
      xAxisKey="subject"
      yAxisKey="average"
      color="#8b5cf6"
      className={className}
    />
  )
}

export function EnrollmentChart({ data, className }: { data: any[]; className?: string }) {
  return (
    <Chart
      data={data}
      type="area"
      title="Enrollment Trends"
      description="Student enrollment over time"
      dataKey="students"
      xAxisKey="year"
      yAxisKey="count"
      color="#f59e0b"
      className={className}
    />
  )
}
