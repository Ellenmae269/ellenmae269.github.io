// ---------- Helpers ----------
const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", year: "numeric" });

const byNewest = (a, b) => b.date.localeCompare(a.date);

// ---------- Render: projects ----------
function projectCard(p) {
  const name = p.short || p.title;
  const thumbInner = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(name)} screenshot" loading="lazy" />`
    : `<span>${esc(name)}</span>`;
  const thumbClass = `project-thumb ${esc(p.theme || "t1")}${p.image ? " has-img" : ""}`;
  const thumb = p.caseStudy
    ? `<a class="${thumbClass}" href="${esc(p.caseStudy)}" aria-label="Read the ${esc(name)} case study">${thumbInner}</a>`
    : p.live
    ? `<a class="${thumbClass}" href="${esc(p.live)}" target="_blank" rel="noopener" aria-label="Open ${esc(name)}">${thumbInner}</a>`
    : `<div class="${thumbClass}">${thumbInner}</div>`;
  const links = [
    p.caseStudy && `<a href="${esc(p.caseStudy)}">Read the case study →</a>`,
    p.live && `<a href="${esc(p.live)}" target="_blank" rel="noopener">Live site ↗</a>`,
    p.source && `<a href="${esc(p.source)}" target="_blank" rel="noopener">Source ↗</a>`,
  ].filter(Boolean).join("");

  return `
    <article class="project reveal">
      ${thumb}
      <div class="project-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <div class="chips small">${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        ${links ? `<div class="project-links">${links}</div>` : ""}
      </div>
    </article>`;
}

// ---------- Render: certificates ----------
// Image certificates open in the on-page viewer; others link to their verify page
function certLinkAttrs(c) {
  if (c.image) return ` href="${esc(c.image)}" data-lightbox data-caption="${esc(c.title)} — ${esc(c.issuer)}"`;
  if (c.url) return ` href="${esc(c.url)}" target="_blank" rel="noopener"`;
  return "";
}

// Small clickable card (homepage and Certificates page)
function certRow(c, extraClass = "") {
  const tag = c.image || c.url ? "a" : "div";
  const label = c.image ? " · View" : c.url ? " · Verify ↗" : "";
  return `
    <li class="${extraClass}">
      <${tag} class="cert"${certLinkAttrs(c)}>
        <div class="cert-badge ${esc(c.color)}">${esc(c.badge)}</div>
        <div class="cert-info">
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.issuer)}${label}</p>
        </div>
        <span class="cert-year">${fmtDate(c.date)}</span>
      </${tag}>
    </li>`;
}

// ---------- Render: tech stack & stats ----------
function techHTML() {
  return Object.entries(TECH_STACK).map(([group, items]) => `
    <div class="tech-group">
      <h4>${esc(group)}</h4>
      <div class="chips">${items.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
    </div>`).join("");
}

function factsHTML() {
  return FACTS.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join("");
}

const certs = [...CERTIFICATES].sort(byNewest);
document.getElementById("featuredCerts").innerHTML = certs.filter((c) => c.featured).map(certRow).join("");
document.getElementById("allCerts").innerHTML = certs.map((c) => certRow(c, "reveal")).join("");
document.getElementById("certCount").textContent = `${certs.length} total`;

document.getElementById("featuredProjects").innerHTML = PROJECTS.filter((p) => p.featured).map(projectCard).join("");
document.getElementById("allProjects").innerHTML = PROJECTS.map(projectCard).join("");
document.getElementById("projectCount").textContent = `${PROJECTS.length} total`;

document.querySelectorAll("[data-tech]").forEach((el) => (el.innerHTML = techHTML()));
document.querySelectorAll("[data-facts]").forEach((el) => (el.innerHTML = factsHTML()));

// ---------- Render: education & extras (About page) ----------
document.querySelectorAll("[data-education]").forEach((el) => {
  el.innerHTML = EDUCATION.map((e) => `
    <li>
      <div class="tl-head"><h3>${esc(e.school)}</h3><span>${esc(e.when)}</span></div>
      <p class="tl-detail">${esc(e.detail)}</p>
      <p class="tl-place">${esc(e.place)}</p>
    </li>`).join("");
});
document.querySelectorAll("[data-extras]").forEach((el) => {
  el.innerHTML = Object.entries(EXTRAS).map(([group, items]) => `
    <div class="tech-group">
      <h4>${esc(group)}</h4>
      <div class="chips">${items.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
    </div>`).join("");
});

// ---------- Certificate viewer ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-lightbox]");
  if (!link || typeof lightbox.showModal !== "function") return; // old browsers just open the image
  e.preventDefault();
  lightboxImg.src = link.getAttribute("href");
  lightboxImg.alt = link.dataset.caption || "";
  lightboxCaption.textContent = link.dataset.caption || "";
  lightbox.showModal();
});
document.getElementById("lightboxClose").addEventListener("click", () => lightbox.close());
// Clicking the dark area around the image closes it
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });

// ---------- Theme toggle ----------
const root = document.documentElement;
document.getElementById("themeToggle").addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ---------- Mobile menu ----------
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
function closeMenu() {
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("click", (e) => {
  if (nav.classList.contains("open") && !nav.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
window.matchMedia("(min-width: 781px)").addEventListener("change", (e) => { if (e.matches) closeMenu(); });

// ---------- Header border on scroll ----------
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".view").forEach((view) => {
  view.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i, 5) * 60}ms`;
    revealObserver.observe(el);
  });
});

// ---------- Card spotlight ----------
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// ---------- Page switching (#home, #projects, #kitawork, #certificates, #about, #contact) ----------
const views = [...document.querySelectorAll(".view")];
function showView() {
  const name = location.hash.slice(1) || "home";
  const target = document.getElementById(`view-${name}`) || document.getElementById("view-home");
  views.forEach((v) => v.classList.toggle("active", v === target));
  // Sub-pages (like the KitaWork case study) highlight their parent nav link
  const active = target.dataset.nav || target.id.replace("view-", "");
  document.querySelectorAll(".nav-link[data-view]").forEach((l) => {
    const on = l.dataset.view === active;
    l.classList.toggle("active", on);
    if (on) l.setAttribute("aria-current", "page"); else l.removeAttribute("aria-current");
  });
  document.title = target.dataset.title;
  window.scrollTo({ top: 0, behavior: "instant" });
}
window.addEventListener("hashchange", showView);
showView();

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
