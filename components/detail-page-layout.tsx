import Image from "next/image"
import { ExternalLink, Github, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { loadMDXContent } from "@/lib/mdx"
import BackButton from "@/components/back-button"

interface DetailPageLink {
    label: string
    url: string
    icon?: 'external' | 'github'
}

interface DetailPageProps {
    title: string
    subtitle?: string
    description?: string
    image?: string
    logo?: string
    date?: string
    period?: string
    location?: string
    technologies?: string[]
    links?: DetailPageLink[]
    backHref: string
    markdownFile?: string
    children?: React.ReactNode
}

export default async function DetailPageLayout({
    title,
    subtitle,
    description,
    image,
    logo,
    date,
    period,
    location,
    technologies,
    links,
    backHref,
    markdownFile,
    children
}: DetailPageProps) {    // Load MDX content if specified
    const MDXContent = markdownFile ? await loadMDXContent(markdownFile) : null

    return (
        <div className="detail-page">
            <div className="container max-w-4xl py-16">
                {/* Back Button */}
                <BackButton backHref={backHref} />

                {/* Header Section */}
                <div className="mb-8">
                    {/* Main Image (for projects and achievements) */}
                    {image && (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Logo and Title Section (for experiences) */}
                    {logo ? (
                        <div className="flex items-start gap-6 mb-6">
                            <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                                <Image
                                    src={logo}
                                    alt={subtitle || title}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
                                {subtitle && (
                                    <p className="text-xl text-muted-foreground">{subtitle}</p>
                                )}

                                {/* Date/Period and Location for experiences */}
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                                    {(period || date) && (
                                        <div className="flex items-center">
                                            <Calendar className="mr-1 h-4 w-4" />
                                            {period || date}
                                        </div>
                                    )}
                                    {location && (
                                        <div className="flex items-center">
                                            <MapPin className="mr-1 h-4 w-4" />
                                            {location}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Title Section (for projects and achievements without logo) */
                        <div className="mb-6">
                            {date && (
                                <div className="text-sm text-muted-foreground mb-2">{date}</div>
                            )}
                            <div className="flex flex-wrap justify-between items-center gap-4">
                                <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>

                                {/* Action Links (for projects) */}
                                {links && links.length > 0 && (
                                    <div className="flex gap-3">
                                        {links.map((link, i) => (
                                            <Button key={i} variant={link.icon === 'github' ? 'outline' : 'default'} asChild>
                                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                                                    {link.icon === 'external' && <ExternalLink className="h-4 w-4" />}
                                                    {link.icon === 'github' && <Github className="h-4 w-4" />}
                                                    {link.label}
                                                </a>
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Technologies */}
                    {technologies && technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {technologies.map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="prose dark:prose-invert max-w-none">                    {/* Description */}
                    {description && (
                        <p className="lead">{description}</p>
                    )}

                    {/* MDX Content */}
                    {MDXContent && <MDXContent />}

                    {/* Additional Children Content */}
                    {children}
                </div>
            </div>
        </div>
    )
}
