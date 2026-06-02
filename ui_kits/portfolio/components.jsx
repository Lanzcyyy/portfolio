/* global React */
const { useState, useEffect, useRef } = React;

/* ============================================================
   Icon — Lucide-style inline SVGs, 1.5px stroke
   ============================================================ */
function Icon({ name, size = 18, color = "currentColor" }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const paths = {
    "arrow-up-right": (
      <>
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </>
    ),
    "arrow-right": (
      <>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </>
    ),
    "arrow-left": (
      <>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </>
    ),
    github: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 5L2 7" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    twitter: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1.3 2.3-.2 3-1z" />
    ),
    play: <polygon points="5 3 19 12 5 21 5 3" />,
    "chevron-down": <polyline points="6 9 12 15 18 9" />,
  };
  return <svg {...props}>{paths[name] || null}</svg>;
}

/* ============================================================
   Logomark — initial + cobalt dot
   ============================================================ */
function Logomark({ initial = "M", size = 22, dark = false }) {
  const dotSize = Math.max(3, Math.round(size * 0.18));
  return (
    <span
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        fontSize: `${size}px`,
        lineHeight: 0.9,
        letterSpacing: "-0.04em",
        color: dark ? "var(--paper-1)" : "var(--ink-1)",
        display: "inline-flex",
        alignItems: "baseline",
        gap: "2px",
      }}
    >
      {initial}
      <span
        style={{
          width: dotSize,
          height: dotSize,
          background: dark ? "var(--azure-300)" : "var(--azure-500)",
          borderRadius: 999,
          display: "inline-block",
          transform: `translateY(-${Math.round(size * 0.1)}px)`,
        }}
      />
    </span>
  );
}

/* ============================================================
   Nav — sticky top, blur, route-aware
   ============================================================ */
function Nav({ route, onNavigate, onHover, onLeave }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const Link = ({ to, label }) => (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(to);
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`nav__link ${route === to ? "nav__link--active" : ""}`}
    >
      {label}
    </a>
  );
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          onNavigate("home");
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="nav__brand"
      >
        <Logomark initial="M" size={22} />
      </a>
      <div className="nav__links">
        <Link to="home" label="Index" />
        <Link to="work" label="Work" />
        <Link to="about" label="About" />
      </div>
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          onNavigate("contact");
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="nav__cta"
      >
        Get in touch <Icon name="arrow-right" size={12} />
      </a>
    </nav>
  );
}

/* ============================================================
   Footer — status, socials, live clock
   ============================================================ */
function Footer({ onHover, onLeave }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m} LISBON`);
    };
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);
  const Social = ({ name, label, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="footer__social"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      aria-label={label}
    >
      <Icon name={name} size={18} />
    </a>
  );
  return (
    <footer className="footer">
      <div className="footer__status">Available for work · 2025</div>
      <div className="footer__socials">
        <Social name="github" label="GitHub" href="#" />
        <Social name="twitter" label="Twitter" href="#" />
        <Social name="linkedin" label="LinkedIn" href="#" />
        <Social name="mail" label="Email" href="#" />
      </div>
      <div className="footer__meta">
        <span>{time}</span>
        <span>© Maren Ito</span>
      </div>
    </footer>
  );
}

/* ============================================================
   Pill — status, tag
   ============================================================ */
function Pill({ children, variant = "tag" }) {
  return <span className={`pill pill--${variant}`}>{children}</span>;
}

/* ============================================================
   Button — primary, secondary, ghost
   ============================================================ */
function Button({
  children,
  variant = "primary",
  onClick,
  onHover,
  onLeave,
  icon,
}) {
  return (
    <button
      className={`btn btn--${variant}`}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {children}
      {icon && <Icon name={icon} size={14} />}
    </button>
  );
}

/* ============================================================
   Field — underline input + textarea
   ============================================================ */
function Field({ label, name, placeholder, value, onChange, textarea, onHover, onLeave }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <Tag
        name={name}
        className={textarea ? "field__textarea" : "field__input"}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange && onChange(e.target.value)}
        rows={textarea ? 4 : undefined}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      />
    </label>
  );
}

/* ============================================================
   FadeWords — splits a string into spans that fade-up staggered
   ============================================================ */
function FadeWords({ text, delay = 0, stagger = 60, className = "" }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span
            className="fade-word"
            style={{ animationDelay: `${delay + i * stagger}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </span>
  );
}

/* ============================================================
   ProjectMedia — placeholder image (warm gradient swatches)
   ============================================================ */
function ProjectMedia({ palette, label }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 50%, ${palette[2]} 100%)`,
        display: "flex",
        alignItems: "flex-end",
        padding: 18,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ============================================================
   ProjectRow — the index pattern
   ============================================================ */
function ProjectRow({ project, idx, onNavigate, onHover, onLeave }) {
  return (
    <a
      href={`#project/${project.slug}`}
      className="proj-row"
      onClick={(e) => {
        e.preventDefault();
        onNavigate(`project/${project.slug}`);
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <span className="proj-row__idx">{String(idx + 1).padStart(3, "0")}</span>
      <span className="proj-row__name">
        {project.name}
        {project.emph && (
          <>
            {" — "}
            <em>{project.emph}</em>
          </>
        )}
      </span>
      <span className="proj-row__cat">{project.cat}</span>
      <span className="proj-row__year">{project.year}</span>
      <span className="proj-row__arrow">
        <Icon name="arrow-up-right" size={18} />
      </span>
    </a>
  );
}

/* ============================================================
   ProjectThumb — grid card with desaturate-on-rest
   ============================================================ */
function ProjectThumb({ project, onNavigate, onHover, onLeave }) {
  return (
    <a
      href={`#project/${project.slug}`}
      className="thumb"
      onClick={(e) => {
        e.preventDefault();
        onNavigate(`project/${project.slug}`);
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="thumb__media">
        <ProjectMedia palette={project.palette} label={project.cat} />
      </div>
      <div className="thumb__meta">
        <span className="thumb__name">{project.name}</span>
        <span className="thumb__year">{project.year}</span>
      </div>
    </a>
  );
}

/* ============================================================
   CursorFollower — ring that lags pointer ~100ms
   ============================================================ */
function CursorFollower({ hovering }) {
  const ref = useRef(null);
  const pos = useRef({ x: -50, y: -50 });
  const target = useRef({ x: -50, y: -50 });
  useEffect(() => {
    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    let raf;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className={`cursor ${hovering ? "cursor--hover" : ""}`} />;
}

Object.assign(window, {
  Icon,
  Logomark,
  Nav,
  Footer,
  Pill,
  Button,
  Field,
  FadeWords,
  ProjectMedia,
  ProjectRow,
  ProjectThumb,
  CursorFollower,
});
