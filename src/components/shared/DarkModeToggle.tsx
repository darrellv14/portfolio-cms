// ~/components/shared/DarkModeToggle.tsx (Updated)
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { useEffect } from "react";

import { Switch } from "~/components/ui/switch";

interface DarkModeToggleProps {
  showIcons?: boolean;
}

export function DarkModeToggle({ showIcons = true }: DarkModeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`h-6 ${showIcons ? "w-[76px]" : "w-11"}`} />;
  }

  const isDarkMode = theme === "dark";

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className={`flex items-center ${showIcons ? "gap-2" : ""}`}>
      {showIcons && (
        <Sun
          className={`h-5 w-5 transition-colors ${
            isDarkMode ? "text-muted-foreground" : "text-yellow-500"
          }`}
        />
      )}
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      {showIcons && (
        <Moon
          className={`h-5 w-5 transition-colors ${
            isDarkMode ? "text-destructive" : "text-muted-foreground"
          }`}
        />
      )}
    </div>
  );
}
