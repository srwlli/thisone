import { AppError } from '@/lib/types'
import { getErrorMessage, isNetworkError, isAuthError } from '@/lib/errors'
import { AlertCircle, Wifi, Lock } from 'lucide-react'

interface ErrorDisplayProps {
  error: AppError | string | null
  className?: string
  showIcon?: boolean
}

export function ErrorDisplay({ error, className = '', showIcon = true }: ErrorDisplayProps) {
  if (!error) return null

  const errorMessage = typeof error === 'string' ? error : getErrorMessage(error)
  const isNetwork = typeof error !== 'string' && isNetworkError(error)
  const isAuth = typeof error !== 'string' && isAuthError(error)

  const getIcon = () => {
    if (isNetwork) return <Wifi className="h-4 w-4" />
    if (isAuth) return <Lock className="h-4 w-4" />
    return <AlertCircle className="h-4 w-4" />
  }

  return (
    <div className={`flex items-center gap-2 text-sm text-destructive ${className}`}>
      {showIcon && getIcon()}
      <span>{errorMessage}</span>
    </div>
  )
}

interface FieldErrorProps {
  error?: string
  className?: string
}

export function FieldError({ error, className = '' }: FieldErrorProps) {
  if (!error) return null

  return (
    <div className={`text-sm text-destructive ${className}`}>
      {error}
    </div>
  )
}