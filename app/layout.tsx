import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: "Miliyon Ayalew - Full Stack Developer",
  description: "Modern portfolio website showcasing full stack development skills, projects, and experience.",
  generator: "Next.js",
  keywords: ["portfolio", "full stack developer", "web development", "React", "Next.js"],
  authors: [{ name: "Miliyon Ayalew" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: '/miliyon.png',
    shortcut: '/miliyon.png',
    apple: '/miliyon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
