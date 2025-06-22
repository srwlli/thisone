import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Header() {
  const navItems = ['Home', 'Profile', 'Settings', 'About']
  
  return (
    <header className="sticky top-0 z-50 bg-background border-b px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center">
        {/* Mobile Hamburger - Left */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 lg:hidden p-4 [&>svg]:!w-10 [&>svg]:!h-10">
              <Menu className="h-10 w-10" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle className="text-lg font-semibold mb-6">Navigation</SheetTitle>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Button key={item} variant="ghost" asChild className="justify-start">
                  <a href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}>{item}</a>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation - Left */}
        <nav className="hidden lg:flex gap-4 mr-4">
          {navItems.map((item) => (
            <Button key={item} variant="ghost" asChild>
              <a href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}>{item}</a>
            </Button>
          ))}
        </nav>

        {/* Right-aligned App Title */}
        <div className="flex-1 text-right">
          <h1 className="text-2xl lg:text-xl font-bold">My App</h1>
        </div>
      </div>
    </header>
  )
}