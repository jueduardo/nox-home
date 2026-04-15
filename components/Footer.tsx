import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="py-8"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/images/nox-logo.png"
            alt="NOX"
            width={60}
            height={60}
            className="h-8 w-auto opacity-50"
          />
          <p
            className="font-mono text-xs"
            style={{ color: "var(--muted)", letterSpacing: "0.04em" }}
          >
            © 2026 NOX OFFSEC — Todos os direitos reservados.
          </p>

          {/* <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs hover:opacity-100 opacity-40 transition-opacity duration-200"
              style={{ color: "var(--heading)" }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs hover:opacity-100 opacity-40 transition-opacity duration-200"
              style={{ color: "var(--heading)" }}
            >
              GitHub
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
