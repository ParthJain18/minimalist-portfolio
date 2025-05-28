import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Parth Jain - AI & Full Stack Developer",
    template: "%s | Parth Jain"
  },
  description: "Aspiring AI and Software Engineer with hands-on experience in research, full-stack development, android development, and building AI-powered tools to solve real-world problems.",
  openGraph: {
    url: "https://parthjain.works/",
    title: "Parth Jain - AI & Full Stack Developer",
    description: "Aspiring AI and Software Engineer with hands-on experience in research, full-stack development, android development, and building AI-powered tools to solve real-world problems.",
    images: [
      {
        url: "https://parthjain.works/images/profile-pic.jpeg",
        width: 1200,
        height: 630,
        alt: "Parth Jain - AI & Full Stack Developer",
      }
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
