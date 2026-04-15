const pentestTags = ["Web Apps", "API", "Infra", "Cloud", "Mobile"];
const appsecTags = ["Shift Left", "Code Review", "SAST / DAST", "DevSecOps"];

function Tag({ label }: { label: string }) {
  return (
    <span
      className="font-mono inline-block px-2 py-1"
      style={{
        fontSize: "10px",
        color: "var(--muted)",
        background: "#0d0d0d",
        border: "1px solid var(--border)",
        letterSpacing: "0.05em",
      }}
    >
      {label}
    </span>
  );
}

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: 48,
        height: 48,
        border: "1px solid var(--border)",
        background: "var(--bg)",
        fontSize: "1.25rem",
      }}
    >
      {children}
    </div>
  );
}

export default function Services() {
  return (
    <section id="servicos" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <span
            className="font-mono text-xs tracking-widest block mb-4"
            style={{ color: "var(--muted)", letterSpacing: "0.12em" }}
          >
            {"//"} Serviços
          </span>
          <h2
            className="font-bold mb-4"
            style={{
              color: "var(--heading)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.1,
            }}
          >
            O que fazemos
          </h2>
          <p
            className="text-base leading-relaxed font-light"
            style={{ color: "var(--text)" }}
          >
            Atuação ofensiva com metodologias reconhecidas para identificar e
            mitigar riscos reais no seu ambiente.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 — Pentest */}
          <div
            className="service-card p-8 flex flex-col gap-6"
            style={{ background: "var(--surface)" }}
          >
            <div className="flex items-start gap-4">
              <IconBox>⚡</IconBox>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-xl mb-3"
                  style={{ color: "var(--heading)" }}
                >
                  Pentest
                </h3>
                <p
                  className="text-sm leading-relaxed font-light"
                  style={{ color: "var(--text)" }}
                >
                  Testes de intrusão em infraestrutura, aplicações web, APIs e
                  ambientes cloud. Simulamos ataques reais para expor falhas
                  críticas antes que sejam exploradas.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {pentestTags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>

          {/* Card 2 — AppSec */}
          <div
            className="service-card p-8 flex flex-col gap-6"
            style={{ background: "var(--surface)" }}
          >
            <div className="flex items-start gap-4">
              <IconBox>◆</IconBox>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-xl mb-3"
                  style={{ color: "var(--heading)" }}
                >
                  AppSec — Shift Left
                </h3>
                <p
                  className="text-sm leading-relaxed font-light"
                  style={{ color: "var(--text)" }}
                >
                  Segurança integrada ao ciclo de desenvolvimento. Ajudamos a
                  construir software seguro desde o design, com revisão de
                  código, SAST/DAST e práticas DevSecOps.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {appsecTags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
