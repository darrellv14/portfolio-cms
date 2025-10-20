import "~/styles/globals.css";
import { type Metadata } from "next";
import { Lexend } from "next/font/google";

import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/components/shared/Navbar";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/theme-provider";
import { MotionLazyProvider } from "~/components/providers/MotionLazyProvider";
import { Footer } from "~/components/shared/Footer";

// === SEO Konfigurasi ===
const siteUrl = "https://darrellvalentino.com";

export const metadata: Metadata = {
  // === INFORMASI DASAR ===
  metadataBase: new URL(siteUrl),
  title: {
    default: "Darrell Valentino | Personal Website",
    template: "%s | Darrell Valentino",
  },
  description:
    "Portofolio Darrell Valentino, Full-Stack Web Developer berbasis di Jakarta, lulusan Sistem Informasi ITS. Lihat proyek React, Next.js, TypeScript saya.", // Deskripsi kaya keyword
  applicationName: "Darrell Valentino Portfolio",
  authors: [{ name: "Darrell Valentino", url: siteUrl }],
  creator: "Darrell Valentino",
  publisher: "Darrell Valentino",

  // === KEYWORDS (Penting untuk konteks) ===
  keywords: [
    "Darrell Valentino",
    "Darrell",
    "Valentino",
    "Portfolio",
    "Full-Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Jakarta",
    "Indonesia",
    "Sistem Informasi",
    "ITS",
    "Institut Teknologi Sepuluh Nopember",
    "HMSI",
    "Sistem Informasi ITS",
    "Pengembang Web",
    "Prisma",
    "tRPC",
    "Tailwind CSS",
  ],

  // === ROBOTS & INDEXING ===
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
  alternates: {
    canonical: siteUrl,
  },

  // === OPEN GRAPH (Untuk Facebook, LinkedIn, dll.) ===
  openGraph: {
    title: "Darrell Valentino - Full-Stack Developer Portfolio",
    description:
      "Lihat proyek dan pengalaman Darrell Valentino, seorang Full-Stack Web Developer dari Jakarta (Sistem Informasi ITS).",
    url: siteUrl,
    siteName: "Darrell Valentino Portfolio",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Darrell Valentino Portfolio Preview",
      },
    ],
    locale: "id_ID",
    type: "profile",
    username: "darrellv14",
  },

  // === TWITTER CARD (Untuk Twitter/X) ===
  twitter: {
    card: "summary_large_image",
    title:
      "Darrell Valentino - Full-Stack Developer Portfolio (React, Next.js, TS)",
    description:
      "Portofolio Darrell Valentino, Full-Stack Web Developer di Jakarta.",
    site: "@nanangnursamsu",
    creator: "@nanangnursamsu",
    images: [`${siteUrl}/og-image.png`],
  },

  // === IKON & MANIFEST ===
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
      { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
  manifest: `${siteUrl}/site.webmanifest`,

  // === INFORMASI TAMBAHAN ===
  formatDetection: {
    telephone: false,
  },
};
// === Akhir SEO Konfigurasi ===

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-lexend",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // === JSON-LD Structured Data ===
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Darrell Valentino",
      alternateName: "Delvin",
      url: siteUrl,
      image: `${siteUrl}/profile-image.webp`,
      sameAs: [
        "https://github.com/darrellv14",
        "https://id.linkedin.com/in/darrellvalentino",
        "https://www.instagram.com/darrellwidjaja/",
      ],
      jobTitle: "Full-Stack Web Developer",
      worksFor: {
        "@type": "Organization",
        name: "PT Bank Central Asia (BCA) Tbk",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Institut Teknologi Sepuluh Nopember",
        url: "https://www.its.ac.id/",
      },
      knowsAbout: [
        "Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "tRPC",
        "Tailwind CSS",
        "Sistem Informasi",
        "Software Engineering",
        "5026221086",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta",
        addressCountry: "ID",
      },
    },
  };
  // === Akhir JSON-LD ===

  return (
    <html
      lang="en"
      className={`${lexend.variable} h-full !scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground flex min-h-dvh min-h-screen flex-col antialiased">
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
                <div className="flex-1">
                  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 2xl:max-w-[90rem]">
                    <main>{children}</main>
                  </div>
                </div>
                <Footer />
                <Toaster />
              </MotionLazyProvider>
            </ThemeProvider>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
