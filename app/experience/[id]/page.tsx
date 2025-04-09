import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import experienceData from "@/data/experience.json"

interface ExperiencePageProps {
  params: {
    id: string
  }
}

export default function ExperiencePage({ params }: ExperiencePageProps) {
  const experience = experienceData.find((exp) => exp.id === params.id)

  if (!experience) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-10">
      <Link href="/#experience">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Experience
        </Button>
      </Link>

      <div className="flex items-start gap-6 mb-8">
        <div className="relative h-24 w-24 overflow-hidden rounded-md border">
          <Image
            src={experience.logo || "/placeholder.svg"}
            alt={experience.company}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{experience.title}</h1>
          <p className="text-xl text-muted-foreground">{experience.company}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {experience.period}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {experience.location}
            </div>
          </div>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>{experience.overview}</p>

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

        <h2>Technologies Used</h2>
        <div className="flex flex-wrap gap-2 not-prose mb-6">
          {experience.technologies.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md">
              {tech}
            </span>
          ))}
        </div>

        {experience.content && <div dangerouslySetInnerHTML={{ __html: experience.content }} />}
      </div>
    </div>
  )
}
