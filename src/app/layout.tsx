import "~/styles/globals.css";
import { type Metadata } from "next";
import { Lexend } from "next/font/google";

import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/components/shared/Navbar";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/theme-provider";
import { MotionLazyProvider } from "~/components/providers/MotionLazyProvider";

export const metadata: Metadata = {
  title: "Darrell's Portfolio",
  description: "My Personal Portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-lexend",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lexend.variable} !scroll-smooth`}>
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
                <main className="container mx-auto px-4 md:px-6">
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
