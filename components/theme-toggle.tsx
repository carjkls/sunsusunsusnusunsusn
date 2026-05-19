"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("sun-neo-theme");
    const nextDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("sun-neo-theme", next ? "dark" : "light");
  }

  return (
    <Button type="button" variant="secondary" className="h-10 w-10 px-0" onClick={toggle} aria-label="Alternar tema">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
