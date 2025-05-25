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
import { AchievementCard } from "@/components/achievement-card"
import { motion } from "framer-motion"


export default function Achievements({ className = "" }: { className?: string }) {
  const [api, setApi] = useState<CarouselApi>()


  useEffect(() => {
    if (!api) return
    // Enable autoplay for both mobile and desktop
    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <section className={cn("min-h-screen w-full flex items-start justify-center px-2 pt-20 md:pt-16", className)}>
      <div className="container flex flex-col px-2 sm:px-6 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <SectionTitle
            title="Notable Achievements"
            subtitle="Key milestones and recognition throughout my career journey."
            className="ml-4 sm:ml-6 md:ml-10 text-xs sm:text-sm md:text-base mt-4 md:mt-0"
          />
        </motion.div>

        <div className="relative w-full mx-auto max-w-7xl flex-1 flex flex-col justify-center">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full md:w-5/6 mx-auto"
            setApi={setApi}
          >
            <CarouselContent className="snap-x snap-mandatory md:px-4 gap-x-2 md:gap-x-4">
              {achievementsData.map((achievement, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full flex justify-center items-center pl-4"
                >
                  <div className="w-full flex items-center justify-center">
                    <AchievementCard achievement={achievement} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Hide navigation arrows on mobile */}
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-2 md:-left-8 lg:-left-12 z-20">
              <CarouselPrevious
                className="relative h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 lg:h-11 lg:w-11 rounded-full"
                aria-label="Previous achievement"
              />
            </div>
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-2 md:-right-8 lg:-right-12 z-20">
              <CarouselNext
                className="relative h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 lg:h-11 lg:w-11 rounded-full"
                aria-label="Next achievement"
              />
            </div>
          </Carousel>

          {/* <div className="my-2 md:my-12">
        <CarouselPagination
          api={api}
          itemCount={achievementsData.length}
          currentSlide={currentSlide}
        />
        </div> */}
        </div>
      </div>
    </section>
  )
}