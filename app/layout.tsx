import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";

import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] font-sans antialiased dark:from-[#000000] dark:to-[#000000]",
          GeistMono.className,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex h-max flex-col">
            <Navbar />
            <main className="max-w-8xl container mx-auto flex flex-grow items-center justify-center px-6 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
