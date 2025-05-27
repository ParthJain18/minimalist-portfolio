"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import experienceData from "@/data/experience.json"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"
import { CarouselPagination } from "@/components/ui/carousel-pagination"
import { ExperienceCard } from "@/components/experience-card"

export default function ExperienceCarousel({ className = "" }: { className?: string }) {
  const [api, setApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // carousel controls
  useEffect(() => {
    if (!api) return
    api.on("select", () => setCurrentSlide(api.selectedScrollSnap()))
    const interval = setInterval(() => api.scrollNext(), 5000)
    return () => clearInterval(interval)
  }, [api])
  return (
    <div className={cn("w-full flex flex-col items-center justify-center", className)}>
      <div className="relative w-full mx-auto max-w-7xl">
        <Carousel
          opts={{ align: "center", loop: true }}
          className="w-full md:w-5/6 mx-auto relative"
          setApi={setApi}>
          <CarouselContent className="snap-x snap-mandatory md:px-4 gap-x-2 md:gap-x-1">
            {experienceData.map((exp, index) => (
              <CarouselItem
                key={exp.id}
                className="basis-full md:basis-auto flex justify-center items-start pl-4"
              >
                <div className={cn(
                  "w-full flex items-start justify-center transition-transform duration-300",
                  !isMobile && index !== currentSlide && "md:scale-90 md:opacity-75"
                )}>
                  <ExperienceCard experience={exp} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Fade overlay for desktop only */}
          {!isMobile && (
            <>
              <div className="absolute top-0 left-0 w-16 md:w-24 lg:w-32 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-16 md:w-24 lg:w-32 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
            </>
          )}

          {!isMobile && (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-2 md:-left-8 lg:-left-12 z-20">
                <CarouselPrevious
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 lg:h-11 lg:w-11 rounded-full"
                  aria-label="Previous experience"
                />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-2 md:-right-8 lg:-right-12 z-20">
                <CarouselNext
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 lg:h-11 lg:w-11 rounded-full"
                  aria-label="Next experience"
                />
              </div>
            </>
          )}
        </Carousel>

        <div className="my-2 md:my-4">
          <CarouselPagination api={api} itemCount={experienceData.length} currentSlide={currentSlide} />
        </div>
      </div>
    </div>
  )
}