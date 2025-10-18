"use client";

import { useState, useEffect, useRef } from "react";
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

function createSmoothScroller() {
  let rafId: number | null = null;

  const cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const scrollToY = (targetY: number, opts?: { duration?: number }) => {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    const duration = Math.max(300, Math.min(Math.abs(distance) * 0.6, 900));
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / (opts?.duration ?? duration));
      const eased = easeOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        rafId = null;
      }
    };

    cancel();
    rafId = requestAnimationFrame(step);
    return cancel;
  };

  return { scrollToY, cancel };
}

export const FloatingSocials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [heroBottom, setHeroBottom] = useState(0);

  const scrollerRef = useRef<ReturnType<typeof createSmoothScroller> | null>(null);
  if (!scrollerRef.current) scrollerRef.current = createSmoothScroller();

  useEffect(() => {
    const hero = document.getElementById("hero");
    const computeThreshold = () => {
      if (!hero) return 0;
      const rect = hero.getBoundingClientRect();
      const threshold = rect.bottom + window.scrollY + 50;
      return threshold;
    };

    const debounce = (fn: VoidFunction, delay = 80) => {
      let t: number | undefined;
      return () => {
        if (t) window.clearTimeout(t);
        t = window.setTimeout(fn, delay);
      };
    };

    const hysteresis = 24;
    let lastState = false;

    const onScroll = debounce(() => {
      const th = heroBottom || computeThreshold();
      const show = window.scrollY > th + hysteresis;
      const hide = window.scrollY < th - hysteresis;
      let next = lastState;
      if (!lastState && show) next = true;
      if (lastState && hide) next = false;
      if (next !== lastState) {
        lastState = next;
        setIsVisible(next);
      }
    }, 80);

    setHeroBottom(computeThreshold());
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [heroBottom]);

  const handleScrollTop = () => {
    scrollerRef.current!.scrollToY(0);
  };

  const handleScrollBottom = () => {
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    scrollerRef.current!.scrollToY(maxY);
  };

  useEffect(() => {
    const onWheelOrTouch = () => scrollerRef.current?.cancel();
    window.addEventListener("wheel", onWheelOrTouch, { passive: true });
    window.addEventListener("touchstart", onWheelOrTouch, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheelOrTouch);
      window.removeEventListener("touchstart", onWheelOrTouch);
    };
  }, []);

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
          transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.6 }}
          className="bg-background/80 fixed top-1/2 right-3 z-40 -translate-y-1/2 transform rounded-full px-3 py-4 shadow-lg backdrop-blur-sm md:hidden"
        >
          <div className="flex flex-col items-center gap-3">
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

            <Separator
              orientation="horizontal"
              className="bg-border my-1 h-[1px] w-6"
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={handleScrollTop}
              aria-label="Scroll to top"
              className="group hover:bg-muted h-8 w-8 rounded-full"
            >
              <ArrowUp className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors duration-300" />
            </Button>

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

            <Separator
              orientation="horizontal"
              className="bg-border my-1 h-[1px] w-6"
            />

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
