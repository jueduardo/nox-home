import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVICO_LABELS: Record<string, string> = {
  pentest: "Pentest",
  appsec: "AppSec — Shift Left",
  consultoria: "Consultoria Geral",
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const { nome, email, servico, mensagem } = body as Record<string, string>;

  if (!nome?.trim() || !email?.trim() || !servico?.trim() || !mensagem?.trim()) {
    return Response.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 422 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return Response.json({ error: "E-mail inválido." }, { status: 422 });
  }

  const servicoLabel = SERVICO_LABELS[servico] ?? servico;

  const { error } = await resend.emails.send({
    from: "Formulário NOX <contato@noxoffsec.com>",
    to: "contato@noxoffsec.com",
    replyTo: email,
    subject: `[NOX] Nova mensagem de ${nome} — ${servicoLabel}`,
    text: [
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      `Serviço: ${servicoLabel}`,
      ``,
      `Mensagem:`,
      mensagem,
    ].join("\n"),
  });

  if (error) {
    console.error("[resend]", error);
    return Response.json(
      { error: "Falha ao enviar mensagem. Tente novamente." },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
