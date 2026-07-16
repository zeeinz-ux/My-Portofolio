import type { Metadata } from "next";
declare module "*.css";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { publicPath } from "@/lib/paths";

import type { Viewport } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zeeinz-ux.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl + (process.env.NEXT_PUBLIC_BASE_PATH || "")),
  title: "Zeinz - Full-Stack Developer Portfolio",
  description:
    "Portfolio of Zeinz, an Information Systems student and full-stack developer from Indonesia specializing in web and mobile development.",
  keywords: [
    "portfolio",
    "developer",
    "web developer",
    "full-stack",
    "Laravel",
    "React",
    "Next.js",
    "Flutter",
    "Indonesia",
  ],
  authors: [{ name: "Zeinz" }],
  creator: "Zeinz",
  openGraph: {
    title: "Zeinz - Full-Stack Developer Portfolio",
    description:
      "Portfolio of Zeinz, an Information Systems student and full-stack developer from Indonesia specializing in web and mobile development.",
    url: "/",
    siteName: "Zeinz Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: publicPath("/logo white.png"), width: 128, height: 128, alt: "Zeinz" }],
  },
  twitter: {
    card: "summary",
    title: "Zeinz - Full-Stack Developer Portfolio",
    description:
      "Portfolio of Zeinz, an Information Systems student and full-stack developer from Indonesia.",
    images: [publicPath("/logo white.png")],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: publicPath("/logo white.png"),
    apple: publicPath("/logo white.png"),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Zeinz",
              url: siteUrl + (process.env.NEXT_PUBLIC_BASE_PATH || ""),
              jobTitle: "Full-Stack Developer",
              description:
                "Information Systems student and full-stack developer from Indonesia specializing in web and mobile development.",
              sameAs: [
                "https://github.com/zeeinz-ux",
                "https://www.linkedin.com/in/aliffahriaditya",
                "https://www.instagram.com/zeeeinz",
              ],
            }),
          }}
        />
      </head>
      <body>
        <Providers>
          <LoadingScreen />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
