"use client";

import { useState, FormEvent } from "react";

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  color: "var(--heading)",
  padding: "0.625rem 0.875rem",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.15s ease",
  fontFamily: "inherit",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-mono text-xs uppercase tracking-widest"
        style={{ color: "var(--muted)", letterSpacing: "0.12em" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const EMPTY = { nome: "", email: "", servico: "", mensagem: "" };

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null);
  const [fields, setFields] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const borderColor = (field: string) =>
    focused === field ? "#ffffff" : "var(--border)";

  const set = (key: keyof typeof EMPTY) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erro ao enviar. Tente novamente.");
      } else {
        setSuccess(true);
        setFields(EMPTY);
      }
    } catch {
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — Info */}
          <div className="reveal">
            <span
              className="font-mono text-xs tracking-widest block mb-4"
              style={{ color: "var(--muted)", letterSpacing: "0.12em" }}
            >
              {"//"} Contato
            </span>
            <h2
              className="font-bold mb-6"
              style={{
                color: "var(--heading)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                lineHeight: 1.15,
              }}
            >
              Vamos conversar
              <br />
              sobre segurança.
            </h2>
            <p
              className="text-sm leading-relaxed font-light mb-10"
              style={{ color: "var(--text)" }}
            >
              Preencha o formulário e nossa equipe entrará em contato para
              entender suas necessidades e propor a melhor abordagem.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-sm"
                  style={{ color: "var(--heading)" }}
                >
                  →
                </span>
                <a
                  href="mailto:contato@noxoffsec.com"
                  className="font-mono text-sm hover:opacity-100 opacity-70"
                  style={{ color: "var(--heading)" }}
                >
                  contato@noxoffsec.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-sm"
                  style={{ color: "var(--heading)" }}
                >
                  →
                </span>
                <span
                  className="font-mono text-sm opacity-70"
                  style={{ color: "var(--heading)" }}
                >
                  São Paulo, Brasil
                </span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal-d1">
          {success ? (
            <div className="flex flex-col gap-4 py-8">
              <span
                className="font-mono text-xs tracking-widest"
                style={{ color: "var(--muted)", letterSpacing: "0.12em" }}
              >
                {"// "} Mensagem enviada
              </span>
              <p
                className="text-sm leading-relaxed font-light"
                style={{ color: "var(--text)" }}
              >
                Recebemos sua mensagem. Nossa equipe entrará em contato em
                breve.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="font-mono text-xs uppercase tracking-widest self-start opacity-60 hover:opacity-100 transition-opacity"
                style={{ color: "var(--heading)", letterSpacing: "0.12em" }}
              >
                ← Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              noValidate
            >
              <Field label="Nome">
                <input
                  type="text"
                  placeholder="Seu nome"
                  required
                  value={fields.nome}
                  onChange={set("nome")}
                  className="form-input"
                  style={{
                    ...inputBase,
                    borderColor: borderColor("nome"),
                  }}
                  onFocus={() => setFocused("nome")}
                  onBlur={() => setFocused(null)}
                />
              </Field>

              <Field label="E-mail">
                <input
                  type="email"
                  placeholder="email@empresa.com"
                  required
                  value={fields.email}
                  onChange={set("email")}
                  className="form-input"
                  style={{
                    ...inputBase,
                    borderColor: borderColor("email"),
                  }}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                />
              </Field>

              <Field label="Serviço de Interesse">
                <div className="relative">
                  <select
                    required
                    value={fields.servico}
                    onChange={set("servico")}
                    className="form-input appearance-none w-full cursor-pointer"
                    style={{
                      ...inputBase,
                      borderColor: borderColor("servico"),
                      paddingRight: "2.5rem",
                    }}
                    onFocus={() => setFocused("servico")}
                    onBlur={() => setFocused(null)}
                  >
                    <option value="" disabled style={{ color: "#555" }}>
                      Selecione um serviço
                    </option>
                    <option value="pentest">Pentest</option>
                    <option value="appsec">AppSec — Shift Left</option>
                    <option value="consultoria">Consultoria Geral</option>
                  </select>
                  <span
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    ▾
                  </span>
                </div>
              </Field>

              <Field label="Mensagem">
                <textarea
                  placeholder="Descreva brevemente sua necessidade..."
                  required
                  rows={4}
                  value={fields.mensagem}
                  onChange={set("mensagem")}
                  className="form-input resize-none"
                  style={{
                    ...inputBase,
                    borderColor: borderColor("mensagem"),
                  }}
                  onFocus={() => setFocused("mensagem")}
                  onBlur={() => setFocused(null)}
                />
              </Field>

              {error && (
                <p
                  className="font-mono text-xs"
                  style={{ color: "#f87171" }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="font-mono text-xs font-bold uppercase tracking-widest py-3.5 w-full transition-all duration-200 cursor-pointer hover:opacity-85 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                style={{
                  background: "var(--heading)",
                  color: "#000000",
                  letterSpacing: "0.12em",
                }}
              >
                {loading ? "Enviando..." : "Enviar Mensagem →"}
              </button>
            </form>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
