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
  { href: "#about", label: "About Me" },
  { href: "#experience", label: "Experiences" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAdmin = session?.user.email === env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <header
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
          <span className="sr-only">Delvin&apos;s Portfolio</span>
        </Link>

        <nav className="pointer-events-auto absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
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
              <Link
                key={link.href}
                href={link.href}
                className="hover:bg-muted w-full rounded-md p-2 text-center text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
