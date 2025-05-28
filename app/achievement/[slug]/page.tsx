import { notFound } from "next/navigation"
import type { Metadata } from "next"
import achievementsData from "@/data/achievements.json"
import DetailPageLayout from "@/components/detail-page-layout"

interface AchievementPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: AchievementPageProps): Promise<Metadata> {
  const { slug } = await params
  const achievement = achievementsData.find((a) => a.slug === slug)

  if (!achievement) {
    return {
      title: "Achievement Not Found",
      description: "The achievement you're looking for could not be found."
    }
  }

  return {
    title: `${achievement.title} - Achievement`,
    description: achievement.description || `${achievement.title} - An achievement by Parth Jain.`,
  }
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
