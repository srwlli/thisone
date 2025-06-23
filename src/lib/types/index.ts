// Core User Types
export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  bio?: string
  website?: string
  location?: string
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  notifications: boolean
  emailUpdates: boolean
  language: string
}

// Error Handling Types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp?: string
}

export interface ValidationError {
  field: string
  message: string
}

export interface ApiResponse<T = any> {
  data?: T
  error?: AppError
  success: boolean
}

// Form State Management
export interface FormState<T = any> {
  data: T
  errors: Record<string, string>
  isSubmitting: boolean
  isValid: boolean
}

export interface FormField {
  value: string
  error?: string
  touched: boolean
}

// Authentication Types
export interface LoginForm {
  email: string
  password: string
}

export interface SignupForm extends LoginForm {
  confirmPassword: string
  firstName?: string
  lastName?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: AppError | null
}

// Contact Form Types
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

// Settings Types
export interface UserSettings {
  profile: {
    firstName: string
    lastName: string
    email: string
    bio: string
  }
  preferences: UserPreferences
  account: {
    password: string
    twoFactorEnabled: boolean
  }
}

// API Error Codes
export enum ErrorCode {
  // Authentication
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  WEAK_PASSWORD = 'WEAK_PASSWORD',
  INVALID_EMAIL = 'INVALID_EMAIL',
  
  // Authorization
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  
  // Validation
  REQUIRED_FIELD = 'REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',
  TOO_SHORT = 'TOO_SHORT',
  TOO_LONG = 'TOO_LONG',
  
  // Network
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  TIMEOUT = 'TIMEOUT',
  
  // Generic
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>