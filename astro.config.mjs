import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// Vercel Edge Functions
// import vercel from "@astrojs/vercel/edge";
// Serverless Functions
import vercel from "@astrojs/vercel/serverless";
// static build
// import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: "https://justinbachtell.com",
  output: "hybrid",
  adapter: vercel({
    edgeMiddleware: true,
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
    react(),
  ],
});
