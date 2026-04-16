"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

/* ─── data ─── */
const statCards: readonly { label: string; target: number; duration: number; color: string; icon: string; decimals?: number }[] = [
  { label: "Total de Vulns", target: 12, duration: 1200, color: "", icon: "cross" },
  { label: "Abertas", target: 5, duration: 1000, color: "red", icon: "trend" },
  { label: "Resolvidas", target: 7, duration: 1400, color: "green", icon: "check" },
  { label: "Maior CVSS", target: 9.8, duration: 1600, color: "yellow", icon: "warn", decimals: 1 },
];

const severities = [
  { label: "Crítica", cls: "critical", width: 25, count: 3 },
  { label: "Alta", cls: "high", width: 33, count: 4 },
  { label: "Média", cls: "medium", width: 25, count: 3 },
  { label: "Baixa", cls: "low", width: 17, count: 2 },
] as const;

const activities = [
  { id: "CVE-2026-1847", desc: "SQL Injection em endpoint /api/users", date: "15/04/2026", severity: "critical", severityLabel: "CRÍTICA", status: "open", statusLabel: "ABERTA" },
  { id: "CVE-2026-1832", desc: "XSS Refletido no campo de busca", date: "14/04/2026", severity: "high", severityLabel: "ALTA", status: "resolved", statusLabel: "RESOLVIDA" },
  { id: "CVE-2026-1819", desc: "IDOR em download de relatórios", date: "13/04/2026", severity: "medium", severityLabel: "MÉDIA", status: "open", statusLabel: "ABERTA" },
] as const;

const features = [
  { icon: "shield", title: "Tracking em Tempo Real", desc: "Acompanhe cada vulnerabilidade desde a descoberta até a remediação com status ao vivo e notificações." },
  { icon: "chart", title: "Relatórios Detalhados", desc: "Gere relatórios executivos e técnicos com classificação CVSS, evidências e recomendações de correção." },
  { icon: "bell", title: "Alertas Inteligentes", desc: "Receba notificações quando vulnerabilidades críticas são encontradas ou quando prazos de remediação estão próximos." },
] as const;

/* ─── icons (inline SVGs) ─── */
function StatIcon({ type }: { type: string }) {
  const props = { className: "plat-stat-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 };
  switch (type) {
    case "cross":
      return <svg {...props}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>;
    case "trend":
      return <svg {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /></svg>;
    case "check":
      return <svg {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>;
    case "warn":
      return <svg {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
    default:
      return null;
  }
}

function FeatureIcon({ type }: { type: string }) {
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, width: 20, height: 20 };
  switch (type) {
    case "shield":
      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case "chart":
      return <svg {...props}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
    case "bell":
      return <svg {...props}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
    default:
      return null;
  }
}

function NavIcon({ type }: { type: string }) {
  const props = { className: "plat-nav-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 };
  switch (type) {
    case "dashboard":
      return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
    case "vulns":
      return <svg {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
    case "report":
      return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
    default:
      return null;
  }
}

/* ─── counter animation helper ─── */
function animateCounter(
  el: HTMLElement,
  target: number,
  duration: number,
  decimals = 0,
  suffix = "",
) {
  const start = performance.now();
  function update(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = current.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ─── component ─── */
export default function Platform() {
  const params  = useSearchParams();
  const person  = params.get("n") ?? "Julio";
  const company = params.get("e") ?? "NOX";

  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressPctRef = useRef<HTMLSpanElement>(null);
  const severityRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);

  const triggerAnimations = useCallback(() => {
    if (animated) return;
    setAnimated(true);

    counterRefs.current.forEach((el, i) => {
      if (!el) return;
      const s = statCards[i];
      animateCounter(el, s.target, s.duration, s.decimals ?? 0);
    });

    setTimeout(() => {
      if (progressFillRef.current) progressFillRef.current.style.width = "58%";
      if (progressPctRef.current) {
        animateCounter(progressPctRef.current, 58, 2000, 0, "%");
      }
    }, 800);

    setTimeout(() => {
      severityRefs.current.forEach((el) => {
        if (!el) return;
        el.style.width = el.dataset.width + "%";
      });
    }, 1000);
  }, [animated]);

  /* intersection observer */
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            triggerAnimations();
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [triggerAnimations]);

  /* tilt effect */
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    function onMove(e: MouseEvent) {
      const rect = frame!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      frame!.style.transform = `perspective(1200px) rotateY(${x * 3}deg) rotateX(${-y * 2}deg)`;
    }
    function onLeave() {
      frame!.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
      frame!.style.transition = "transform 0.5s ease";
    }
    function onEnter() {
      frame!.style.transition = "none";
    }

    frame.addEventListener("mousemove", onMove);
    frame.addEventListener("mouseleave", onLeave);
    frame.addEventListener("mouseenter", onEnter);
    return () => {
      frame.removeEventListener("mousemove", onMove);
      frame.removeEventListener("mouseleave", onLeave);
      frame.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <section className="plat-section" id="plataforma">
      <div className="plat-glow-orb plat-orb-red" aria-hidden="true" />
      <div className="plat-glow-orb plat-orb-blue" aria-hidden="true" />
      <div className="plat-glow-orb plat-orb-cyan" aria-hidden="true" />

      {/* ── header ── */}
      <div className="plat-header">
        <h2 className="plat-title">
          Acompanhe em tempo real a segurança da sua empresa com a{" "}
          <span className="plat-highlight">NOX Platform</span>
        </h2>
        <p className="plat-desc">
          Cada cliente NOX tem acesso ao seu próprio portal. Vulnerabilidades
          encontradas, progresso de remediação e severidades tudo visível em
          tempo real enquanto trabalhamos.
        </p>
      </div>

      {/* ── dashboard ── */}
      <div className="plat-dash-wrapper" ref={wrapperRef}>
        <div className="plat-dash-frame" ref={frameRef}>
          {/* browser chrome */}
          <div className="plat-browser-bar">
            <div className="plat-browser-dots">
              <span />
              <span />
              <span />
            </div>
            <div className="plat-browser-url">
              <span className="plat-lock">🔒</span>
              portal.noxoffsec.com/dashboard
            </div>
          </div>

          <div className="plat-dash-body">
            {/* sidebar */}
            <nav className="plat-sidebar">
              <div className="plat-sidebar-logo">
                <Image
                  src="/images/nox-logo.png"
                  alt="NOX"
                  width={120}
                  height={120}
                  className="plat-sidebar-logo-img"
                />
              </div>
              <div className="plat-sidebar-org">// {company}</div>
              <ul className="plat-nav">
                <li className="plat-nav-item active">
                  <NavIcon type="dashboard" /> Dashboard
                </li>
                <li className="plat-nav-item">
                  <NavIcon type="vulns" /> Vulnerabilidades
                </li>
                <li className="plat-nav-item">
                  <NavIcon type="report" /> Relatório
                </li>
              </ul>
            </nav>

            {/* main area */}
            <div className="plat-main">
              <div className="plat-scanline" />

              <div className="plat-greeting">Olá, {person}</div>
              <div className="plat-subtitle font-mono">// Portal NOX OFFSEC</div>

              {/* stat cards */}
              <div className="plat-stats-row">
                {statCards.map((s, i) => (
                  <div className="plat-stat-card" key={s.label}>
                    <div className="plat-stat-label font-mono">{s.label}</div>
                    <div
                      className={`plat-stat-value ${s.color}`}
                      ref={(el) => { counterRefs.current[i] = el; }}
                    >
                      0
                    </div>
                    <StatIcon type={s.icon} />
                  </div>
                ))}
              </div>

              {/* progress */}
              <div className="plat-progress-section">
                <div className="plat-progress-header">
                  <span className="plat-progress-title font-mono">
                    Progresso de Remediação
                  </span>
                  <span
                    className="plat-progress-pct mid font-mono"
                    ref={progressPctRef}
                  >
                    0%
                  </span>
                </div>
                <div className="plat-progress-track">
                  <div className="plat-progress-fill" ref={progressFillRef} />
                </div>
                <div className="plat-progress-sub">
                  7 de 12 vulnerabilidades resolvidas
                </div>
              </div>

              {/* severity */}
              <div className="plat-severity-section">
                <div className="plat-severity-title font-mono">
                  Por Severidade
                </div>
                {severities.map((s, i) => (
                  <div className="plat-severity-row" key={s.cls}>
                    <span className={`plat-severity-label ${s.cls}`}>
                      {s.label}
                    </span>
                    <div className="plat-severity-track">
                      <div
                        className={`plat-severity-fill ${s.cls}`}
                        data-width={s.width}
                        ref={(el) => { severityRefs.current[i] = el; }}
                      />
                    </div>
                    <span className="plat-severity-count font-mono">
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* activity */}
              <div className="plat-activity-section">
                <div className="plat-activity-title font-mono">
                  Atividade Recente
                </div>
                {activities.map((a, i) => (
                  <div
                    className="plat-activity-item"
                    key={a.id}
                    style={{
                      animationDelay: animated ? `${1.6 + i * 0.3}s` : "99999s",
                    }}
                  >
                    <span className="plat-activity-id font-mono">{a.id}</span>
                    <span className="plat-activity-desc">{a.desc}</span>
                    <span className="plat-activity-date font-mono">
                      {a.date}
                    </span>
                    <span className={`plat-badge ${a.severity}`}>
                      {a.severityLabel}
                    </span>
                    <span className={`plat-badge ${a.status}`}>
                      {a.statusLabel}
                    </span>
                  </div>
                ))}
              </div>

              {/* floating notification */}
              <div
                className="plat-floating-notif"
                style={{
                  animationDelay: animated ? "2.5s" : "99999s",
                }}
              >
                <span className="plat-notif-dot" />
                <span>Nova vulnerabilidade detectada</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── features ── */}
      <div className="plat-features-row">
        {features.map((f, i) => (
          <div
            className="plat-feature-card"
            key={f.title}
            style={{ animationDelay: `${0.6 + i * 0.15}s` }}
          >
            <div className="plat-feature-icon"><FeatureIcon type={f.icon} /></div>
            <div className="plat-feature-title">{f.title}</div>
            <div className="plat-feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* ── cta ── */}
      <div className="plat-cta">
        <a href="#contato" className="plat-cta-btn primary">
          Quero me proteger
        </a>
      </div>
    </section>
  );
}
