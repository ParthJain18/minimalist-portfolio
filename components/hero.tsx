"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import SocialLinks from "@/components/social-links"
import profileData from "@/data/profile.json"

export default function Hero({ className = "" }: { className?: string }) {
  const [titleIndex, setTitleIndex] = useState(0)
  const { name, titles, bio, photoUrl } = profileData

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [titles.length])

  return (
    <section className="snap-start flex flex-col items-center justify-start md:justify-center h-screen md:py-14 px-6 md:px-0 mt-20 md:mt-0 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative w-full max-w-[160px] md:max-w-xs mx-auto md:ml-auto md:mr-0 aspect-square rounded-2xl overflow-hidden",
            "border-4 border-background shadow-xl",
          )}
        >
          <Image src={photoUrl || "/placeholder.svg"} alt={name} fill priority className="object-cover" />

          <motion.div
            className="absolute bottom-0 right-0 bg-primary text-primary-foreground px-3 py-1 md:px-4 md:py-2 rounded-tl-xl font-semibold text-xs md:text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileInView={{
              scale: [1, 1.05, 1],
              transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2
              }
            }}
          >
            Hire Me!
          </motion.div>
        </motion.div>

        <div className="space-y-4 md:space-y-6 max-w-3xl w-full text-center md:text-left md:pl-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            {name}
          </motion.h1>

          <div className="h-6 md:h-12">
            <motion.h2
              key={titleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-base md:text-2xl text-muted-foreground"
            >
              {titles[titleIndex]}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-lg text-muted-foreground w-full md:max-w-xl mx-auto md:mx-0"
          >
            {bio}
          </motion.p>
        </div>
      </div>

      <div className="mt-4 md:mt-6">
        <SocialLinks />
      </div>
    </section>
  )
}
