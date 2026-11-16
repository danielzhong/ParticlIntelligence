const allowedOrigins = new Set([
  "https://partintell.com",
  "https://www.partintell.com",
]);

const allowedApplications = new Set([
  "Research inquiry",
  "Chip design & prototyping",
  "Industry collaboration",
  "Investment & strategy",
]);

const json = (body, status, origin) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(origin ? { "Access-Control-Allow-Origin": origin } : {}),
      Vary: "Origin",
    },
  });

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (!allowedOrigins.has(origin))
      return json({ error: "origin_not_allowed" }, 403);

    const corsHeaders = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    if (url.pathname !== "/contact")
      return json({ error: "not_found" }, 404, origin);
    if (request.method !== "POST")
      return json({ error: "method_not_allowed" }, 405, origin);
    if (
      !request.headers
        .get("Content-Type")
        ?.toLowerCase()
        .startsWith("application/json")
    ) {
      return json({ error: "content_type_must_be_json" }, 415, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "invalid_json" }, 400, origin);
    }

    // Quietly accept honeypot submissions without storing them.
    if (typeof body.website === "string" && body.website.trim()) {
      return json({ ok: true }, 200, origin);
    }

    const name = clean(body.name, 100);
    const email = clean(body.email, 254).toLowerCase();
    const organization = clean(body.organization, 150);
    const application = clean(body.application, 80);
    const goals = clean(body.goals, 2000);
    if (
      name.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !allowedApplications.has(application) ||
      body.consent !== "yes"
    ) {
      return json({ error: "invalid_submission" }, 400, origin);
    }

    try {
      await env.DB.prepare(
        `INSERT INTO inquiries (name, email, organization, application, goals, consented_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
        .bind(
          name,
          email,
          organization,
          application,
          goals,
          new Date().toISOString(),
        )
        .run();
    } catch (error) {
      console.error("Failed to save contact inquiry", error);
      return json({ error: "storage_unavailable" }, 503, origin);
    }

    return json({ ok: true }, 201, origin);
  },
};

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}
