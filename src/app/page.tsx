// src/app/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Template</h1>
        <p className="text-xl text-muted-foreground">Discover amazing features and get started today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>
              Track your performance with real-time analytics and insights
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Get detailed reports, visualizations, and actionable data to help grow your business.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View Dashboard</Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Team Collaboration</CardTitle>
            <CardDescription>
              Work together seamlessly with your team members
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Share projects, communicate in real-time, and manage tasks efficiently.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Learn More</Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Security & Privacy</CardTitle>
            <CardDescription>
              Your data is protected with enterprise-grade security
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              End-to-end encryption, secure backups, and compliance with industry standards.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Security Details</Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Mobile App</CardTitle>
            <CardDescription>
              Access your workspace anywhere, anytime
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Native iOS and Android apps with offline support and push notifications.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Download App</Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>API Integration</CardTitle>
            <CardDescription>
              Connect with your favorite tools and services
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              RESTful API, webhooks, and pre-built integrations with popular platforms.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View API Docs</Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>24/7 Support</CardTitle>
            <CardDescription>
              Get help whenever you need it from our expert team
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Live chat, email support, and comprehensive documentation to help you succeed.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Contact Support</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}