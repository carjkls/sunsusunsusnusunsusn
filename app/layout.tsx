import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sun Neo AI",
  description: "CRM financeiro e operacional para empresas solares."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
