import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOX OFFSEC — Offensive Security",
  description:
    "Encontramos as vulnerabilidades antes que os atacantes o façam. Pentest, AppSec e estratégias de segurança sob medida para proteger o que importa.",
  keywords: [
    "pentest",
    "offensive security",
    "appsec",
    "segurança ofensiva",
    "teste de intrusão",
    "vulnerabilidades",
    "cybersecurity",
    "NOX OFFSEC",
  ],
  authors: [{ name: "NOX OFFSEC" }],
  openGraph: {
    title: "NOX OFFSEC — Offensive Security",
    description:
      "Encontramos as vulnerabilidades antes que os atacantes o façam. Pentest, AppSec e estratégias de segurança sob medida.",
    type: "website",
    locale: "pt_BR",
    siteName: "NOX OFFSEC",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOX OFFSEC — Offensive Security",
    description:
      "Encontramos as vulnerabilidades antes que os atacantes o façam.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
