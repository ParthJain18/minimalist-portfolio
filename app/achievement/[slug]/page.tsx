import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import achievementsData from "@/data/achievements.json"

interface AchievementPageProps {
  params: {
    slug: string
  }
}

export default function AchievementPage({ params }: AchievementPageProps) {
  const achievement = achievementsData.find((a) => a.slug === params.slug)

  if (!achievement) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-10">
      <Link href="/">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
        <Image
          src={achievement.image || "/placeholder.svg"}
          alt={achievement.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="mb-8">
        <div className="text-sm text-muted-foreground mb-2">{achievement.date}</div>
        <h1 className="text-3xl md:text-4xl font-bold">{achievement.title}</h1>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">{achievement.description}</p>

        {achievement.content && <div dangerouslySetInnerHTML={{ __html: achievement.content }} />}

        {achievement.gallery && (
          <>
            <h2>Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              {achievement.gallery.map((image, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.caption || `Gallery image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
