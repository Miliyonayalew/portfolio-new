import React from "react"
import { Mail, MapPin, Github, Linkedin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SectionBackground from "./section-background"
import ContactForm from "./contact-form"
import Link from "next/link"

interface ContactSectionProps {
  CORE_CONTENT: any
  lazyData: any
  isClient: boolean
  isDataLoaded: boolean
  ContactFormProps: {
    lazyData: any
    isClient: boolean
    isDataLoaded: boolean
  }
}

const ContactSection: React.FC<ContactSectionProps> = ({ 
  CORE_CONTENT, 
  lazyData, 
  isClient, 
  isDataLoaded,
  ContactFormProps
}) => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <SectionBackground color="from-yellow-500/10 via-indigo-500/10 to-blue-500/10" particleCount={10} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {CORE_CONTENT.sections.contact.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {CORE_CONTENT.sections.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.sectionTitle : "Let's work together"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.description : "Whether you have a project in mind or just want to chat about technology, I'd love to hear from you."}
              </p>
            </div>

            {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT && (
              <div className="space-y-4">
                {[
                  { icon: Mail, label: lazyData.CONTACT_CONTENT.contactInfo.email, href: `mailto:${lazyData.CONTACT_CONTENT.contactInfo.email}` },
                  { icon: MapPin, label: lazyData.CONTACT_CONTENT.contactInfo.location, href: "#" },
                  { icon: MapPin, label: lazyData.CONTACT_CONTENT.contactInfo.phone, href: "#" },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            )}

                         {(!isClient || !isDataLoaded || !lazyData?.CONTACT_CONTENT) && (
               <div className="space-y-4">
                 <a
                   href="mailto:contact@example.com"
                   className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-200"
                 >
                   <Mail className="h-5 w-5 flex-shrink-0" />
                   <span>contact@example.com</span>
                 </a>
                 <a
                   href="#"
                   className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-200"
                 >
                   <MapPin className="h-5 w-5 flex-shrink-0" />
                   <span>Addis Ababa, Ethiopia</span>
                 </a>
                 <a
                   href="#"
                   className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-200"
                 >
                   <MapPin className="h-5 w-5 flex-shrink-0" />
                   <span>+251 912 345 678</span>
                 </a>
               </div>
             )}

             <div className="flex space-x-4">
               {[
                 { icon: Github, href: "https://github.com/Miliyonayalew", label: "GitHub" },
                 { icon: Linkedin, href: "https://www.linkedin.com/in/miliyon-ayalew", label: "LinkedIn" },
                 { icon: Mail, href: "mailto:miliayalew@gmail.com", label: "Email" },
               ].map(({ icon: Icon, href, label }) => (
                 <Link
                   key={label}
                   href={href}
                   className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                   aria-label={label}
                   target={label !== 'Email' ? '_blank' : undefined}
                   rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                 >
                   <Icon className="h-6 w-6" />
                 </Link>
               ))}
             </div>
          </div>

          <Card className="hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20 h-full min-h-0 flex flex-col">
            <CardHeader>
              <CardTitle>
                {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.title : "Send me a message"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px] flex flex-col justify-center w-full h-full">
              <ContactForm {...ContactFormProps} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default React.memo(ContactSection) 