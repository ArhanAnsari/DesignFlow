import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DesignFlow - AI-Powered Lead Generation & CRM Platform",
  description: "DesignFlow is an intelligent SaaS solution that helps businesses discover, manage, and nurture leads using AI-powered insights. Scale your customer relationships effortlessly.",
  keywords: [
    "lead generation",
    "CRM platform",
    "AI SaaS",
    "customer relationship management",
    "business growth",
    "lead management",
    "sales automation",
  ],
  authors: [{ name: "DesignFlow Team" }],
  creator: "DesignFlow",
  publisher: "DesignFlow",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "DesignFlow",
    title: "DesignFlow - AI-Powered Lead Generation & CRM Platform",
    description:
      "Discover, manage, and nurture leads with AI-powered insights. Build lasting customer relationships and scale your business.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DesignFlow - Lead Generation Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DesignFlow - AI-Powered Lead Generation & CRM",
    description:
      "Effortlessly discover and manage leads with AI-powered insights. Transform your sales process.",
    images: ["/og-image.png"],
    creator: "@DesignFlow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ theme: dark }}>
      <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
