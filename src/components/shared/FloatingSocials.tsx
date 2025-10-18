"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Instagram,
  ArrowUp,
  ChevronDown,
  SendHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "~/components/ui/separator";
import { DarkModeToggle } from "./DarkModeToggle";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

const socialLinks = [
  { href: "https://github.com/darrellv14", icon: Github, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/your-profile/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/your-profile/",
    icon: Instagram,
    label: "Instagram",
  },
];

function smoothScrollTo(y: number) {
  window.scrollTo({ top: y, behavior: "smooth" });
}

export const FloatingSocials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [heroBottom, setHeroBottom] = useState(0);

  useEffect(() => {
    const heroElement = document.getElementById("hero");
    if (heroElement) {
      const rect = heroElement.getBoundingClientRect();
      const threshold = rect.bottom + window.scrollY + 50;
      setHeroBottom(threshold);
    }
    const toggleVisibility = () => {
      if (window.scrollY > heroBottom && heroBottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [heroBottom]);

  const handleScrollTop = () => smoothScrollTo(0);
  const handleScrollBottom = () =>
    smoothScrollTo(document.documentElement.scrollHeight);

  const handleShare = async () => {
    const shareData = {
      title: "Darrell Valentino's Portfolio",
      text: "Check out Darrell Valentino's portfolio!",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast.info("Sharing failed, link copied instead.");
      } catch (copyErr) {
        toast.error("Failed to share or copy link.");
        console.error("Error copying link:", copyErr);
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-background/80 fixed top-1/2 right-3 z-40 -translate-y-1/2 transform rounded-full px-3 py-4 shadow-lg backdrop-blur-sm md:hidden"
        >
          <div className="flex flex-col items-center gap-3">
            {/* --- Grup Sosial Media --- */}
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200"
              >
                <link.icon className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors duration-300" />
              </Link>
            ))}

            {/* --- Separator 1 --- */}
            <Separator
              orientation="horizontal"
              className="bg-border my-1 h-[1px] w-6"
            />

            {/* --- Grup Navigasi & Tema --- */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleScrollTop}
              aria-label="Scroll to top"
              className="group hover:bg-muted h-8 w-8 rounded-full"
            >
              <ArrowUp className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors duration-300" />
            </Button>

            {/* Panggil DarkModeToggle dengan prop showIcons={false} */}
            <div className="flex h-8 w-8 items-center justify-center">
              <DarkModeToggle showIcons={false} />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleScrollBottom}
              aria-label="Scroll to bottom"
              className="group hover:bg-muted h-8 w-8 rounded-full"
            >
              <ChevronDown className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors duration-300" />
            </Button>

            {/* --- Separator 2 --- */}
            <Separator
              orientation="horizontal"
              className="bg-border my-1 h-[1px] w-6"
            />

            {/* --- Tombol Share --- */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              aria-label="Share link"
              className="group hover:bg-muted h-8 w-8 rounded-full"
            >
              <SendHorizontal className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors duration-300" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
