import { AppError, ErrorCode, ValidationError } from './types'

// Error creation utilities
export function createError(
  code: ErrorCode,
  message: string,
  details?: any
): AppError {
  return {
    code,
    message,
    details,
    timestamp: new Date().toISOString()
  }
}

// Common error creators
export const AuthErrors = {
  invalidCredentials: () => createError(
    ErrorCode.INVALID_CREDENTIALS,
    'Invalid email or password'
  ),
  
  emailExists: () => createError(
    ErrorCode.EMAIL_ALREADY_EXISTS,
    'An account with this email already exists'
  ),
  
  weakPassword: () => createError(
    ErrorCode.WEAK_PASSWORD,
    'Password must be at least 8 characters long'
  ),
  
  invalidEmail: () => createError(
    ErrorCode.INVALID_EMAIL,
    'Please enter a valid email address'
  ),
  
  unauthorized: () => createError(
    ErrorCode.UNAUTHORIZED,
    'You must be logged in to access this resource'
  ),
  
  sessionExpired: () => createError(
    ErrorCode.SESSION_EXPIRED,
    'Your session has expired. Please log in again'
  )
}

export const ValidationErrors = {
  required: (field: string) => createError(
    ErrorCode.REQUIRED_FIELD,
    `${field} is required`
  ),
  
  tooShort: (field: string, min: number) => createError(
    ErrorCode.TOO_SHORT,
    `${field} must be at least ${min} characters`
  ),
  
  tooLong: (field: string, max: number) => createError(
    ErrorCode.TOO_LONG,
    `${field} must be no more than ${max} characters`
  ),
  
  invalidFormat: (field: string) => createError(
    ErrorCode.INVALID_FORMAT,
    `${field} format is invalid`
  )
}

export const NetworkErrors = {
  timeout: () => createError(
    ErrorCode.TIMEOUT,
    'Request timed out. Please try again'
  ),
  
  serverError: () => createError(
    ErrorCode.SERVER_ERROR,
    'Server error. Please try again later'
  ),
  
  networkError: () => createError(
    ErrorCode.NETWORK_ERROR,
    'Network error. Please check your connection'
  )
}

// Error parsing utilities
export function parseSupabaseError(error: any): AppError {
  if (!error) {
    return createError(ErrorCode.UNKNOWN_ERROR, 'An unknown error occurred')
  }

  // Handle Supabase auth errors
  if (error.message) {
    const message = error.message.toLowerCase()
    
    if (message.includes('invalid login credentials')) {
      return AuthErrors.invalidCredentials()
    }
    
    if (message.includes('user already registered')) {
      return AuthErrors.emailExists()
    }
    
    if (message.includes('password')) {
      return AuthErrors.weakPassword()
    }
    
    if (message.includes('email')) {
      return AuthErrors.invalidEmail()
    }
  }
  
  // Default error
  return createError(
    ErrorCode.UNKNOWN_ERROR,
    error.message || 'An unexpected error occurred'
  )
}

// Form validation utilities
export function validateEmail(email: string): ValidationError | null {
  if (!email) {
    return { field: 'email', message: 'Email is required' }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { field: 'email', message: 'Please enter a valid email address' }
  }
  
  return null
}

export function validatePassword(password: string): ValidationError | null {
  if (!password) {
    return { field: 'password', message: 'Password is required' }
  }
  
  if (password.length < 8) {
    return { field: 'password', message: 'Password must be at least 8 characters' }
  }
  
  return null
}

export function validateRequired(value: string, fieldName: string): ValidationError | null {
  if (!value || value.trim() === '') {
    return { field: fieldName, message: `${fieldName} is required` }
  }
  
  return null
}

export function validateLength(
  value: string, 
  fieldName: string, 
  min?: number, 
  max?: number
): ValidationError | null {
  if (min && value.length < min) {
    return { field: fieldName, message: `${fieldName} must be at least ${min} characters` }
  }
  
  if (max && value.length > max) {
    return { field: fieldName, message: `${fieldName} must be no more than ${max} characters` }
  }
  
  return null
}

// Error display utilities
export function getErrorMessage(error: AppError): string {
  return error.message || 'An unexpected error occurred'
}

export function isNetworkError(error: AppError): boolean {
  return [
    ErrorCode.NETWORK_ERROR,
    ErrorCode.TIMEOUT,
    ErrorCode.SERVER_ERROR
  ].includes(error.code as ErrorCode)
}

export function isAuthError(error: AppError): boolean {
  return [
    ErrorCode.INVALID_CREDENTIALS,
    ErrorCode.UNAUTHORIZED,
    ErrorCode.SESSION_EXPIRED,
    ErrorCode.EMAIL_ALREADY_EXISTS
  ].includes(error.code as ErrorCode)
}