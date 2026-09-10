/**
 * Homepage - Sejal Bharambe Portfolio
 * Hero → About → Experience → Projects → AI Engineering → Skills
 * → Education & Credentials → 3D Showcase → Contact
 */

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { AIEngineering } from "@/components/sections/AIEngineering";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Showcase3D } from "@/components/sections/Showcase3D";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero - 3D integrated, page entrance animation */}
      <Hero />

      {/* About - professional summary from CV */}
      <About />

      {/* Experience - real timeline from CV */}
      <Experience />

      {/* Featured Projects - real projects from CV */}
      <Projects />

      {/* AI Engineering - real AI work areas */}
      <AIEngineering />

      {/* Skills - real skills with self-assessed proficiency */}
      <Skills />

      {/* Education, Certifications, Achievements */}
      <Education />

      {/* 3D Showcase - Phase 4 interactive experience (preserved) */}
      <Showcase3D />

      {/* Contact - real contact details */}
      <Contact />
    </div>
  );
}
