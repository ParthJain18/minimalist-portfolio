"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import experienceData from "@/data/experience.json"

export default function Experience({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(experienceData[0].id)

  return (
    <section id="experience" className={cn("min-h-screen flex items-center justify-center py-20 md:py-28", className)}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2">Experience</h2>
          <p className="text-muted-foreground max-w-md">My professional journey and internships.</p>
        </motion.div>

        <Tabs defaultValue={experienceData[0].id} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 w-full justify-start overflow-auto py-2">
            {experienceData.map((exp) => (
              <TabsTrigger
                key={exp.id}
                value={exp.id}
                className="min-w-[120px] data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                {exp.company}
              </TabsTrigger>
            ))}
          </TabsList>

          {experienceData.map((exp) => (
            <TabsContent key={exp.id} value={exp.id}>
              <Link href={`/experience/${exp.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                      <Image src={exp.logo || "/placeholder.svg"} alt={exp.company} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-lg">{exp.company}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {exp.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
