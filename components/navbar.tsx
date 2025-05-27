"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Check if we're on a detail page
  const isDetailPage = pathname.includes('/project/') || pathname.includes('/achievement/') || pathname.includes('/experience/')

  // Scroll to FullPageScroll sections by index
  const scrollToSection = (index: number) => {
    setIsOpen(false)
    const container = document.getElementById('fullpage-container')
    if (container && container.children[index]) {
      const targetElement = container.children[index] as HTMLElement
      const navbarHeight = 64 // h-16 = 64px
      const elementPosition = targetElement.offsetTop
      const offsetPosition = elementPosition - navbarHeight

      container.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const navItems = ["Home", "Achievements", "Experience", "Projects", "Contact"]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 no-scrollbar",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => scrollToSection(0)}
            className="text-xl font-bold tracking-tighter transition-colors cursor-pointer bg-transparent border-none p-0 m-0"
          >
            Portfolio
          </button>


          {/* Desktop Navigation */}
          {!isDetailPage && (
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((name, index) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => scrollToSection(index)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary text-muted-foreground",
                  )}
                >
                  {name}
                </button>
              ))}
              <ModeToggle />
            </nav>
          )}

          {/* Mode toggle for detail pages */}
          {isDetailPage && (
            <div className="hidden md:flex">
              <ModeToggle />
            </div>
          )}

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <ModeToggle />
            {!isDetailPage && (
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && !isDetailPage && (
        <div className="md:hidden border-b">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navItems.map((name, index) => (
              <button
                key={name}
                type="button"
                onClick={() => scrollToSection(index)}
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground",
                )}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
