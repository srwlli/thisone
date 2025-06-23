import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Template</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern application built with AI assistance, designed to be versatile and easy to adapt 
          for any real-world idea. Experience the future of rapid development.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              We're demonstrating how AI-assisted development can create powerful, scalable applications 
              quickly and efficiently. This foundation is designed to be flexible, allowing you to 
              transform it into any concept - from productivity tools to social platforms, e-commerce 
              to content management systems.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Values Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered</CardTitle>
              <CardDescription>Built with modern AI tools</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Leveraging AI assistance for rapid development, smart architecture decisions, 
                and best practices implementation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Versatile</CardTitle>
              <CardDescription>Adaptable foundation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Clean, modular design that can be easily customized and extended 
                to match your specific business needs and ideas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modern Stack</CardTitle>
              <CardDescription>Latest technologies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with Next.js 15, TypeScript, Tailwind CSS, and Supabase - 
                a production-ready foundation for any application.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Get in Touch</CardTitle>
            <CardDescription>
              Ready to transform this foundation into your vision? Let's discuss your ideas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>Start a Project</Button>
              <Button variant="outline">View Documentation</Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>hello@template.com | Available for consultation</p>
              <p>Transform this demo into your next big idea</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}