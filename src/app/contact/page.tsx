// src/app/contact/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, CommonValidators } from '@/lib/form-utils'
import { ErrorDisplay, FieldError } from '@/components/ui/error-display'
import { ContactForm, AppError } from '@/lib/types'

export default function ContactPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState<AppError | null>(null)
  
  const contactForm = useFormState<ContactForm>(
    { name: '', email: '', subject: '', message: '' },
    {
      name: CommonValidators.required('Name'),
      email: CommonValidators.email,
      subject: CommonValidators.required('Subject'),
      message: CommonValidators.required('Message')
    }
  )
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    
    if (!contactForm.validateAll()) {
      return
    }
    
    contactForm.setSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would send the form data to your API
      console.log('Contact form submitted:', contactForm.data)
      
      setSubmitStatus('success')
      contactForm.reset()
    } catch (error: any) {
      setSubmitStatus('error')
      setSubmitError({
        code: 'FORM_SUBMISSION_ERROR',
        message: 'Failed to send message. Please try again.',
        timestamp: new Date().toISOString()
      })
    } finally {
      contactForm.setSubmitting(false)
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions about our platform or ready to start your project? 
          We'd love to hear from you and discuss how we can help bring your ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">Message sent successfully!</p>
                <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            )}
            {submitError && (
              <ErrorDisplay error={submitError} className="mb-4" />
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe"
                  value={contactForm.data.name}
                  onChange={(e) => contactForm.updateField('name', e.target.value)}
                  disabled={contactForm.isSubmitting}
                />
                <FieldError error={contactForm.errors.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com"
                  value={contactForm.data.email}
                  onChange={(e) => contactForm.updateField('email', e.target.value)}
                  disabled={contactForm.isSubmitting}
                />
                <FieldError error={contactForm.errors.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="How can we help you?"
                  value={contactForm.data.subject}
                  onChange={(e) => contactForm.updateField('subject', e.target.value)}
                  disabled={contactForm.isSubmitting}
                />
                <FieldError error={contactForm.errors.subject} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  className="w-full min-h-32 border border-input rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder="Tell us about your project or question..."
                  value={contactForm.data.message}
                  onChange={(e) => contactForm.updateField('message', e.target.value)}
                  disabled={contactForm.isSubmitting}
                />
                <FieldError error={contactForm.errors.message} />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={contactForm.isSubmitting || !contactForm.isValid}
              >
                {contactForm.isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Multiple ways to reach our team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">@</span>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">hello@template.com</p>
                  <p className="text-xs text-muted-foreground">We respond within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">💻</span>
                </div>
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">Available Monday - Friday</p>
                  <p className="text-xs text-muted-foreground">9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">📞</span>
                </div>
                <div>
                  <p className="font-medium">Schedule a Call</p>
                  <p className="text-sm text-muted-foreground">Book a consultation</p>
                  <p className="text-xs text-muted-foreground">30-minute strategy session</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common requests and helpful resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Request a Demo
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Technical Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Partnership Inquiries
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Documentation
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-sm">How quickly can you start a project?</p>
                <p className="text-xs text-muted-foreground mt-1">
                  We typically begin new projects within 1-2 weeks of agreement.
                </p>
              </div>
              <div>
                <p className="font-medium text-sm">Do you offer ongoing support?</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Yes, we provide maintenance and support packages for all projects.
                </p>
              </div>
              <div>
                <p className="font-medium text-sm">Can you work with our existing team?</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Absolutely! We collaborate seamlessly with in-house development teams.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}