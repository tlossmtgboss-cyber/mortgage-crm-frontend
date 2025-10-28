// app/api/assistant/route.ts
import { NextRequest } from "next/server";
import OpenAI from "openai";

/**
 * NOTES:
 * - Exports for HTTP methods (OPTIONS, POST) must exist for the App Router.
 * - 405 errors typically show up when the method isn't exported or the file path is wrong.
 * - This handler streams text back to the browser (EventStream-like) for a snappy UI.
 */

export const runtime = "nodejs"; // or "edge" if you prefer; stick to nodejs during bring-up

// Preflight / CORS (optional; safe even if same-origin)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { messages, tools, toolChoice, metadata } = body ?? {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid payload: `messages` required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Example: Responses API with text streaming + optional tool calls
    const response = await openai.responses.stream({
      model: process.env.OPENAI_MODEL ?? "o4-mini", // fast + strong reasoning
      input: messages, // accepts array [{ role, content }]
      // Optional structured tools/function calling
      tools,
      tool_choice: toolChoice ?? "auto",
      metadata: {
        app: "MortgageCRM",
        ...metadata,
      },
    });

    // Convert SDK stream to web Response stream
    const stream = response.toReadableStream();

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    console.error("[/api/assistant] error", err);
    const msg =
      err?.response?.data?.error?.message ||
      err?.message ||
      "Unknown server error";

    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
