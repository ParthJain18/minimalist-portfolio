import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MapPin } from "lucide-react"

interface AchievementLink {
    label: string
    url: string
}

interface AchievementProps {
    title: string
    description: string
    image: string
    emoji: string
    location?: string
    date?: string
    tags?: string[]
    links?: AchievementLink[]
    linkedinUrl?: string
    slug?: string
}

export function AchievementCard({ achievement }: { achievement: AchievementProps }) {
    return (
        <Card className="overflow-hidden border shadow-md md:shadow-lg my-4 flex flex-col md:flex-row md:gap-3 justify-start ">
            {/* Title section for mobile only */}
            <div className="block md:hidden px-6 pt-6 w-full">
                <h3 className="text-lg font-bold">{achievement.title}</h3>
            </div>

            <div className="relative w-full h-[15vh] md:w-[55vh] md:h-[50vh] flex items-center justify-center px-6 md:pl-6 py-0 md:py-4">
                <Image
                    src={achievement.image}
                    alt={achievement.title}
                    width={800}
                    height={800}
                    className="object-cover rounded-md w-full h-full object-top md:object-center"
                    style={{ objectPosition: 'center top' }}
                />
                <div className="absolute bottom-2 right-3 md:right-[-6px] h-[30vh] w-8 md:h-12 md:w-12 flex items-center justify-center animate-scale">
                    <Image
                        src={achievement.emoji}
                        alt={`${achievement.title} emoji`}
                        width={128}
                        height={128}
                        className="object-contain"
                    />
                </div>
            </div>

            <CardContent className="py-3 md:p-5 md:w-3/5 flex flex-col justify-start md:justify-center max-h-[none] md:max-h-[50vh] overflow-y-auto">
                {/* Title only for desktop */}
                <h3 className="hidden md:block text-lg md:text-2xl font-bold mb-2 md:mb-4">{achievement.title}</h3>

                {/* Location with icon */}
                {achievement.location && (
                    <div className="flex items-center gap-1 mb-3 sm:my-3 md:mb-4 text-muted-foreground">
                        <MapPin size={20} className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="text-sm md:text-base">{achievement.location}</span>
                    </div>
                )}

                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                    {achievement.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3 md:mb-6">
                    {achievement.tags?.length ? (
                        achievement.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs md:text-sm">{tag}</Badge>
                        ))
                    ) : (
                        <>
                            <Badge variant="outline" className="text-xs md:text-sm">Achievement</Badge>
                            <Badge variant="outline" className="text-xs md:text-sm">{achievement.date}</Badge>
                        </>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    {achievement.links ? (
                        achievement.links.map((link, i) => (
                            <Link key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="gap-2 text-xs md:text-sm">
                                    <span>{link.label}</span>
                                    <ExternalLink size={16} className="h-4 w-4" />
                                </Button>
                            </Link>
                        ))
                    ) : (
                        <Link href={achievement.linkedinUrl || `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://yoursite.com/achievement/${achievement.slug}`)}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="gap-2 text-xs md:text-sm">
                                <span>Share on LinkedIn</span>
                                <ExternalLink size={16} className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
