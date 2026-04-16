const pentestTags = ["Web Apps", "API", "Infra", "Cloud", "Mobile"];
const appsecTags = ["Shift Left", "Code Review", "SAST / DAST", "DevSecOps"];
const consultoriaTags = ["Risk Assessment", "Políticas", "Treinamento", "Conformidade"];

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
        <div className="reveal mb-14 max-w-2xl">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 — Consultoria */}
          <div
            className="service-card reveal-d1 p-8 flex flex-col gap-6"
            style={{ background: "var(--surface)" }}
          >
            <div className="flex items-start gap-4">
              <IconBox>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </IconBox>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-xl mb-3"
                  style={{ color: "var(--heading)" }}
                >
                  Consultoria em Segurança
                </h3>
                <p
                  className="text-sm leading-relaxed font-light"
                  style={{ color: "var(--text)" }}
                >
                  Avaliação de maturidade, definição de políticas e
                  treinamento de equipes. Construímos uma cultura de
                  segurança adaptada ao contexto e ao risco da sua empresa.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {consultoriaTags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>

          {/* Card 2 — AppSec */}
          <div
            className="service-card reveal-d2 p-8 flex flex-col gap-6"
            style={{ background: "var(--surface)" }}
          >
            <div className="flex items-start gap-4">
              <IconBox>◆</IconBox>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-xl mb-3"
                  style={{ color: "var(--heading)" }}
                >
                  Segurança no Desenvolvimento
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

          {/* Card 3 — Pentest */}
          <div
            className="service-card reveal-d3 p-8 flex flex-col gap-6 md:col-span-2 lg:col-span-1"
            style={{ background: "var(--surface)" }}
          >
            <div className="flex items-start gap-4">
              <IconBox>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20}>
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="12" y1="3" x2="12" y2="1" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="3" y1="12" x2="1" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                </svg>
              </IconBox>
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
        </div>
      </div>
    </section>
  );
}
