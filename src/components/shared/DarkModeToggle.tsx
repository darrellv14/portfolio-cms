"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

import { Switch } from "~/components/ui/switch";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-[76px]" />;
  }

  const isDarkMode = theme === "dark";

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`h-5 w-5 transition-colors ${
          isDarkMode ? "text-muted-foreground" : "text-yellow-500"
        }`}
      />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Moon
        className={`h-5 w-5 transition-colors ${
          isDarkMode ? "text-destructive" : "text-muted-foreground"
        }`}
      />
    </div>
  );
}
