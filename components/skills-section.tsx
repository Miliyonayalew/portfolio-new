import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Server } from "lucide-react"
import SectionBackground from "./section-background"

interface SkillsSectionProps {
  CORE_CONTENT: any
  lazyData: any
  isClient: boolean
  isDataLoaded: boolean
  skillsSection: {
    isVisible: boolean
    ref: React.RefObject<HTMLDivElement | null>
  }
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ CORE_CONTENT, lazyData, isClient, isDataLoaded, skillsSection }) => {
  return (
    <section id="skills" className="py-20 bg-muted/30 relative overflow-hidden">
      <SectionBackground color="from-blue-500/10 via-green-500/10 to-purple-500/10" particleCount={12} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={skillsSection.ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            skillsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {CORE_CONTENT.sections.skills.title}
          </h2>
          <p className="text-lg text-muted-foreground">{CORE_CONTENT.sections.skills.subtitle}</p>
        </div>

        {isClient && isDataLoaded && lazyData?.SKILLS_CATEGORIES && (
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {lazyData.SKILLS_CATEGORIES.map((category: any, index: number) => {
              const IconComponent = category.category === "frontend" ? Code : 
                                  category.category === "backend" ? Server : Database;
              
              return (
                <Card
                  key={category.title}
                  className={`group hover:shadow-2xl hover:scale-105 transition-transform duration-500 transition-shadow hover:border-primary/40 hover:bg-primary/5 bg-card/50 backdrop-blur-sm border-primary/20 cursor-pointer ${
                    skillsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="text-center">
                    <IconComponent className="h-12 w-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                    <CardTitle className="group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {category.skills.map((skill: any) => (
                        <Badge
                          key={skill.name}
                          variant="secondary"
                          className="transition-all duration-300 hover:scale-105 hover:bg-primary/20 flex items-center gap-2"
                        >
                          <span>{skill.icon}</span>
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default React.memo(SkillsSection) 