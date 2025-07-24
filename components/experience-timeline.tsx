"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import React, { useRef, useState } from "react"

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    // Max tilt: 12deg
    const rotateX = ((y - centerY) / centerY) * 12
    const rotateY = ((x - centerX) / centerX) * -12
    setStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
    })
  }
  function handleMouseLeave() {
    setStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)"
    })
  }
  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-300 will-change-transform"
    >
      {children}
    </div>
  )
}

export function ExperienceTimeline({ experiences, isVisible, type = 'experience' }: { 
  experiences: any[]; 
  isVisible: boolean;
  type?: 'experience' | 'education';
}) {
  // Map education data structure to match experience structure
  const mappedExperiences = experiences.map(item => {
    if (type === 'education') {
      return {
        title: item.degree,
        company: item.institution,
        period: item.period,
        location: item.location,
        description: item.description,
        achievements: item.highlights || [],
        technologies: []
      }
    }
    return item
  })

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Center stick with dots at each entry (desktop only) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full -translate-x-1/2 z-0" />
      <div className="space-y-12 relative z-10">
        {mappedExperiences.map((job, idx) => {
          const isEven = idx % 2 === 0
          // Animation classes
          const baseAnim =
            'transition-all duration-700 ease-out will-change-transform will-change-opacity';
          const hiddenAnim = 'opacity-0 translate-y-10';
          const visibleAnim = 'opacity-100 translate-y-0';
          // Use Tailwind's delay utilities for staggered effect (up to 1s)
          const delayClass = isVisible ? `delay-[${Math.min(idx * 120, 1000)}ms]` : '';
          const animClass = `${baseAnim} ${isVisible ? visibleAnim : hiddenAnim} ${delayClass}`;
          return (
            <div key={idx} className={`relative min-h-[120px] ${animClass}`}>
              {/* Desktop: alternating layout with dot/line */}
              <div className="hidden md:flex flex-row items-stretch w-full">
                {/* Center dot and connecting lines, dot at the top of each card */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20" style={{ top: 0, height: '100%' }}>
                  {/* Top line (not for first item) - ends at center of dot, only on md+ */}
                  {idx !== 0 && (
                    <div
                      className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-600"
                      style={{ top: 0, height: '20px' }}
                    />
                  )}
                  {/* Dot at the top of the card, always above the line */}
                  <div className="hidden md:block w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-background shadow-lg mx-auto z-30 relative" style={{ top: 0 }} />
                  {/* Bottom line (not for last item) - starts at center of dot, only on md+ */}
                  {idx !== mappedExperiences.length - 1 && (
                    <div
                      className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-600"
                      style={{ top: '20px', height: 'calc(100% - 20px)' }}
                    />
                  )}
                </div>
                {/* Left and Right content as before, with gap and border changes */}
                <div className={`md:w-1/2 w-full md:px-6 ${isEven ? 'md:order-2' : 'md:order-1'}`}> 
                  {isEven ? (
                    <TiltCard>
                      <Card className="hover:cursor-pointer bg-card/70 border border-border shadow-none">
                        <CardContent className="py-6 px-4 md:px-8 flex flex-col justify-center h-full">
                          <div className="space-y-2">
                            <div className="text-sm font-semibold text-primary">
                              {type === 'education' ? '' : 'Key Achievements'}
                            </div>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              { type === 'education' ? job.description : job.achievements.map((a: string, i: number) => (
                                  <li key={i}>{a}</li>
                                ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </TiltCard>
                  ) : (
                    <Card className="shadow-none bg-transparent border-0">
                      <CardContent className="py-6 px-4 md:px-8 flex flex-col justify-center h-full">
                        <div className="space-y-2">
                          <div className="text-lg font-bold text-foreground">{job.title}</div>
                          <div className="text-sm text-primary font-semibold">{job.company}</div>
                          <div className="text-xs rounded border border-blue-400 bg-blue-100 dark:border-blue-600 dark:bg-blue-900 px-2 py-1 inline-block w-fit text-blue-900 dark:text-blue-100">
                            {job.period}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-primary" />
                            {job.location}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                <div className={`md:w-1/2 w-full md:px-6 mt-8 md:mt-0 ${isEven ? 'md:order-3' : 'md:order-2'}`}> 
                  {isEven ? (
                    <Card className="shadow-none bg-transparent border-0">
                      <CardContent className="py-6 px-4 md:px-8 flex flex-col justify-center h-full">
                        <div className="space-y-2">
                          <div className="text-lg font-bold text-foreground">{job.title}</div>
                          <div className="text-sm text-primary font-semibold">{job.company}</div>
                          <div className="text-xs rounded border border-blue-400 bg-blue-100 dark:border-blue-600 dark:bg-blue-900 px-2 py-1 inline-block w-fit text-blue-900 dark:text-blue-100">
                            {job.period}
                          </div>
                          <div className="text-xs text-muted-foreground  flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-primary" />
                            {job.location}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <TiltCard>
                      <Card className="hover:cursor-pointer bg-card/70 border border-border shadow-none">
                        <CardContent className="py-6 px-4 md:px-8 flex flex-col justify-center h-full">
                          <div className="space-y-2">
                            <div className="text-sm font-semibold text-primary">
                              {type === 'education' ? '' : 'Key Achievements'}
                            </div>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              { type === 'education' ? job.description : job.achievements.map((a: string, i: number) => (
                                  <li key={i}>{a}</li>
                                ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </TiltCard>
                  )}
                </div>
              </div>
              {/* Mobile: always stack role/company card on top, achievements below, no dot/line */}
              <div className="flex flex-col md:hidden w-full">
                <div className="w-full">
                  <Card className="shadow-none bg-transparent border-0">
                    <CardContent className="py-6 px-4 flex flex-col justify-center h-full">
                      <div className="space-y-2">
                        <div className="text-lg font-bold text-foreground">{job.title}</div>
                        <div className="text-sm text-primary font-semibold">{job.company}</div>
                        <div className="text-xs rounded border border-blue-400 bg-blue-100 dark:border-blue-600 dark:bg-blue-900 px-2 py-1 inline-block w-fit text-blue-900 dark:text-blue-100">
                          {job.period}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-primary" />
                          {job.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full mt-4">
                  <TiltCard>
                    <Card className="hover:cursor-pointer bg-card/70 border border-border shadow-none">
                      <CardContent className="py-6 px-4 flex flex-col justify-center h-full">
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-primary">
                            {type === 'education' ? '' : 'Key Achievements'}
                          </div>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            { type === 'education' ? job.description : job.achievements.map((a: string, i: number) => (
                                <li key={i}>{a}</li>
                              ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
