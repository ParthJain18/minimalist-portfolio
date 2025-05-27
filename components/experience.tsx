"use client";

import { cn } from "@/lib/utils";
import ExperienceCarousel from "@/components/experienceCarousel";
import { SectionTitle } from "@/components/ui/section-title";
import { motion } from "framer-motion"

export default function Experience({ className = "" }: { className?: string }) {
  return (
    <section className={cn("min-h-screen w-full flex flex-col justify-start px-2 pt-4 md:pt-16", className)}>
      <div className="container flex flex-col px-2 sm:px-6 md:px-4 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-0"
        >
          <SectionTitle
            title="Work Experience"
            subtitle="Professional roles and responsibilities throughout my career."
            className="ml-4 pb-4 sm:pb-6 md:pb-0 sm:ml-6 md:ml-10 text-xs sm:text-sm md:text-base mt-4 md:mt-0"
          />
        </motion.div>
        <div className="flex-1 flex items-center justify-center">
          <ExperienceCarousel />
        </div>
      </div>
    </section>
  );
}