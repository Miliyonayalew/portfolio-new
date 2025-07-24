import React from "react"
import SectionBackground from "./section-background"
import { ExperienceTimeline } from "./experience-timeline"

interface ExperienceSectionProps {
  CORE_CONTENT: any
  lazyData: any
  isClient: boolean
  isDataLoaded: boolean
  experienceSection: {
    isVisible: boolean
    ref: React.RefObject<HTMLDivElement | null>
  }
  experienceTab: 'experience' | 'education'
  setExperienceTab: (tab: 'experience' | 'education') => void
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ 
  CORE_CONTENT, 
  lazyData, 
  isClient, 
  isDataLoaded, 
  experienceSection,
  experienceTab,
  setExperienceTab
}) => {
  return (
    <section id="experience" className="py-20 bg-muted/30 relative overflow-hidden">
      <SectionBackground color="from-blue-500/10 via-purple-500/10 to-pink-500/10" particleCount={10} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={experienceSection.ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            experienceSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Professional Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore my professional journey and academic background.
          </p>
          {/* Tabs */}
          <div className="flex justify-center mt-8 gap-2">
            <button
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none ${experienceTab === 'experience' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'}`}
              onClick={() => setExperienceTab('experience')}
            >
              Experience
            </button>
            <button
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none ${experienceTab === 'education' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'}`}
              onClick={() => setExperienceTab('education')}
            >
              Education
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {experienceTab === 'experience' && isClient && isDataLoaded && lazyData?.EXPERIENCE_DATA && (
          <ExperienceTimeline experiences={lazyData.EXPERIENCE_DATA} isVisible={experienceSection.isVisible} type="experience" />
        )}
        {experienceTab === 'education' && isClient && isDataLoaded && lazyData?.EDUCATION_DATA && (
          <ExperienceTimeline experiences={lazyData.EDUCATION_DATA} isVisible={experienceSection.isVisible} type="education" />
        )}
      </div>
    </section>
  )
}

export default React.memo(ExperienceSection) 