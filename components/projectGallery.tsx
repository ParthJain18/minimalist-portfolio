"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import projectsData from "@/data/projects.json"

export default function ProjectGallery() {
    return (
        <>
            <div className="overflow-y-auto max-h-[500px] md:ml-10 sm:ml-0 pr-2 pb-18 project-gallery">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/project/${project.id}`}>
                                <Card className="h-80 flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <CardContent className="flex-grow p-4 pt-0">
                                        <h3 className="text-md font-semibold mb-1">{project.title}</h3>
                                        <p className="text-muted-foreground mb-2 text-xs">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-1 py-0.5 bg-secondary text-secondary-foreground text-[10px] rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between p-4 pt-0">
                                        {project.demoUrl && (
                                            <Button variant="ghost" size="sm" className="gap-1" asChild>
                                                <a
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                    Demo
                                                </a>
                                            </Button>
                                        )}
                                        {project.githubUrl && (
                                            <Button variant="ghost" size="sm" className="gap-1" asChild>
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Github className="h-4 w-4" />
                                                    Code
                                                </a>
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}
