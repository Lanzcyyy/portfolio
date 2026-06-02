/* ========================================================================== 
  Maren Ito — Portfolio
  Vite app with Supabase-ready env vars.
  ========================================================================== */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

/* ---------------- Project data (edit this) -------------------------------- */
const PROJECTS = [
  { name: "Lorem ipsum",       emph: "brand", cat: "Identity",  year: "2024", href: "#" },
  { name: "Lorem ipsum",                       cat: "Product",   year: "2023", href: "#" },
  { name: "Lorem ipsum",                 cat: "Packaging", year: "2023", href: "#" },
  { name: "Lorem ipsum",         emph: "site",  cat: "Web",       year: "2022", href: "#" },
];

/* ---------------- Render project list ------------------------------------- */
(function renderProjects() {
  const list = document.getElementById("proj-list");
  if (!list) return;
  list.innerHTML = PROJECTS.map((p, i) => `
    <a href="${p.href}" class="proj-row reveal" style="--d:${i * 60}ms">
      <span class="proj-row__idx">${String(i + 1).padStart(2, "0")}</span>
      <span class="proj-row__name">${p.name}${p.emph ? ` — <em>${p.emph}</em>` : ""}</span>
      <span class="proj-row__cat">${p.cat}</span>
      <span class="proj-row__year">${p.year}</span>
      <span class="proj-row__arrow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
        </svg>
      </span>
    </a>
  `).join("");
})();

/* ---------------- Reveal on scroll ---------------------------------------- */
(function reveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );
  els.forEach((el) => io.observe(el));
})();

/* ---------------- Nav state (sticky border + active link) ----------------- */
(function navState() {
  const nav = document.getElementById("nav");
  const links = document.querySelectorAll(".nav__link");
  const sections = ["home", "work", "about"].map((id) => document.getElementById(id)).filter(Boolean);

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 16);
    const y = window.scrollY + 120;
    let active = "home";
    for (const s of sections) {
      if (s.offsetTop <= y) active = s.id;
    }
    links.forEach((l) => {
      l.classList.toggle("is-active", l.dataset.section === active);
    });
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* ---------------- Cursor follower (skipped on touch) ---------------------- */
(function cursor() {
  if (matchMedia("(hover: none), (pointer: coarse)").matches) return;
  const dot = document.getElementById("cursor");
  if (!dot) return;
  const pos = { x: -50, y: -50 };
  const target = { x: -50, y: -50 };
  window.addEventListener("mousemove", (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  });
  const loop = () => {
    pos.x += (target.x - pos.x) * 0.18;
    pos.y += (target.y - pos.y) * 0.18;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  loop();

  // grow ring on hoverable elements
  const hoverables = "a, button, input, textarea, .proj-row";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverables)) dot.classList.add("is-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverables)) dot.classList.remove("is-hover");
  });
})();

/* ---------------- Contact form (front-end only) --------------------------- */
(function contactForm() {
  const form = document.getElementById("contact-form");
  const btn = document.getElementById("submit-btn");
  if (!form || !btn) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.email || !data.message) return;

    const label = btn.querySelector(".btn__label");

    try {
      if (supabase) {
        const { error } = await supabase.from("messages").insert([
          {
            name: data.name,
            email: data.email,
            message: data.message,
          },
        ]);

        if (error) throw error;
      } else {
        console.log("Form submitted →", data);
      }

      btn.classList.add("is-sent");
      label.textContent = "Sent — thank you";
      form.reset();
      setTimeout(() => {
        btn.classList.remove("is-sent");
        label.textContent = "Send message";
      }, 4000);
    } catch (error) {
      console.error("Supabase submit failed:", error);
      label.textContent = "Try again";
      setTimeout(() => {
        label.textContent = "Send message";
      }, 2500);
    }
  });
})();

/* ---------------- Live clock ---------------------------------------------- */
(function clock() {
  const el = document.getElementById("clock");
  if (!el) return;
  const tick = () => {
    const d = new Date();
    const time = d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Lisbon",
    });
    el.textContent = `${time} LISBON`;
  };
  tick();
  setInterval(tick, 30 * 1000);
})();
