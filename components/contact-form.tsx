import React, { useState, useCallback, useRef } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader2, Send, CheckCircle } from 'lucide-react'

interface ContactFormProps {
  lazyData: any
  isClient: boolean
  isDataLoaded: boolean
}

const ContactForm: React.FC<ContactFormProps> = React.memo(({ lazyData, isClient, isDataLoaded }) => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleContactFormSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFormSubmitting(true)
    setFormError(null)
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        setFormSubmitted(true)
        form.reset()
      } else {
        setFormError(result.error || 'Failed to send message.')
      }
    } catch (err) {
      setFormError('Failed to send message.')
    } finally {
      setIsFormSubmitting(false)
    }
  }, [])

  return (
    <>
      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center w-full h-full py-8 space-y-4 animate-fade-in max-w-full break-words overflow-hidden" aria-live="polite">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-bounce-in" />
          <h3 className="text-xl font-semibold text-green-600 max-w-full break-words overflow-hidden">{isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.success.title : "Message Sent!"}</h3>
          <p className="text-muted-foreground max-w-full break-words overflow-hidden">{isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.success.message : "Thank you for reaching out. I'll get back to you soon!"}</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleContactFormSubmit} className="flex flex-col h-full w-full space-y-4">
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <div className="w-full">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.name : "Name"}
              </label>
              <Input
                id="name"
                name="name"
                placeholder={isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.namePlaceholder : "Your name"}
                required
                className="transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-background/50 w-full"
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.email : "Email"}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.emailPlaceholder : "your@email.com"}
                required
                className="transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-background/50 w-full"
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.subject : "Subject"}
            </label>
            <Input
              id="subject"
              name="subject"
              placeholder={isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.subjectPlaceholder : "Inquiry"}
              required
              className="transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-background/50 w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.message : "Message"}
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder={isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.messagePlaceholder : "Tell me about your project..."}
              rows={5}
              required
              className="transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-background/50 w-full min-w-0 max-w-full"
            />
          </div>
          {formError && (
            <div className="text-red-500 text-sm transition-all duration-500 ease-in-out opacity-100 translate-y-0 max-w-full break-words overflow-hidden text-center mx-auto" aria-live="polite">
              {formError}
            </div>
          )}
          <Button
            type="submit"
            className={`w-full group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-primary/30 ${isFormSubmitting ? 'animate-pulse scale-98' : ''}`}
            disabled={isFormSubmitting}
          >
            {isFormSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.buttons.sending : "Sending..."}
              </>
            ) : (
              <>
                {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.buttons.send : "Send Message"}
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      )}
    </>
  )
})

export default ContactForm 