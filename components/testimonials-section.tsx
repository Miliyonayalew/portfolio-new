import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {CORE_CONTENT.sections.testimonials.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {CORE_CONTENT.sections.testimonials.subtitle}
          </p>
        </div>

        {isClient && isDataLoaded && lazyData?.TESTIMONIALS_DATA && (
          <div className="relative max-w-4xl mx-auto">
            <div 
              className="overflow-hidden"
              onMouseEnter={() => setIsTestimonialPaused(true)}
              onMouseLeave={() => setIsTestimonialPaused(false)}
              onTouchStart={() => setIsTestimonialPaused(true)}
              onTouchEnd={() => {
                setTimeout(() => setIsTestimonialPaused(false), 3000)
              }}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
              >
                {lazyData.TESTIMONIALS_DATA.map((testimonial: any, index: number) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-8 text-center">
                        <Quote className="h-8 w-8 text-primary mx-auto mb-4 opacity-50" />
                        <blockquote className="text-lg text-muted-foreground leading-relaxed mb-8 italic">
                          "{testimonial.content}"
                        </blockquote>
                        <div className="text-center space-y-2">
                          <div className="font-semibold text-foreground">{testimonial.name}</div>
                          <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                          <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center space-x-2 mt-8">
              {lazyData.TESTIMONIALS_DATA.map((_: any, index: number) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonialIndex
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => {
                    setCurrentTestimonialIndex(index)
                    setIsTestimonialPaused(true)
                    setTimeout(() => setIsTestimonialPaused(false), 2000)
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default React.memo(TestimonialsSection) 