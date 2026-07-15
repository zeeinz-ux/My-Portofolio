import type { Metadata } from "next";
declare module "*.css";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

import type { Viewport } from "next";

export const metadata: Metadata = {
  title: "Zeinz - Full-Stack Developer",
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
  ],
  icons: {
    icon: "/logo white.png",
    apple: "/logo white.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Prevent flash of wrong theme */}
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
