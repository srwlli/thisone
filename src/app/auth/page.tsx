// src/app/auth/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from '@/lib/supabase'
import { useFormState, CommonValidators } from '@/lib/form-utils'
import { parseSupabaseError } from '@/lib/errors'
import { ErrorDisplay, FieldError } from '@/components/ui/error-display'
import { LoginForm, SignupForm, AppError } from '@/lib/types'

export default function AuthPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [globalError, setGlobalError] = useState<AppError | null>(null)
  const router = useRouter()
  
  // Login form state
  const loginForm = useFormState<LoginForm>(
    { email: '', password: '' },
    {
      email: CommonValidators.email,
      password: CommonValidators.password
    }
  )
  
  // Signup form state
  const signupForm = useFormState<SignupForm>(
    { email: '', password: '', confirmPassword: '', firstName: '', lastName: '' },
    {
      email: CommonValidators.email,
      password: CommonValidators.password,
      firstName: CommonValidators.required('First name'),
      lastName: CommonValidators.required('Last name')
    }
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  // Google OAuth
  const handleGoogleAuth = async () => {
    setGlobalError(null)
    loginForm.setSubmitting(true)
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      })
      if (error) throw error
    } catch (error: any) {
      setGlobalError(parseSupabaseError(error))
    } finally {
      loginForm.setSubmitting(false)
    }
  }

  // Apple OAuth (Note: Apple needs special setup in Supabase dashboard)
  const handleAppleAuth = async () => {
    setGlobalError(null)
    loginForm.setSubmitting(true)
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      })
      if (error) throw error
    } catch (error: any) {
      setGlobalError(parseSupabaseError(error))
    } finally {
      loginForm.setSubmitting(false)
    }
  }

  // Email Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError(null)
    
    if (!loginForm.validateAll()) {
      return
    }
    
    loginForm.setSubmitting(true)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.data.email,
        password: loginForm.data.password,
      })
      
      if (error) throw error
      
      // Redirect to home page on success
      router.push('/')
    } catch (error: any) {
      setGlobalError(parseSupabaseError(error))
    } finally {
      loginForm.setSubmitting(false)
    }
  }

  // Email Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError(null)
    
    // Validate password match
    if (signupForm.data.password !== signupForm.data.confirmPassword) {
      signupForm.setError('confirmPassword', 'Passwords do not match')
      return
    }
    
    if (!signupForm.validateAll()) {
      return
    }
    
    signupForm.setSubmitting(true)
    
    try {
      const { error } = await supabase.auth.signUp({
        email: signupForm.data.email,
        password: signupForm.data.password,
        options: {
          data: {
            first_name: signupForm.data.firstName,
            last_name: signupForm.data.lastName,
            full_name: `${signupForm.data.firstName} ${signupForm.data.lastName}`.trim()
          }
        }
      })
      
      if (error) throw error
      
      // Show success message instead of alert
      setGlobalError(null)
      // TODO: Show success toast or redirect to email verification page
    } catch (error: any) {
      setGlobalError(parseSupabaseError(error))
    } finally {
      signupForm.setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Global Error Display */}
                {globalError && (
                  <ErrorDisplay error={globalError} className="mb-4" />
                )}
                {/* Social Login Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <Card 
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow border-border hover:border-primary/20"
                    onClick={handleGoogleAuth}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-6 h-6">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Google</span>
                    </div>
                  </Card>
                  
                  <Card 
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow border-border hover:border-primary/20"
                    onClick={handleAppleAuth}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-6 h-6">
                          <path fill="currentColor" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Apple</span>
                    </div>
                  </Card>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      value={loginForm.data.email}
                      onChange={(e) => loginForm.updateField('email', e.target.value)}
                      disabled={loginForm.isSubmitting}
                    />
                    <FieldError error={loginForm.errors.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      value={loginForm.data.password}
                      onChange={(e) => loginForm.updateField('password', e.target.value)}
                      disabled={loginForm.isSubmitting}
                    />
                    <FieldError error={loginForm.errors.password} />
                  </div>
                  <Button className="w-full" type="submit" disabled={loginForm.isSubmitting || !loginForm.isValid}>
                    {loginForm.isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
                
                <div className="text-center">
                  <Button variant="link" className="text-sm">
                    Forgot your password?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Create account</CardTitle>
                <CardDescription className="text-center">
                  Enter your information to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Global Error Display */}
                {globalError && (
                  <ErrorDisplay error={globalError} className="mb-4" />
                )}
                {/* Social Login Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <Card 
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow border-border hover:border-primary/20"
                    onClick={handleGoogleAuth}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-6 h-6">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Google</span>
                    </div>
                  </Card>
                  
                  <Card 
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow border-border hover:border-primary/20"
                    onClick={handleAppleAuth}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-6 h-6">
                          <path fill="currentColor" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Apple</span>
                    </div>
                  </Card>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input 
                        id="first-name" 
                        placeholder="John"
                        value={signupForm.data.firstName}
                        onChange={(e) => signupForm.updateField('firstName', e.target.value)}
                        disabled={signupForm.isSubmitting}
                      />
                      <FieldError error={signupForm.errors.firstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input 
                        id="last-name" 
                        placeholder="Doe"
                        value={signupForm.data.lastName}
                        onChange={(e) => signupForm.updateField('lastName', e.target.value)}
                        disabled={signupForm.isSubmitting}
                      />
                      <FieldError error={signupForm.errors.lastName} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      placeholder="name@example.com"
                      type="email"
                      value={signupForm.data.email}
                      onChange={(e) => signupForm.updateField('email', e.target.value)}
                      disabled={signupForm.isSubmitting}
                    />
                    <FieldError error={signupForm.errors.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password"
                      value={signupForm.data.password}
                      onChange={(e) => signupForm.updateField('password', e.target.value)}
                      disabled={signupForm.isSubmitting}
                    />
                    <FieldError error={signupForm.errors.password} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password"
                      value={signupForm.data.confirmPassword}
                      onChange={(e) => signupForm.updateField('confirmPassword', e.target.value)}
                      disabled={signupForm.isSubmitting}
                    />
                    <FieldError error={signupForm.errors.confirmPassword} />
                  </div>
                  <Button className="w-full" type="submit" disabled={signupForm.isSubmitting || !signupForm.isValid}>
                    {signupForm.isSubmitting ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
                
                <div className="text-center text-sm text-muted-foreground">
                  By creating an account, you agree to our{" "}
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Terms of Service
                  </Button>{" "}
                  and{" "}
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Privacy Policy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}