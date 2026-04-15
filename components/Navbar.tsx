"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(8, 8, 8, 0.92)"
          : "rgba(8, 8, 8, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="select-none flex-shrink-0">
            <Image
              src="/images/nox-logo.png"
              alt="NOX Offensive Security"
              width={300}
              height={300}
              className="h-16 w-auto"
              priority
            />
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#servicos"
              className="font-mono text-xs uppercase tracking-widest hover:opacity-100 opacity-60"
              style={{ color: "var(--heading)", letterSpacing: "0.15em" }}
            >
              Serviços
            </a>
            <a
              href="#contato"
              className="font-mono text-xs uppercase tracking-widest hover:opacity-100 opacity-60"
              style={{ color: "var(--heading)", letterSpacing: "0.15em" }}
            >
              Contato
            </a>
          </nav>

          {/* CTA Button */}
          <a
            href="#contato"
            className="font-mono text-xs uppercase tracking-widest px-4 py-2 transition-all duration-200 hover:bg-white hover:text-black"
            style={{
              color: "var(--heading)",
              border: "1px solid rgba(255,255,255,0.4)",
              letterSpacing: "0.12em",
            }}
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </header>
  );
}
