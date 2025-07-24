"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, CheckCircle, Building, Trophy } from "lucide-react"

interface ExperienceItem {
  title: string
  company: string
  period: string
  location: string
  description: string
  achievements: string[]
  technologies?: string[]
  companyLogo?: string
}

interface ExperienceTimelineProps {
  experiences: ExperienceItem[]
  isVisible: boolean
}

export function ExperienceTimeline({ experiences, isVisible }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>

      <div className="space-y-12">
        {experiences.map((job, index) => (
          <div
            key={index}
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            {/* Timeline dot */}
            <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-background shadow-lg z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-50"></div>
            </div>

            {/* Experience card */}
            <div className="ml-20">
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden">
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardHeader className="relative">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-primary" />
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {job.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        {job.company}
                      </CardDescription>
                    </div>

                    <div className="flex flex-col lg:text-right space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">{job.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>

                  {/* Achievements section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-primary">Key Achievements</h4>
                    </div>
                    <div className="grid gap-3">
                      {job.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-300 group/achievement"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5 group-hover/achievement:scale-110 transition-transform duration-300" />
                          <span className="text-sm text-muted-foreground group-hover/achievement:text-foreground transition-colors duration-300">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies used */}
                  {job.technologies && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-muted-foreground">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="transition-all duration-300 hover:scale-105 hover:bg-primary/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
