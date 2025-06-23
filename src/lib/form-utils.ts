import { useState, useCallback } from 'react'
import { FormState, ValidationError } from './types'
import { validateEmail, validatePassword, validateRequired, validateLength } from './errors'

// Custom hook for form state management
export function useFormState<T extends Record<string, any>>(
  initialData: T,
  validators?: Partial<Record<keyof T, (value: any) => ValidationError | null>>
) {
  const [formState, setFormState] = useState<FormState<T>>({
    data: initialData,
    errors: {},
    isSubmitting: false,
    isValid: true
  })

  const updateField = useCallback((field: keyof T, value: any) => {
    setFormState(prev => {
      const newData = { ...prev.data, [field]: value }
      const newErrors = { ...prev.errors }
      
      // Clear error for this field
      delete newErrors[field as string]
      
      // Validate if validator exists
      if (validators?.[field]) {
        const error = validators[field]!(value)
        if (error) {
          newErrors[field as string] = error.message
        }
      }
      
      const isValid = Object.keys(newErrors).length === 0
      
      return {
        ...prev,
        data: newData,
        errors: newErrors,
        isValid
      }
    })
  }, [validators])

  const setError = useCallback((field: keyof T, message: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field as string]: message },
      isValid: false
    }))
  }, [])

  const clearErrors = useCallback(() => {
    setFormState(prev => ({
      ...prev,
      errors: {},
      isValid: true
    }))
  }, [])

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState(prev => ({ ...prev, isSubmitting }))
  }, [])

  const validateAll = useCallback(() => {
    if (!validators) return true
    
    const errors: Record<string, string> = {}
    let isValid = true
    
    Object.keys(validators).forEach(field => {
      const validator = validators[field as keyof T]
      if (validator) {
        const error = validator(formState.data[field as keyof T])
        if (error) {
          errors[field] = error.message
          isValid = false
        }
      }
    })
    
    setFormState(prev => ({ ...prev, errors, isValid }))
    return isValid
  }, [validators, formState.data])

  const reset = useCallback(() => {
    setFormState({
      data: initialData,
      errors: {},
      isSubmitting: false,
      isValid: true
    })
  }, [initialData])

  return {
    ...formState,
    updateField,
    setError,
    clearErrors,
    setSubmitting,
    validateAll,
    reset
  }
}

// Pre-built validators for common use cases
export const CommonValidators = {
  email: (value: string) => validateEmail(value),
  password: (value: string) => validatePassword(value),
  required: (fieldName: string) => (value: string) => validateRequired(value, fieldName),
  minLength: (fieldName: string, min: number) => (value: string) => 
    validateLength(value, fieldName, min),
  maxLength: (fieldName: string, max: number) => (value: string) => 
    validateLength(value, fieldName, undefined, max),
  length: (fieldName: string, min: number, max: number) => (value: string) => 
    validateLength(value, fieldName, min, max)
}

// Form submission helper
export async function handleFormSubmission<T>(
  formState: FormState<T>,
  submitFn: (data: T) => Promise<void>,
  setSubmitting: (loading: boolean) => void,
  onSuccess?: () => void,
  onError?: (error: string) => void
) {
  if (!formState.isValid || formState.isSubmitting) {
    return
  }

  setSubmitting(true)
  
  try {
    await submitFn(formState.data)
    onSuccess?.()
  } catch (error: any) {
    const message = error?.message || 'An unexpected error occurred'
    onError?.(message)
  } finally {
    setSubmitting(false)
  }
}

// Utility to convert form data to clean object
export function cleanFormData<T extends Record<string, any>>(data: T): T {
  const cleaned = {} as T
  
  Object.keys(data).forEach(key => {
    const value = data[key]
    if (typeof value === 'string') {
      cleaned[key as keyof T] = value.trim() as T[keyof T]
    } else {
      cleaned[key as keyof T] = value
    }
  })
  
  return cleaned
}