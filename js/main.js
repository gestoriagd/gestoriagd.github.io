// GD Gestoría — page behaviour (no dependencies).

const WHATSAPP_NUMBER = "5491156943375";
const BASE_MESSAGE = "Hola Graciela, vi la página de GD Gestoría® y quisiera consultar por un trámite.";

/**
 * Builds a wa.me link with a pre-filled message.
 * @param {string} [topic] Optional specific request appended to the base message.
 * @returns {string}
 */
function buildWhatsAppUrl(topic) {
  const text = topic ? `${BASE_MESSAGE} ${topic}` : BASE_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Every element with [data-wa] gets its WhatsApp link; the attribute value is the specific topic.
document.querySelectorAll("[data-wa]").forEach((link) => {
  link.href = buildWhatsAppUrl(link.dataset.wa.trim());
});

// Mobile navigation toggle.
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setNavOpen(open) {
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

toggle.addEventListener("click", () => setNavOpen(!nav.classList.contains("is-open")));
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setNavOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavOpen(false);
});

// Keep the footer year current.
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

// Header: shadow after scrolling and highlight the pill of the section in view.
const header = document.querySelector(".site-header");
const navLinks = [...document.querySelectorAll(".site-nav ul a")];
const spyTargets = navLinks
  .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
  .filter((item) => item.section);

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
  const line = window.scrollY + header.offsetHeight + 80;
  let current = null;
  spyTargets.forEach((item) => {
    if (item.section.offsetTop <= line) current = item;
  });
  navLinks.forEach((link) => {
    const active = current && current.link === link;
    link.classList.toggle("is-active", Boolean(active));
    if (active) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();