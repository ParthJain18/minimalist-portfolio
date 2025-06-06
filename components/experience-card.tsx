import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar } from "lucide-react"

interface ExperienceProps {
    id: string
    title: string
    company: string
    period: string
    location: string
    description: string
    logo: string
    technologies: string[]
    responsibilities: string[]
}

export function ExperienceCard({ experience }: { experience: ExperienceProps }) {
    return (
        <Card
            className="
              overflow-hidden border shadow-md hover:shadow-lg 
              transition-shadow duration-200 
              min-h-[28vh] md:min-h-[38vh] 
              flex flex-col justify-between 
              p-0
              sm:p-0
              md:p-6
              lg:p-6
              w-full 
              sm:w-80
              md:w-96
              lg:w-[42rem] 
              break-words
            "
        >
            <div className="flex items-center px-4 pt-4">
                <Image
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    width={60}
                    height={60}
                    className="rounded-lg"
                />
                <div className="ml-3">
                    <h3 className="text-lg font-bold">{experience.title}</h3>
                    <p className="text-sm text-muted-foreground">{experience.company}</p>
                </div>
            </div>
            <CardContent className="px-4 pb-4">
                <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <span>{experience.period}</span>
                    <MapPin size={16} />
                    <span>{experience.location}</span>
                </div>
                <p className="font-semibold text-sm mb-4 line-clamp-3">{experience.description}</p>
                <div>
                    <p className="font-semibold text-sm mb-1">Responsibilities:</p>
                    <ul className="list-disc list-outside text-xs space-y-1 mb-2 pl-4 ml-2">
                        {experience.responsibilities.map((res, idx) => (
                            <li key={idx}>{res}</li>
                        ))}
                    </ul>
                </div>                <div className="flex flex-wrap gap-1 mb-3 pt-2">
                    {experience.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border/30">
                    <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href={`/experience/${experience.id}`}>
                            View Details
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}