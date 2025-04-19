"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import socialData from "@/data/social.json"

export default function SocialLinks({ className = "" }: { className?: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    github: <Github className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    email: <Mail className="h-5 w-5" />,
    website: <ExternalLink className="h-5 w-5" />,
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className={cn("flex items-center justify-center py-10 md:py-28", className)}>
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-wrap justify-center gap-3">
        {socialData.map((social) => (
          <motion.div key={social.name} variants={item}>
            <Button variant="outline" size="lg" asChild className="gap-2 hover:scale-105 transition-transform">
              <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                {iconMap[social.icon.toLowerCase()]}
                <span>{social.name}</span>
              </a>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
