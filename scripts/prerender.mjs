// Renders the homepage to static HTML at build time so crawlers (and first
// paint) get real markup instead of an empty <div id="root">, without
// switching the client to hydrateRoot — the client still mounts fresh with
// createRoot exactly as it does today, so there's no hydration-mismatch risk.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const ssrOutDir = resolve(root, "dist-ssr");

execSync("vite build --ssr src/entry-server.tsx --outDir dist-ssr", {
  cwd: root,
  stdio: "inherit",
});

const { render } = await import(resolve(ssrOutDir, "entry-server.js"));
const appHtml = render("/");

const indexPath = resolve(root, "dist/index.html");
const template = readFileSync(indexPath, "utf-8");
const withAppHtml = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
writeFileSync(indexPath, withAppHtml);

rmSync(ssrOutDir, { recursive: true, force: true });

console.log("Prerendered / into dist/index.html");
