import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        muted: "hsl(var(--muted))",
        solar: "hsl(var(--solar))",
        green: "hsl(var(--green))",
        red: "hsl(var(--red))",
        blue: "hsl(var(--blue))"
      },
      boxShadow: {
        panel: "0 18px 48px rgba(25, 38, 49, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
