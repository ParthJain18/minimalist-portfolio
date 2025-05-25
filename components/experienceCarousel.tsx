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
    <div className={cn("w-full flex flex-col items-center justify-center px-2", className)}>
      <div className="relative w-full mx-auto max-w-7xl flex-1 flex flex-col justify-center">
        <Carousel
          opts={{ align: "center", loop: true }}
          className="w-full md:w-5/6 mx-auto"
          setApi={setApi}
        >
          <CarouselContent className="snap-x snap-mandatory md:px-4 gap-x-2 md:gap-x-4">
            {experienceData.map((exp, index) => (
              <CarouselItem
                key={exp.id}
                className="basis-full flex justify-center items-start pl-4"
              >
                <div className="w-full flex items-start justify-center">
                  <ExperienceCard experience={exp} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

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