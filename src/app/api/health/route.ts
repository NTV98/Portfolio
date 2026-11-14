/** Liveness probe for Docker HEALTHCHECK / uptime monitors. No secrets, no internals. */
export function GET() {
  return Response.json(
    { status: "ok", version: process.env.APP_VERSION ?? "dev" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
