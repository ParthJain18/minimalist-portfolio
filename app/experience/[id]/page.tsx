import { notFound } from "next/navigation"
import type { Metadata } from "next"
import experienceData from "@/data/experience.json"
import DetailPageLayout from "@/components/detail-page-layout"

interface ExperiencePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { id } = await params
  const experience = experienceData.find((exp) => exp.id === id)

  if (!experience) {
    return {
      title: "Experience Not Found",
      description: "The experience you're looking for could not be found."
    }
  }

  return {
    title: `${experience.title} at ${experience.company} - Experience`,
    description: experience.description || `${experience.title} position at ${experience.company} - Professional experience by Parth Jain.`,
  }
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { id } = await params
  const experience = experienceData.find((exp) => exp.id === id)

  if (!experience) {
    notFound()
  }

  return (
    <DetailPageLayout
      title={experience.title}
      subtitle={experience.company}
      description={experience.description}
      logo={experience.logo || "/placeholder.svg"}
      period={experience.period}
      location={experience.location}
      technologies={experience.technologies}
      backHref="/#experience"
      markdownFile={`experiences/${experience.id}.md`}
    >
      {/* Legacy content fallback
      <h2>Overview</h2>
      <p>{experience.description}</p>

      <h2>Responsibilities</h2>
      <ul>
        {experience.responsibilities.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {experience.achievements && (
        <>
          <h2>Key Achievements</h2>
          <ul>
            {experience.achievements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {experience.content && (
        <div dangerouslySetInnerHTML={{ __html: experience.content }} />
      )} */}
    </DetailPageLayout>
  )
}
