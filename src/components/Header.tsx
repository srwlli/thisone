'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, Home, User, Settings, Info, X } from "lucide-react"

export default function Header() {
  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'About', href: '/about', icon: Info }
  ]
  
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center">
        
        {/* Mobile Hamburger - Bigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              className="mr-2 lg:hidden p-4 [&>svg]:!w-8 [&>svg]:!h-8"
              aria-label="Open navigation menu"
            >
              <Menu className="h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            {/* Header Section */}
            <div className="flex items-center justify-between p-6 border-b">
              <SheetTitle className="text-xl font-bold">Navigation</SheetTitle>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex flex-col p-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-4 rounded-lg px-4 py-4 text-lg font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon className="h-6 w-6" />
                    {item.name}
                  </a>
                )
              })}
            </nav>
            
            {/* Footer Section */}
            <div className="mt-auto p-6 border-t">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">My App</p>
                <p>Version 1.0.0</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation - Improved */}
        <nav className="hidden lg:flex gap-1 mr-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Button 
                key={item.name} 
                variant="ghost" 
                asChild 
                className="gap-2 font-medium"
              >
                <a href={item.href}>
                  <Icon className="h-4 w-4" />
                  {item.name}
                </a>
              </Button>
            )
          })}
        </nav>

        {/* App Title - Right aligned */}
        <div className="flex-1 text-right">
          <h1 className="text-2xl lg:text-xl font-bold">My App</h1>
        </div>
      </div>
    </header>
  )
}