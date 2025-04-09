"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
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

    // Autoplay only on desktop
    if (!isMobile) {
      const interval = setInterval(() => {
        api.scrollNext()
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [api, isMobile])

  return (
    <section className={cn("min-h-screen w-full py-4 md:py-12", className)}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 md:mb-3">Notable Achievements</h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl">
            Key milestones and recognition throughout my career journey.
          </p>
        </motion.div>

        <div className="relative w-full mx-auto max-w-7xl">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full mx-auto"
            setApi={setApi}
          >
            {/* Fade overlay left - hidden on mobile */}
            <div className="hidden md:block absolute top-0 left-0 h-full w-24 md:w-32 lg:w-40 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent"></div>

            <CarouselContent className="snap-x snap-mandatory px-12 md:px-12 gap-x-6 md:gap-x-12">
              {achievementsData.map((achievement, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[90%] md:basis-[80%] snap-center px-4"
                >
                  <div className="h-full flex items-center justify-center">
                    <Card className="overflow-hidden border shadow-md md:shadow-lg w-full h-[350px] md:h-[450px] flex flex-col md:flex-row">
                      <div className="relative mx-6 w-full md:w-4/5 aspect-square rounded-md overflow-visible">
                        <Image
                          src={achievement.image}
                          alt={achievement.title}
                          fill
                          unoptimized
                          className="object-cover rounded-md"
                          priority={index < 3}
                        />
                        {/* Emoji overlay with updated animation */}
                        <div className="absolute bottom-2 right-[-10px] md:bottom-4 md:right-[-12px] h-10 w-10 md:h-15 md:w-15 flex items-center justify-center animate-scale">
                          <Image
                            src={achievement.emoji}
                            alt={`${achievement.title} emoji`}
                            width={128}
                            height={128}
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <CardContent className="p-4 md:p-5 md:w-1/2 flex flex-col justify-center">
                        <h3 className="text-lg md:text-3xl font-bold mb-8">{achievement.title}</h3>
                        <p className="text-sm md:text-lg text-muted-foreground mb-8">
                          {achievement.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {achievement.tags?.length ? (
                            achievement.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs md:text-sm">{tag}</Badge>
                            ))
                          ) : (
                            <>
                              <Badge variant="outline" className="text-xs md:text-sm">Achievement</Badge>
                              <Badge variant="outline" className="text-xs md:text-sm">{achievement.date}</Badge>
                            </>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {achievement.links ? (
                            achievement.links.map((link, i) => (
                              <Link key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="gap-2 text-xs md:text-sm">
                                  <span>{link.label}</span>
                                  <ExternalLink size={16} className="h-4 w-4" />
                                </Button>
                              </Link>
                            ))
                          ) : (
                            <Link href={achievement.linkedinUrl || `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://yoursite.com/achievement/${achievement.slug}`)}`} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="gap-2 text-xs md:text-sm">
                                <span>Share on LinkedIn</span>
                                <ExternalLink size={16} className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Fade overlay right - hidden on mobile */}
            <div className="hidden md:block absolute top-0 right-0 h-full w-24 md:w-32 lg:w-40 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent"></div>

            <div className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-2 md:left-4 lg:left-8 z-20">
              <CarouselPrevious
                className="relative h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full"
                aria-label="Previous achievement"
              />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-2 md:right-4 lg:right-8 z-20">
              <CarouselNext
                className="relative h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full"
                aria-label="Next achievement"
              />
            </div>
          </Carousel>

          {/* Pagination dots for desktop */}
          <div className="hidden md:flex justify-center mt-6 gap-2">
            {achievementsData.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-primary scale-125' : 'bg-muted hover:bg-muted-foreground/50'}`}
                aria-label={`Go to achievement ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}