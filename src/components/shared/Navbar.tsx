"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Image from "next/image";
import { DarkModeToggle } from "./DarkModeToggle";
import { env } from "~/env";

const navLinks = [
  { href: "#hero", label: "About Me" },
  { href: "#experience", label: "Experiences" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY: number) {
  if (prefersReducedMotion()) {
    window.scrollTo({ top: targetY, behavior: "auto" });
    return;
  }

  const startY = window.scrollY;
  const delta = targetY - startY;
  if (Math.abs(delta) < 1) return;

  const duration = Math.max(400, Math.min(1000, Math.abs(delta) * 0.5));
  const start = performance.now();

  function frame(now: number) {
    const t = Math.min(1, (now - start) / duration);
    const y = startY + delta * easeInOutCubic(t);
    window.scrollTo(0, y);
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function getNavbarHeight() {
  const el = document.querySelector<HTMLElement>("header[data-navbar='true']");
  return el ? el.getBoundingClientRect().height : 80;
}

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const navH = getNavbarHeight();
  const top = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - navH - 8,
  );
  smoothScrollTo(top);
}

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const isAdmin = session?.user.email === env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const sections = navLinks.map((link) => link.href.substring(1));
      const navH = getNavbarHeight();
      const scrollPosition = window.scrollY + navH + 24;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const onPopState = () => {
      if (location.hash) {
        setTimeout(() => scrollToHash(location.hash), 0);
      }
    };

    onScroll();
    if (location.hash) {
      setTimeout(() => scrollToHash(location.hash), 0);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const getInitials = (nameOrEmail?: string | null) => {
    if (!nameOrEmail) return "??";
    const nameParts = nameOrEmail.split(" ");
    if (nameParts.length > 1) {
      return (
        (nameParts[0]?.[0] ?? "") + (nameParts[1]?.[0] ?? "")
      ).toUpperCase();
    }
    const emailInitial = nameOrEmail.split("@")[0]?.[0] ?? "";
    return emailInitial.toUpperCase();
  };

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    if (isMenuOpen) setIsMenuOpen(false);

    const targetId = href.substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      const navH = getNavbarHeight();
      const top = Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - navH - 8,
      );
      smoothScrollTo(top);
      window.history.pushState(null, "", href);
      setActiveSection(targetId);
    } else {
      window.history.pushState(null, "", href);
    }
  };

  return (
    <header
      data-navbar="true"
      data-scrolled={scrolled}
      className="bg-background/70 supports-[backdrop-filter]:bg-background/60 data-[scrolled=true]:bg-background/80 sticky top-0 z-50 border-b backdrop-blur transition-all duration-300 data-[scrolled=true]:shadow-sm"
    >
      <div
        className="relative container mx-auto flex h-14 items-center justify-between px-8 transition-[height,padding] duration-300 data-[scrolled=true]:h-20 md:h-16 md:px-10 md:data-[scrolled=true]:h-18"
        data-scrolled={scrolled}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Delvin"
            width={72}
            height={72}
            className="transition-transform duration-300 data-[scrolled=true]:scale-110"
            priority
            data-scrolled={scrolled}
          />
          <span className="sr-only">Darrell&apos;s Portfolio</span>
        </Link>

        <nav className="pointer-events-auto absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              aria-current={
                activeSection === link.href.substring(1) ? "page" : undefined
              }
              className={`text-sm font-medium transition-colors ${
                activeSection === link.href.substring(1)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DarkModeToggle />

          {status === "loading" && (
            <div className="bg-muted h-10 w-20 animate-pulse rounded-md" />
          )}

          {status === "unauthenticated" && (
            <Button onClick={() => signIn("google")}>Login</Button>
          )}

          {status === "authenticated" && session.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full p-0 transition-transform duration-300 data-[scrolled=true]:scale-110"
                  data-scrolled={scrolled}
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={session.user.image ?? undefined}
                      alt={session.user.name ?? "User"}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <AvatarFallback className="text-xs font-medium">
                      {getInitials(session.user.name ?? session.user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/testimonials">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center gap-4 p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className={`w-full rounded-md p-2 text-center text-sm font-medium ${
                  activeSection === link.href.substring(1)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
