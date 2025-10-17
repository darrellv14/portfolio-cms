import { type Metadata } from "next";
import { Lexend } from "next/font/google";
import "~/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { MotionLazyProvider } from "~/components/providers/MotionLazyProvider";
import { Navbar } from "~/components/shared/Navbar";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "~/trpc/react";

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

function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -inset-[20vmax] blur-[100px]"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 25%, rgba(99,102,241,0.22) 0 38%, rgba(99,102,241,0) 70%)," +
            "radial-gradient(55% 45% at 85% 75%, rgba(14,165,233,0.18) 0 38%, rgba(14,165,233,0) 70%)",
          WebkitMaskImage:
            "radial-gradient(80% 80% at 50% 50%, #000 45%, transparent 85%)",
          maskImage:
            "radial-gradient(80% 80% at 50% 50%, #000 45%, transparent 85%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lexend.variable} h-full !scroll-smooth`}>
      <body className="bg-background min-h-screen antialiased">
        <GlobalBackground />

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
