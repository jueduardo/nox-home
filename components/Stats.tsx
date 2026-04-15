const stats = [
  { value: ">500", label: "Vulnerabilidades Encontradas" },
  { value: "99%", label: "Taxa de Sucesso" },
  { value: "24/7", label: "Suporte & Monitoramento" },
  { value: "OWASP", label: "Metodologia Base" },
];

export default function Stats() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
              style={{
                borderRight:
                  i < stats.length - 1
                    ? "1px solid var(--border)"
                    : undefined,
              }}
            >
              <span
                className="font-mono font-bold mb-2 leading-none"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "var(--heading)",
                }}
              >
                {stat.value}
              </span>
              <span
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: "var(--muted)", letterSpacing: "0.1em" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
