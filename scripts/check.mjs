// Static site checks: run with `node scripts/check.mjs`.
// Verifies internal anchors, local assets, WhatsApp links and brief-required content.
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const js = readFileSync(join(root, "js", "main.js"), "utf8");
const errors = [];
const check = (ok, msg) => { if (!ok) errors.push(msg); };

// 1. Every in-page anchor points to an existing id.
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const [, target] of html.matchAll(/href="#([^"]*)"/g)) {
  check(target === "" || ids.has(target), `Broken anchor: #${target}`);
}
for (const [, target] of html.matchAll(/<use href="#([^"]+)"/g)) {
  check(ids.has(target), `Missing icon symbol: #${target}`);
}

// 2. Every local src/href asset exists.
for (const [, path] of html.matchAll(/(?:src|href)="(?!https?:|#|mailto:|tel:)([^"]+)"/g)) {
  check(existsSync(join(root, path)), `Missing file: ${path}`);
}

// 3. WhatsApp links: correct number, all wa.me anchors are wired via data-wa.
const waAnchors = [...html.matchAll(/<a[^>]*href="https:\/\/wa\.me\/[^"]*"[^>]*>/g)].map((m) => m[0]);
check(waAnchors.length >= 10, `Expected at least 10 WhatsApp links, found ${waAnchors.length}`);
for (const tag of waAnchors) {
  check(tag.includes("wa.me/5491156943375"), `Wrong WhatsApp number in: ${tag}`);
  check(/\sdata-wa(=|\s|>)/.test(tag), `WhatsApp link without data-wa: ${tag}`);
  check(tag.includes('rel="noopener"'), `WhatsApp link without rel=noopener: ${tag}`);
}
check(js.includes('"5491156943375"'), "main.js has wrong WhatsApp number");
check(js.includes("Hola Graciela, vi la página de GD Gestoría® y quisiera consultar por un trámite."), "Suggested message missing in main.js");

// 4. Content required by the brief.
const required = [
  "Tu trámite, en buenas manos",
  "Mandataria Registral Automotor Matriculada",
  "Soluciones ágiles y confiables para que sigas en movimiento.",
  "Consultar por WhatsApp", "Ver servicios", "Solicitar turno", "Consultar mi caso",
  "Transferencias", "Informes de dominio", "Verificación policial", "Cédulas", "Chapas patente",
  "Prendas", "Infracciones y patentes", "Trámites ante Registros Seccionales", "Asesoría técnica registral",
  "Abogados", "Escribanía", "COBERTURA NACIONAL", "¿Estás lejos? Nosotros nos acercamos.",
  "Lic. Graciela Duré", "11 5694-3375", "@GESTORIAGD.OFICIAL", "instagram-qr.jpeg",
  "SERIEDAD | COMPROMISO | ATENCIÓN PERSONALIZADA", "Marca registrada. Todos los derechos reservados.",
  "¿Por qué solicitan primero un Informe de Dominio?",
  "class=\"wa-float\"",
];
for (const text of required) check(html.includes(text), `Missing brief content: ${text}`);

const faqCount = (html.match(/<details>/g) || []).length;
check(faqCount === 9, `Expected 9 FAQ items, found ${faqCount}`);
const needCount = (html.match(/class="need-card/g) || []).length;
check(needCount === 8, `Expected 8 "¿Qué trámite necesitás?" cards, found ${needCount}`);
const serviceCount = (html.match(/class="service-card"/g) || []).length;
check(serviceCount === 9, `Expected 9 service cards, found ${serviceCount}`);

// 5. Images have alt attributes.
for (const [tag] of html.matchAll(/<img[^>]*>/g)) check(/\salt="/.test(tag), `Image without alt: ${tag}`);

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n - ${errors.join("\n - ")}`);
  process.exit(1);
}
console.log(`✓ All checks passed (${waAnchors.length} WhatsApp links, ${ids.size} ids, ${faqCount} FAQs, ${serviceCount} services).`);
