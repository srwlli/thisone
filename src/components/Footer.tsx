// src/components/Footer.tsx
import Link from 'next/link'
import { Home, User, Settings, Info, Mail } from 'lucide-react'

export default function Footer() {
  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail }
  ]

  return (
    <>
      {/* Desktop Footer */}
      <footer className="hidden md:block bg-background border-t px-4 py-6 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              &copy; 2025 Template. All rights reserved.
            </div>
            
            <nav className="flex gap-6 text-sm">
              <Link 
                href="/about" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/about" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/contact" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t">
        <nav className="flex justify-around items-center py-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors min-w-0"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile Footer Spacer */}
      <div className="md:hidden h-16" />
    </>
  )
}