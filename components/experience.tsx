"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ExperienceTimeline from "@/components/experienceTimeline";
import { SectionTitle } from "@/components/ui/section-title";

export default function Experience({ className = "" }: { className?: string }) {
  return (
    <section className={cn("min-h-screen w-full flex items-start justify-center px-2", className)}>
      <div className="container flex flex-col px-2 sm:px-6 md:px-4">
        <SectionTitle
          title="Work Experience"
          subtitle="Professional roles and responsibilities throughout my career."
          className="ml-4 sm:ml-6 md:ml-10 text-xs sm:text-sm md:text-base mt-4 md:mt-10"
        />
        <ExperienceTimeline />
      </div>
    </section>
  );
}