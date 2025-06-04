"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionTitle } from "@/components/ui/section-title"
import { Button } from "@/components/ui/button"
import ProjectGallery from "@/components/projectGallery"

export default function Projects({ className = "" }: { className?: string }) {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  return (
    <section className={cn("min-h-screen w-full flex items-start justify-center px-2 pt-4 md:pt-16", className)}>
      <div className="container flex flex-col px-2 sm:px-6 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className=""
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <SectionTitle
              title="Projects"
              subtitle="A collection of my work, side projects, and experiments."
              className="ml-4 sm:ml-6 md:ml-10 text-xs sm:text-sm md:text-base mt-4 md:mt-0"
            />
            <div className="ml-4 sm:ml-6 md:ml-10 sm:ml-0 sm:mr-6 md:mr-10 flex items-center">
              <Button
                variant={showFavoritesOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={cn(
                  "gap-2 transition-all duration-300 transform hover:scale-105",
                  showFavoritesOnly
                    ? "bg-slate-700 hover:bg-slate-800 border-slate-700 text-white shadow-lg shadow-slate-700/20"
                    : "hover:border-slate-300 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900 dark:hover:text-slate-300"
                )}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-all duration-300",
                    showFavoritesOnly ? "fill-current text-white" : ""
                  )}
                />
                <span className="text-xs sm:text-sm">
                  {showFavoritesOnly ? "Show All" : "My Favorites"}
                </span>
              </Button>
            </div>
          </div>
        </motion.div>
        <div className="mt-6 sm:mt-8 md:mt-4 mx-2 sm:mx-0 mr-0 md:mr-6">
          <ProjectGallery showFavoritesOnly={showFavoritesOnly} />
        </div>
      </div>
    </section>
  )
}