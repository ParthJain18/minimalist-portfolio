import { notFound } from "next/navigation"
import achievementsData from "@/data/achievements.json"
import DetailPageLayout from "@/components/detail-page-layout"

interface AchievementPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function AchievementPage({ params }: AchievementPageProps) {
  const { slug } = await params
  const achievement = achievementsData.find((a) => a.slug === slug)

  if (!achievement) {
    notFound()
  }

  return (
    <DetailPageLayout
      title={achievement.title}
      description={achievement.description}
      image={achievement.image || "/placeholder.svg"}
      date={achievement.date}
      location={achievement.location}
      technologies={achievement.tags}
      backHref="/#achievements"
      markdownFile={`achievements/${achievement.slug}.md`}
    />
  )
}
