/* global React, ReactDOM, Nav, Footer, CursorFollower, Hero, Work, About, Contact */
const { useState, useEffect } = React;

function App() {
  const [section, setSection] = useState("home");
  const [hovering, setHovering] = useState(false);
  const hoverProps = { onHover: () => setHovering(true), onLeave: () => setHovering(false) };

  // Smooth-scroll to a section
  const navigate = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Track which section is in view for nav highlight
  useEffect(() => {
    const ids = ["home", "work", "about", "contact"];
    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app" data-screen-label="Portfolio">
      <Nav route={section} onNavigate={navigate} {...hoverProps} />
      <main>
        <Hero    onNavigate={navigate} hoverProps={hoverProps} />
        <Work    hoverProps={hoverProps} />
        <About   hoverProps={hoverProps} />
        <Contact hoverProps={hoverProps} />
      </main>
      <Footer {...hoverProps} />
      <CursorFollower hovering={hovering} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
