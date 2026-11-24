import {PORTFOLIO_CONTEXT} from "./context.js";

type ChatMessage = {role:"user" | "assistant"; content: string};
type GroqResponse = {
  choices?: {
    finish_reason?: string;
    message?: { content?: string | null; reasoning?: string };
  }[];
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "falta la API KEY" }, { status: 500 });
    }

    const body = (await request.json()) as { messages?: unknown };
    const raw = Array.isArray(body.messages) ? body.messages : [];
    const messages: ChatMessage[] = raw.filter(
      (m): m is ChatMessage =>
        typeof m === "object" &&
        m !== null &&
        "role" in m &&
        "content" in m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    );

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        temperature: 0.4,
        max_completion_tokens: 300,
        messages: [
          {
            role: "system",
            content: `Eres el asistente del portfolio de Ciro Cabral Reami. Responde solo con la información del contexto. Si algo no está en el contexto, dilo con claridad.\n\nContexto:\n${PORTFOLIO_CONTEXT}`,
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return Response.json({ error }, { status: response.status });
    }

    const data = (await response.json()) as GroqResponse;
    const message = data.choices?.[0]?.message;
    const reply = message?.content || message?.reasoning || "";
    return Response.json({
      reply,
      finish_reason: data.choices?.[0]?.finish_reason ?? null,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return Response.json({ error: msg }, { status: 500 });
  }
}