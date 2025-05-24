import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
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
        <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-200 min-h-[28vh] md:min-h-[38vh] flex flex-col justify-between">
            <div className="flex items-center px-4 pt-4">
                <Image
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    width={40}
                    height={40}
                    className="rounded"
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
                <p className="text-sm mb-2 line-clamp-3">{experience.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                    {experience.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}