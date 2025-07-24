import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import SectionBackground from "./section-background"

interface AboutSectionProps {
  CORE_CONTENT: any
  lazyData: any
  isClient: boolean
  isDataLoaded: boolean
  aboutSection: {
    isVisible: boolean
    ref: React.RefObject<HTMLDivElement | null>
  }
}

const AboutSection: React.FC<AboutSectionProps> = ({ CORE_CONTENT, lazyData, isClient, isDataLoaded, aboutSection }) => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <SectionBackground color="from-blue-500/10 via-purple-500/10 to-pink-500/10" particleCount={15} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={aboutSection.ref} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A Full-Stack Developer with a background in Software Engineering from Haramaya University. Passionate about creating innovative solutions and dedicated to continuous learning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                {isClient && isDataLoaded && lazyData?.ABOUT_CONTENT ? lazyData.ABOUT_CONTENT.sectionTitle : "About Me"}
              </h3>
              <div className="space-y-4 text-muted-foreground">
                {isClient && isDataLoaded && lazyData?.ABOUT_CONTENT ? lazyData.ABOUT_CONTENT.description.map((paragraph: string, index: number) => (
                  <p key={index} className="leading-relaxed">{paragraph}</p>
                )) : (
                  <p className="leading-relaxed">
                    A passionate and versatile full-stack developer with a knack for crafting innovative solutions. Dedicated to continuous learning and pushing the boundaries of what's possible.
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4 text-foreground">Key Qualities</h4>
              <div className="grid grid-cols-2 gap-3">
                {isClient && isDataLoaded && lazyData?.ABOUT_CONTENT ? lazyData.ABOUT_CONTENT.qualities.map((quality: any, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{quality.label}</span>
                  </div>
                )) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Problem Solver</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Team Player</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Fast Learner</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Detail Oriented</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-foreground">Tech Journey</h4>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">1</div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h5 className="font-semibold text-foreground">Started Coding</h5>
                    <p className="text-sm text-muted-foreground">Began my journey with HTML, CSS, and JavaScript</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">2</div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h5 className="font-semibold text-foreground">Full-Stack Development</h5>
                    <p className="text-sm text-muted-foreground">Mastered React, Node.js, and modern web technologies</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">3</div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h5 className="font-semibold text-foreground">AI & Innovation</h5>
                    <p className="text-sm text-muted-foreground">Exploring AI integration and cutting-edge solutions</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse">∞</div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h5 className="font-semibold text-foreground">Future Ready</h5>
                    <p className="text-sm text-muted-foreground">Always learning, always building, always innovating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(AboutSection) 