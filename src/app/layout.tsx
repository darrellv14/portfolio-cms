import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/components/shared/Navbar";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/theme-provider";
import { MotionLazyProvider } from "~/components/providers/MotionLazyProvider";

export const metadata: Metadata = {
  title: "Delvin's Portfolio",
  description: "My Personal Portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} !scroll-smooth`}>
      <body>
        <SessionProvider>
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <MotionLazyProvider>
                <Navbar />
                <main className="container mx-auto px-4 py-8 md:px-6">
                  {children}
                </main>
                <Toaster />
              </MotionLazyProvider>
            </ThemeProvider>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
