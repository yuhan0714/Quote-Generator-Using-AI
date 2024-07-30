import { SiteConfig } from "@/types/siteConfig"

const baseSiteConfig = {
  name: "Quote Generator: Create Inspirational & AI-Generated Quotes",
  description:
    "Discover our versatile quote generator for inspirational, incorrect, and custom quotes. Features include an AI quote generator and an incorrect quote generator.",
  url: "https://quotegenerator.cc",
  ogImage: "https://quotegenerator.cc/og.jpg",
  metadataBase: new URL("https://www.quotegenerator.cc"),
  keywords: ["Quote Generator", "Incorrect Quote Generator", "Inspirational Quote Generator", "AI Quote Generator", "Random Quote Generator"],
  authors: [
    {
      name: "weijunext",
      url: "https://quotegenerator.cc",
    }
  ],
  creator: '@weijunext',
  themeColor: '#fff',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  links: {
    twitter: "https://x.com/weijunext",
    github: "https://github.com/weijunext/smartexcel",
  },
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
}
