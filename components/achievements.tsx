"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import achievementsData from "@/data/achievements.json"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"
import { SectionTitle } from "@/components/ui/section-title"
import { CarouselPagination } from "@/components/ui/carousel-pagination"
import { AchievementCard } from "@/components/achievement-card"

export default function Achievements({ className = "" }: { className?: string }) {
  const [api, setApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap())
    })

    // Enable autoplay for both mobile and desktop
    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <section className={cn("min-h-screen w-full px-2 py-2 md:py-12", className)}>
      <div className="container px-2 sm:px-6 md:px-4">
        <SectionTitle
          title="Notable Achievements"
          subtitle="Key milestones and recognition throughout my career journey."
          className="ml-4 sm:ml-6 md:ml-0"
        />

        <div className="relative w-full mx-auto max-w-7xl">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full mx-auto"
            setApi={setApi}
          >
            <CarouselContent className="snap-x snap-mandatory md:px-4 gap-x-2 md:gap-x-4">
              {achievementsData.map((achievement, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full flex justify-center pl-4"
                >
                  <div className="w-full">
                    <div className="h-full flex items-center justify-center">
                      <AchievementCard achievement={achievement} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Hide navigation arrows on mobile */}
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-2 md:-left-8 lg:-left-12 z-20">
              <CarouselPrevious
                className="relative h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full"
                aria-label="Previous achievement"
              />
            </div>
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-2 md:-right-8 lg:-right-12 z-20">
              <CarouselNext
                className="relative h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full"
                aria-label="Next achievement"
              />
            </div>
          </Carousel>

          <CarouselPagination
            api={api}
            itemCount={achievementsData.length}
            currentSlide={currentSlide}
          />
        </div>
      </div>
    </section>
  )
}