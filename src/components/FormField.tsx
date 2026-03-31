import type * as React from 'react'
import { Label } from '@/components/ui/label'

interface FormFieldProps {
  id: string
  label: React.ReactNode
  error?: string
  children: React.ReactNode
}

export const FormField = ({ id, label, error, children }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
    </div>
  )
}

