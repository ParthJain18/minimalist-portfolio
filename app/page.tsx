"use client";

import Hero from "@/components/hero"
import Achievements from "@/components/achievements"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import FullPageScroll from "@/components/ui/FullPageScroll"

export default function Home() {
  return (
    <FullPageScroll>
      <FullPageScroll.Page>
        <Hero />
      </FullPageScroll.Page>
      <FullPageScroll.Page >
        <Achievements className="" />
      </FullPageScroll.Page>
      <FullPageScroll.Page>
        <Experience className="" />
      </FullPageScroll.Page>
      <FullPageScroll.Page>
        <Projects className="" />
      </FullPageScroll.Page>
      <FullPageScroll.Page>
        <Contact className="" />
      </FullPageScroll.Page>
    </FullPageScroll>
  )
}
