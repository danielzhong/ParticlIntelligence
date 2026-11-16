import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Build a static Astro site with Tailwind's Vite integration.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || "/",
  output: "static",
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
