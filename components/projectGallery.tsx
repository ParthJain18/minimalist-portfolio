"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import projectsData from "@/data/projects.json"

interface ProjectGalleryProps {
    showFavoritesOnly?: boolean
}

export default function ProjectGallery({ showFavoritesOnly = false }: ProjectGalleryProps) {
    // Function to get the project type badge styling - minimalist approach
    const getProjectTypeBadgeStyle = (type: string) => {
        switch (type) {
            case 'side-project':
                return 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
            case 'college-project':
                return 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
            case 'freelance':
                return 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
            case 'internship':
                return 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400'
            case 'hackathon':
                return 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
            default:
                return 'bg-muted text-muted-foreground'
        }
    }

    const formatProjectType = (type: string) => {
        switch (type) {
            case 'side-project':
                return 'Side Project'
            case 'college-project':
                return 'College Project'
            case 'freelance':
                return 'Freelance'
            case 'internship':
                return 'Internship'
            case 'hackathon':
                return 'Hackathon'
            default:
                return type
        }
    }

    // Filter projects based on favorites if needed
    const filteredProjects = showFavoritesOnly
        ? projectsData.filter(project => project.favorite)
        : projectsData

    return (
        <>            <div className="overflow-y-auto max-h-[500px] md:ml-10 sm:ml-0 pr-2 pb-18 project-gallery">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (<motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}                    >                        <Card className="h-80 flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-28 w-full flex-shrink-0">
                            <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover object-top"
                            />
                        </div>                            <CardContent className="flex-grow px-4 pt-0 min-h-0">
                            <h3 className="text-md font-semibold mb-1">{project.title}</h3>
                            <p className="text-muted-foreground mb-2 text-xs">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                                <span
                                    className={`px-2 py-0.5 text-[10px] rounded-md ${getProjectTypeBadgeStyle(project.type)} font-medium`}
                                >
                                    {formatProjectType(project.type)}
                                </span>
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
                        <CardFooter className="flex justify-between p-4 pt-0 flex-shrink-0 mt-auto">
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
