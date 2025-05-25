import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import projectsData from "@/data/projects.json"

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projectsData.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-10">
      <Link href="/#projects">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
      </Link>

      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill priority className="object-cover" />
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>

        <div className="flex gap-3">
          {project.demoUrl && (
            <Button asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}

          {project.githubUrl && (
            <Button variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <Github className="h-4 w-4" />
                View Code
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.technologies.map((tech, i) => (
          <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md">
            {tech}
          </span>
        ))}
      </div>

      {/* <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>{project.description}</p>

        {project.content && (
          <>
            <h2>Project Details</h2>
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </>
        )}

        {project.features && (
          <>
            <h2>Key Features</h2>
            <ul>
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </>
        )}

        {project.challenges && (
          <>
            <h2>Challenges & Solutions</h2>
            <p>{project.challenges}</p>
          </>
        )}
      </div> */}
    </div>
  )
}
