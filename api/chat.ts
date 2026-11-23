import {PORTFOLIO_CONTEXT} from "./context.js";

type ChatMessage = {role:"user" | "assistant"; content: string};
type GroqResponse = {
    choices?: {message?:{content?:string}}[];
}

export async function POST(request : Request){
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey){
        return Response.json({error: "falta la API KEY"},{status:500});
    } 

    const body = (await request.json()) as {messages?: unknown};
    const raw = Array.isArray(body.messages) ? body.messages:[];
    const messages: ChatMessage[] = raw.filter(
        (m): m is ChatMessage =>
        typeof m === "object" &&
        m !== null &&
        "role" in m &&
        "content" in m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    )

    const response = await fetch ("https://api.groq.com/openai/v1/chat/completions",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body:JSON.stringify({
            model: "llama-3.3-70b-versatile",
            temperature:0.4,
            messages:[
                {
                    role:"system",
                    content:`Eres el asistente del portfolio de Ciro Cabral Reami. Responde solo con la información del contexto. Si algo no está en el contexto, dilo con claridad.\n\nContexto:\n${PORTFOLIO_CONTEXT}`
                },
                ...messages
            ],
        }),
    });
    if (!response.ok){
        const error = await response.text();
        return Response.json({error},{status:response.status})
    }
    const data = (await response.json()) as GroqResponse;
    const reply = data.choices?.[0]?.message?.content ?? "";
    return Response.json({reply})

}