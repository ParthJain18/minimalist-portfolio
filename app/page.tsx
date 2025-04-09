import Hero from "@/components/hero"
import Achievements from "@/components/achievements"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      <Hero className="snap-start" />
      <Achievements className="snap-start" />
      <Experience className="snap-start" />
      <Projects className="snap-start" />
      <Contact className="snap-start" />
    </div>
  )
}
