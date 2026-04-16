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
            className="h-16 w-auto"
          />
          <p
            className="font-mono text-xs"
            style={{ color: "var(--muted)", letterSpacing: "0.04em" }}
          >
            © 2026 NOX OFFSEC — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
