import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Github, ExternalLink as LucideExternalLink } from "lucide-react"
import Image from "next/image"
import ExternalLink from "./external-link"
import SectionBackground from "./section-background"

interface ProjectsSectionProps {
  CORE_CONTENT: any
  lazyData: any
  isClient: boolean
  isDataLoaded: boolean
  projectsSection: {
    isVisible: boolean
    ref: React.RefObject<HTMLDivElement | null>
  }
  // Carousel state and functions
  currentProjectIndex: number
  carouselIndex: number
  visibleCount: number
  isTransitioning: boolean
  isProjectPaused: boolean
  setIsProjectPaused: (paused: boolean) => void
  setCarouselIndex: (index: number) => void
  setIsTransitioning: (transitioning: boolean) => void
  nextProject: () => void
  prevProject: () => void
  getClonedProjects: (projects: any[]) => any[]
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [style, setStyle] = React.useState<React.CSSProperties>({})
  
  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
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
      className="transition-transform duration-300 will-change-transform cursor-pointer"
    >
      {children}
    </div>
  )
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  CORE_CONTENT, 
  lazyData, 
  isClient, 
  isDataLoaded, 
  projectsSection,
  currentProjectIndex,
  carouselIndex,
  visibleCount,
  isTransitioning,
  isProjectPaused,
  setIsProjectPaused,
  setCarouselIndex,
  setIsTransitioning,
  nextProject,
  prevProject,
  getClonedProjects
}) => {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <SectionBackground color="from-pink-500/10 via-yellow-500/10 to-orange-500/10" particleCount={16} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={projectsSection.ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            projectsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {CORE_CONTENT.sections.projects.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {CORE_CONTENT.sections.projects.subtitle}
          </p>
        </div>

        {isClient && isDataLoaded && lazyData?.PROJECTS_DATA && (
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Projects Carousel */}
            <div
              className="overflow-hidden"
              onMouseEnter={() => setIsProjectPaused(true)}
              onMouseLeave={() => setIsProjectPaused(false)}
              onTouchStart={() => setIsProjectPaused(true)}
              onTouchEnd={() => {
                setTimeout(() => setIsProjectPaused(false), 2000)
              }}
              style={{ width: '100%' }}
            >
              <div
                className="flex"
                style={{
                  width: `${getClonedProjects(lazyData.PROJECTS_DATA).length * (100 / visibleCount)}%`,
                  transform: `translateX(-${(100 / getClonedProjects(lazyData.PROJECTS_DATA).length) * carouselIndex}%)`,
                  transition: 'transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)', // Smoother and longer
                }}
                                  onTransitionEnd={() => setIsTransitioning(false)}
              >
                {getClonedProjects(lazyData.PROJECTS_DATA).map((project: any, index: number) => (
                  <div
                    key={index}
                    className="w-full px-4"
                    style={{ maxWidth: `${100 / visibleCount}%`, flexBasis: `${100 / visibleCount}%` }}
                  >
                    <TiltCard>
                      <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 h-full flex flex-col">
                        <div className="relative overflow-hidden h-48 md:h-56 lg:h-64 flex-shrink-0">
                          <Image
                            src={project.image || "/placeholder.jpg"}
                            alt={project.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.jpg";
                            }}
                          />
                          {project.featured && (
                            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600">
                              {lazyData.PROJECT_CONTENT?.featuredBadge || "Featured"}
                            </Badge>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 pointer-events-none">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="secondary" asChild>
                                <ExternalLink href={project.github} aria-label={`View code for ${project.title}`}>
                                  <Github className="h-4 w-4" />
                                </ExternalLink>
                              </Button>
                              <Button size="sm" variant="secondary" asChild>
                                <ExternalLink href={project.live} aria-label={`View demo for ${project.title}`}>
                                  <LucideExternalLink className="h-4 w-4" />
                                </ExternalLink>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-6 flex flex-col flex-1">
                          <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 line-clamp-1">
                              {project.title}
                            </CardTitle>
                            <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                          </CardHeader>
                                                      <div className="space-y-4 flex-1 flex flex-col">
                              <div className="flex flex-wrap gap-1">
                                {project.tech.slice(0, 3).map((tech: string) => (
                                  <Badge
                                    key={tech}
                                    variant="outline"
                                    className="text-xs transition-all duration-300 hover:scale-105"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                                {project.tech.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{project.tech.length - 3}
                                  </Badge>
                                )}
                              </div>
                              {project.stats && (
                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
                                  {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                                    <div key={key} className="text-center">
                                      <div className="font-semibold text-primary text-sm">{value as string}</div>
                                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="flex-1" />
                              <div className="flex space-x-2 pt-2 mt-auto">
                                <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent text-xs">
                                  <ExternalLink href={project.github} aria-label={`View code for ${project.title}`}>
                                    <Github className="h-3 w-3 mr-1" />
                                    {lazyData.PROJECT_CONTENT?.buttons?.code || "Code"}
                                  </ExternalLink>
                                </Button>
                                <Button size="sm" asChild className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-xs">
                                  <ExternalLink href={project.live} aria-label={`View demo for ${project.title}`}>
                                    <LucideExternalLink className="h-3 w-3 mr-1" />
                                    Demo
                                  </ExternalLink>
                                </Button>
                              </div>
                            </div>
                        </CardContent>
                      </Card>
                    </TiltCard>
                  </div>
                ))}
              </div>
            </div>



            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {lazyData.PROJECTS_DATA.map((_: any, idx: number) => (
                <button
                  key={idx}
                  aria-label={`Go to project ${idx + 1}`}
                  className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                    (carouselIndex - visibleCount + lazyData.PROJECTS_DATA.length) % lazyData.PROJECTS_DATA.length === idx
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => {
                    setCarouselIndex(idx + visibleCount)
                    setIsProjectPaused(true)
                    setTimeout(() => setIsProjectPaused(false), 2000)
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </section>
  )
}

export default React.memo(ProjectsSection) 