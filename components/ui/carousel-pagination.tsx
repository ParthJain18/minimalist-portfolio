import { type CarouselApi } from "@/components/ui/carousel"

interface CarouselPaginationProps {
    api: CarouselApi | null
    itemCount: number
    currentSlide: number
}

export function CarouselPagination({ api, itemCount, currentSlide }: CarouselPaginationProps) {
    return (
        <div className="hidden md:flex justify-center mt-6 gap-2">
            {Array.from({ length: itemCount }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-primary scale-125' : 'bg-muted hover:bg-muted-foreground/50'}`}
                    aria-label={`Go to item ${index + 1}`}
                />
            ))}
        </div>
    )
}
