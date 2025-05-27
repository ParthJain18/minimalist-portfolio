import { notFound } from "next/navigation"
import experienceData from "@/data/experience.json"
import DetailPageLayout from "@/components/detail-page-layout"

interface ExperiencePageProps {
  params: Promise<{
    id: string
  }>
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
