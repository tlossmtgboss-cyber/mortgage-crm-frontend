// api/assistant.ts
export const config = { runtime: "edge" };

// Prefer configuring the backend URL via env so you can change it without code edits.
// In Vercel Dashboard → Project → Settings → Environment Variables:
//   BACKEND_ASSISTANT_URL = https://mortgage-crm-production-a24e.up.railway.app/assistant
const BACKEND = process.env.BACKEND_ASSISTANT_URL ||
  "https://mortgage-crm-production-a24e.up.railway.app/assistant";

export default async function handler(req: Request): Promise<Response> {
  // Preflight (harmless even if same-origin)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Forward client body and (optionally) client auth to the backend
  const bodyText = await req.text(); // preserves streaming body shape for pass-through

  // If your Railway needs a token, set BACKEND_TOKEN in Vercel and add the header here:
  // const backendAuth = process.env.BACKEND_TOKEN ? { Authorization: `Bearer ${process.env.BACKEND_TOKEN}` } : {};
  const backendHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    // Spread backendAuth if used
  };

  // Optional: forward end-user auth header if that's your pattern:
  const clientAuth = req.headers.get("authorization");
  if (clientAuth) backendHeaders["Authorization"] = clientAuth;

  const resp = await fetch(BACKEND, {
    method: "POST",
    headers: backendHeaders,
    body: bodyText,
  });

  // Pass-through status, and stream the response body back to the browser.
  // Preserve content type in case the backend streams (text/event-stream).
  const contentType = resp.headers.get("Content-Type") || "application/octet-stream";
  return new Response(resp.body, {
    status: resp.status,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
