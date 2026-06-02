/* global React, Nav, Footer, Pill, Button, Field, FadeWords, ProjectMedia, Icon */
const { useState } = React;

const PROJECTS = [
  { name: "Studio Mira", emph: "brand", cat: "Identity",  year: "2024", palette: ["#c89a6e", "#a07854", "#6b4f3a"] },
  { name: "Field Notes",                 cat: "Product",   year: "2023", palette: ["#9eb5d8", "#6a89b8", "#3a5a8c"] },
  { name: "Ground Coffee Co.",           cat: "Packaging", year: "2023", palette: ["#b87d4f", "#8a5530", "#4f2f1a"] },
  { name: "Northwind", emph: "site",     cat: "Web",       year: "2022", palette: ["#b4c8d8", "#7a96b0", "#3a5060"] },
];

/* ---------- Hero ---------- */
function Hero({ onNavigate, hoverProps }) {
  return (
    <section id="home" className="container--narrow" style={{ paddingTop: 64, paddingBottom: 96 }}>
      <span className="eyebrow">Maren Ito · Lisbon</span>
      <h1 style={{ marginBottom: 40 }}>
        <FadeWords text="I design quiet interfaces" delay={0} />
        <br />
        <FadeWords text="for companies who'd rather be" delay={280} />
        <br />
        <FadeWords text="remembered for the" delay={560} />{" "}
        <span className="fade-word" style={{ animationDelay: "820ms", fontWeight: 500, color: "var(--azure-500)" }}>work</span>.
      </h1>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
                    opacity: 0, animation: "fadeUp 800ms cubic-bezier(0.16, 1, 0.3, 1) 1200ms forwards" }}>
        <Pill variant="status">Available · Q3</Pill>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          currently — Studio Mira
        </span>
      </div>
    </section>
  );
}

/* ---------- Work ---------- */
function Work({ hoverProps }) {
  return (
    <section id="work" className="container" style={{ paddingBottom: 96 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <span className="eyebrow" style={{ margin: 0 }}>Selected work</span>
        <span className="eyebrow" style={{ margin: 0 }}>2022 — now</span>
      </div>
      <div>
        {PROJECTS.map((p, i) => (
          <a key={p.name} href="#work" {...hoverProps} className="proj-row" onClick={(e) => e.preventDefault()}>
            <span className="proj-row__idx">{String(i + 1).padStart(2, "0")}</span>
            <span className="proj-row__name">
              {p.name}
              {p.emph && <> — <em>{p.emph}</em></>}
            </span>
            <span className="proj-row__cat">{p.cat}</span>
            <span className="proj-row__year">{p.year}</span>
            <span className="proj-row__arrow"><Icon name="arrow-up-right" size={18} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About({ hoverProps }) {
  return (
    <section id="about" className="container--narrow" style={{ paddingBottom: 96 }}>
      <span className="eyebrow">About</span>
      <p style={{ fontSize: 22, lineHeight: 1.5, color: "var(--ink-1)", fontWeight: 300, letterSpacing: "-0.01em", margin: 0, maxWidth: 640 }}>
        I'm Maren — designer, sometimes builder. For nine years I've helped small companies make their first impression, usually as the only designer in the room.
      </p>
      <div className="facts" style={{ marginTop: 48 }}>
        <div className="fact"><span className="fact__key">Currently</span><span className="fact__val">Independent · Studio Mira</span></div>
        <div className="fact"><span className="fact__key">Based</span><span className="fact__val">Lisbon · GMT+1</span></div>
        <div className="fact"><span className="fact__key">Tools</span><span className="fact__val">Figma, Cavalry, InDesign</span></div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact({ hoverProps }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true); setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <section id="contact" className="container--narrow" style={{ paddingBottom: 96 }}>
      <span className="eyebrow">Contact</span>
      <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, letterSpacing: "-0.025em", marginBottom: 32 }}>
        Tell me about your <span style={{ color: "var(--azure-500)", fontWeight: 500 }}>project</span>.
      </h2>
      <form onSubmit={onSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Field label="Name"  name="name"  placeholder="Your name"     value={form.name}  onChange={(v) => setForm({ ...form, name: v })}  {...hoverProps} />
          <Field label="Email" name="email" placeholder="you@example.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} {...hoverProps} />
        </div>
        <Field label="Message" name="message" placeholder="A few lines about the work…" value={form.message} onChange={(v) => setForm({ ...form, message: v })} textarea {...hoverProps} />
        <div style={{ display: "flex", gap: 20, alignItems: "center", marginTop: 24, flexWrap: "wrap" }}>
          <Button variant="primary" icon="arrow-right" {...hoverProps}>
            {sent ? "Sent — thank you" : "Send message"}
          </Button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            or — hello@marenito.studio
          </span>
        </div>
      </form>
    </section>
  );
}

Object.assign(window, { PROJECTS, Hero, Work, About, Contact });
