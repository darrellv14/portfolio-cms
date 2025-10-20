import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://darrellvalentino.com";

  return {
    rules: [
      {
        userAgent: "*", // Semua bot
        allow: "/", // Izinkan akses ke semua halaman
        disallow: [
          "/api/", // Block API routes dari indexing
          "/admin/", // Block admin pages (jika ada)
          "/_next/static/", // Block Next.js static files
          "/*.json$", // Block JSON files
          "/*/edit", // Block edit pages
        ],
      },
      {
        userAgent: "Googlebot", // Khusus Google
        allow: "/",
        disallow: ["/api/", "/admin/"],
        crawlDelay: 0, // No delay - crawl as fast as possible!
      },
      {
        userAgent: "Googlebot-Image", // Google Image Bot
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Bingbot", // Bing
        allow: "/",
        disallow: ["/api/", "/admin/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Slurp", // Yahoo
        allow: "/",
        disallow: ["/api/", "/admin/"],
        crawlDelay: 0,
      },
      {
        userAgent: "DuckDuckBot", // DuckDuckGo
        allow: "/",
        disallow: ["/api/", "/admin/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Baiduspider", // Baidu (China)
        allow: "/",
        disallow: ["/api/", "/admin/"],
        crawlDelay: 1,
      },
      {
        userAgent: "YandexBot", // Yandex (Russia)
        allow: "/",
        disallow: ["/api/", "/admin/"],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`, // Link ke sitemap
    host: baseUrl, // Preferred domain
  };
}
