"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
    backHref: string
}

// Custom back navigation function that works with FullPageScroll
const handleBackNavigation = (backHref: string) => {
    // Check if we're navigating to the main page with hash
    if (backHref.startsWith('/#')) {
        // Extract the section name from the hash
        const sectionHash = backHref.substring(2) // Remove "/#"

        // Navigate to main page first
        window.location.href = '/'

        // Wait for navigation to complete, then scroll to the correct section
        const attemptScroll = (attempts = 0) => {
            const maxAttempts = 10

            const sectionMap: { [key: string]: number } = {
                'achievements': 1,
                'experience': 2,
                'projects': 3,
                'contact': 4
            }

            const sectionIndex = sectionMap[sectionHash] || 0
            const container = document.getElementById('fullpage-container')

            if (container && container.children[sectionIndex]) {
                const targetElement = container.children[sectionIndex] as HTMLElement
                const navbarHeight = 64 // h-16 = 64px
                const elementPosition = targetElement.offsetTop
                const offsetPosition = elementPosition - navbarHeight

                container.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            } else if (attempts < maxAttempts) {
                // Retry if the container or section isn't ready yet
                setTimeout(() => attemptScroll(attempts + 1), 200)
            }
        }

        setTimeout(() => attemptScroll(), 300) // Initial delay for navigation
    } else {
        // Regular navigation for non-hash URLs
        window.location.href = backHref
    }
}

export default function BackButton({ backHref }: BackButtonProps) {
    return (
        <Button
            variant="ghost"
            className="mb-6 gap-2 cursor-pointer hover:bg-accent/50 transition-all duration-200 group"
            onClick={() => handleBackNavigation(backHref)}
        >
            <ArrowLeft className="h-4 w-4 group-hover:translate-x-[-2px] transition-transform duration-200 pointer-events-none" />
            <span className="group-hover:text-foreground transition-colors duration-200 pointer-events-none">Back</span>
        </Button>
    )
}
