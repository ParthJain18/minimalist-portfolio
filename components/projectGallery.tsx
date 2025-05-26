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
                    {projectsData.map((project, index) => (<motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >                        <Card className="h-80 flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative h-28 w-full flex-shrink-0">
                                <Image
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover object-top"
                                />
                            </div>
                            <CardContent className="flex-grow px-4 pt-0">
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
                                <div className="flex gap-2">
                                    {project.demoUrl && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="gap-1 cursor-pointer"
                                            onClick={() => window.open(project.demoUrl, '_blank', 'noopener,noreferrer')}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            Demo
                                        </Button>
                                    )}
                                    {project.githubUrl && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="gap-1 cursor-pointer"
                                            onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                                        >
                                            <Github className="h-4 w-4" />
                                            Code
                                        </Button>
                                    )}
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/project/${project.id}`}>
                                        Details
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}
