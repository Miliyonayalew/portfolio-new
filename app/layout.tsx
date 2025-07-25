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
  icons: {
    icon: '/miliyon.webp',
    shortcut: '/miliyon.webp',
    apple: '/miliyon.webp',
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('portfolio-theme');
                  if (theme === 'system' || !theme) {
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    document.documentElement.classList.add(systemTheme);
                  } else {
                    document.documentElement.classList.add(theme);
                  }
                  
                  // Listen for system theme changes
                  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                    if (localStorage.getItem('portfolio-theme') === 'system') {
                      const newTheme = e.matches ? 'dark' : 'light';
                      document.documentElement.classList.remove('light', 'dark');
                      document.documentElement.classList.add(newTheme);
                    }
                  });
                } catch (e) {
                  console.warn('Theme initialization failed:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
