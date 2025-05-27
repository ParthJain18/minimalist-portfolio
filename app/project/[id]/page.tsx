import { notFound } from "next/navigation"
import projectsData from "@/data/projects.json"
import DetailPageLayout from "@/components/detail-page-layout"

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

  // Prepare links array
  const links = []
  if (project.demoUrl) {
    links.push({
      label: "Live Demo",
      url: project.demoUrl,
      icon: "external" as const
    })
  }
  if (project.githubUrl) {
    links.push({
      label: "View Code",
      url: project.githubUrl,
      icon: "github" as const
    })
  }

  return (
    <DetailPageLayout
      title={project.title}
      description={project.description}
      image={project.image || "/placeholder.svg"}
      technologies={project.technologies}
      links={links}
      backHref="/#projects"
      markdownFile={`projects/${project.id}.md`}
    >
      {/* Legacy content fallback */}
      {/* {project.content && (
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
      )} */}
    </DetailPageLayout>
  )
}
