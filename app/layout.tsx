import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Comunidade Cristã Ágape",
  description: "Pessoas formadas por Jesus em uma comunidade viva, para amar, servir e transformar a cidade.",
  applicationName: "Ágape",
  appleWebApp: { capable: true, title: "Ágape", statusBarStyle: "black-translucent" },
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#06153a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.className} ${outfit.variable} ${display.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
