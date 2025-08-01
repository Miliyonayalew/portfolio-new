import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import Marquee from "react-fast-marquee"

interface TestimonialsSectionProps {
  CORE_CONTENT: any
  lazyData: any
  isClient: boolean
  isDataLoaded: boolean
  currentTestimonialIndex: number
  isTestimonialPaused: boolean
  setIsTestimonialPaused: (paused: boolean) => void
  setCurrentTestimonialIndex: (index: number) => void
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ 
  CORE_CONTENT, 
  lazyData, 
  isClient, 
  isDataLoaded, 
  currentTestimonialIndex,
  isTestimonialPaused,
  setIsTestimonialPaused,
  setCurrentTestimonialIndex
}) => {
  return (
    <section className="py-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {CORE_CONTENT.sections.testimonials.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {CORE_CONTENT.sections.testimonials.subtitle}
          </p>
        </div>

        {isClient && isDataLoaded && lazyData?.TESTIMONIALS_DATA && (
          <div className="relative max-w-5xl mx-auto">
            {/* Left gradient shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
            
            {/* Right gradient shadow */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-hidden rounded-lg cursor-pointer relative">
              <Marquee
                speed={30}
                pauseOnHover={true}
                pauseOnClick={false}
                gradient={false}
                gradientWidth={0}
                direction="left"
                delay={0}
                loop={0}
                className="py-4"
              >
                {lazyData.TESTIMONIALS_DATA.map((testimonial: any, index: number) => (
                  <div 
                    key={`testimonial-${index}`} 
                    className="w-80 flex-shrink-0 px-4"
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group h-full cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Quote className="h-6 w-6 text-primary mx-auto mb-3 opacity-50 group-hover:scale-105 group-hover:opacity-75 transition-all duration-300" />
                        <blockquote className="text-sm text-muted-foreground leading-relaxed mb-4 italic group-hover:text-foreground transition-colors duration-300 line-clamp-4">
                          "{testimonial.content}"
                        </blockquote>
                        <div className="text-center space-y-1">
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-sm">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                            {testimonial.role}
                          </div>
                          <div className="text-xs text-primary font-medium group-hover:text-blue-600 transition-colors duration-300">
                            {testimonial.company}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        )}
      </main>
    </section>
  )
}

export default React.memo(TestimonialsSection) 