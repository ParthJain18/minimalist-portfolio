"use client"

import { motion } from "framer-motion"

interface SectionTitleProps {
    title: string
    subtitle?: string
    className?: string
}

export function SectionTitle({ title, subtitle, className = "" }: SectionTitleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`mb-6 md:mb-12 ${className}`}
        >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 md:mb-3">{title}</h2>
            {subtitle && (
                <p className="text-muted-foreground text-base md:text-lg lg:text-xl">
                    {subtitle}
                </p>
            )}
        </motion.div>
    )
}
