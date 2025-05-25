"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { SectionTitle } from "@/components/ui/section-title"
import ProjectGallery from "@/components/projectGallery"

export default function Projects({ className = "" }: { className?: string }) {
  return (
    <section className={cn("min-h-screen w-full flex items-start justify-center px-2", className)}>
      <div className="container flex flex-col px-2 sm:px-6 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className=""
        >
          <SectionTitle
            title="Projects"
            subtitle="A collection of my work, side projects, and experiments."
            className="ml-4 sm:ml-6 md:ml-10 text-xs sm:text-sm md:text-base mt-4 md:mt-10"
          />
        </motion.div>
        <div className="mt-10 sm:mt-10 md:mt-0 ml-2 sm:ml-0 md:mt-0">
          <ProjectGallery />
        </div>
      </div>
    </section>
  )
}