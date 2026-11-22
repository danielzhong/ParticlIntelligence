import type { APIRoute } from "astro";
import { navigation } from "../config/navigation";
import { withBase } from "../lib/paths";

export const GET: APIRoute = ({ site }) => {
  const paths = ["/", ...navigation.map(({ path }) => path), "/privacy/"];
  const urls = paths
    .map(
      (path) => `<url><loc>${new URL(withBase(path), site).href}</loc></url>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    },
  );
};
