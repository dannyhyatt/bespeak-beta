import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Head from 'next/head'
import { Viewport } from 'next';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'


const APP_NAME = "Bespeak";
const APP_DEFAULT_TITLE = "Bespeak";
const APP_TITLE_TEMPLATE = "%s | Bespeak";
const APP_DESCRIPTION = "a social network for writers";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
}

export const viewport: Viewport = {
  themeColor: "hsl(200 20% 98%)",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}
