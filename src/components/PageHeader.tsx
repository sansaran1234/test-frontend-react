import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  action?: {
    to: string
    label: React.ReactNode
    icon?: React.ReactNode
  }
}

export const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle ? <p className="text-muted-foreground mt-1">{subtitle}</p> : null}
      </div>
      {action ? (
        <Link to={action.to} className={cn(buttonVariants({ variant: 'default' }))}>
          {action.icon}
          {action.label}
        </Link>
      ) : null}
    </div>
  )
}

