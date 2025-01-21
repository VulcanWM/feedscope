import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    // images: ['https://recallit.vercel.app/recallit_banner.png'],
    type: "website",
    url: "https://www.feedscope.xyz",
    siteName: siteConfig.name
  },
  keywords: [
    "daily quiz",
    "online quizzes",
    "quiz streaks",
    "leaderboard trivia",
    "random quiz topics",
    "competitive quizzes",
    "daily trivia challenge",
    "test your knowledge",
    "fun educational quizzes",
    "quiz game platform",
    "streak-based quiz",
    "daily trivia game",
    "trivia leaderboard",
    "knowledge test game",
    "quiz competition"
  ],
  creator: 'VulcanWM',
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-EFLDVPPNL9`}
          />
          <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-EFLDVPPNL9', {
                      page_path: window.location.pathname,
                      });
                    `,
                }}
          />
        </body>
      </html>
    </>
  )
}
