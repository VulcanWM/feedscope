export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "feedscope",
  description:
    "Join our daily quiz platform to test your knowledge, compete with others, and maintain streaks! A new random quiz every day with points and leaderboards to keep it competitive. Fun, educational, and engaging!",
  mainNav: [
    {
      title: "Daily Quiz",
      href: "/quiz",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Login",
      href: "/api/auth/signin",
    },
    {
      title: "Leaderboard",
      href: "/leaderboard",
    },
  ],
  links: {
    twitter: "https://twitter.com/vulcanwm",
    // github: "https://github.com/shadcn/ui",
    // docs: "https://ui.shadcn.com",
  },
}
