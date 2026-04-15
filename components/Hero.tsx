export default function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden hero-grid"
      style={{ minHeight: "100dvh" }}
    >
      {/* Radial glow — top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: "-10%",
          right: "-10%",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="h-px w-8 flex-shrink-0"
              style={{ background: "var(--muted)" }}
            />
            <span
              className="font-mono text-xs tracking-widest"
              style={{ color: "var(--muted)", letterSpacing: "0.12em" }}
            >
              {"//"} Offensive Security
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold leading-none mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", lineHeight: 1.05 }}
          >
            <span
              className="block"
              style={{ color: "var(--heading)" }}
            >
              Segurança
            </span>
            <span
              className="block text-outlined"
              style={{ lineHeight: 1.1 }}
            >
              Ofensiva
            </span>
            <span
              className="block"
              style={{ color: "var(--heading)" }}
            >
              de verdade.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-xl font-light"
            style={{ color: "var(--text)" }}
          >
            Encontramos as vulnerabilidades antes que os atacantes o façam.
            Pentest, AppSec e estratégias de segurança sob medida para proteger
            o que importa.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contato"
              className="font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 inline-block transition-all duration-200 hover:opacity-85 active:scale-95"
              style={{
                background: "var(--heading)",
                color: "#000000",
                letterSpacing: "0.12em",
              }}
            >
              Solicitar Assessment
            </a>
            <a
              href="#servicos"
              className="font-mono text-xs uppercase tracking-widest px-6 py-3 inline-block transition-all duration-200 hover:bg-white hover:text-black"
              style={{
                color: "var(--heading)",
                border: "1px solid rgba(255,255,255,0.25)",
                letterSpacing: "0.12em",
              }}
            >
              Nossos Serviços →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg))",
        }}
      />
    </section>
  );
}
