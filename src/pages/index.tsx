import React, { useState, useEffect } from "react";

const projects = [
  {
    title: "Ray Tracer",
    description: "Ray Tracer developed from scratch in C, includes importance and adaptive sampling. A BVH and object instancing.",
    image: "cornell.png",
    link: "#"
  },
  {
    title: "Connect-4 Solver",
    description: "Nega-Max (Mini-Max variant) tree with Alpha-Beta pruning. Transposition table to improve efficiency",
    image: "connect4.png",
    link: "#"
  },
  // Add more projects as needed
];

const Portfolio: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // On mount, check for saved theme or system preference
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="portfolio-root">
      <header>
        <div className="header-info">
          <h1>Tyler Schaefer</h1>
          <p>Software Engineering | Applied Mathematics</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            title="Toggle dark/light mode"
          >
            {theme === "dark" ? (
              <span role="img" aria-label="Switch to light mode">🌞</span>
            ) : (
              <span role="img" aria-label="Switch to dark mode">🌙</span>
            )}
          </button>
          <button className="menu-btn" onClick={toggleSidebar} aria-label="Open navigation">
            &#9776;
          </button>
        </div>
      </header>
      <main>
        <section id="about">
          <h2>About Me</h2>
          <p>
            I'm super cool, please please please hire me... please
          </p>
        </section>
        <section id="projects">
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map((proj, idx) => (
              <div className="project-card" key={idx}>
                <div className="project-img-wrapper">
                  <img src={proj.image} alt={proj.title + " screenshot"} />
                  <div className="img-gloss" />
                </div>
                <div className="project-info">
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="contact">
          <h2>Contact</h2>
          <p>
            Email: <a href="mailto:tschaeferstorm@gmail.com">tschaeferstorm@gmail.com</a>
          </p>
        </section>
      </main>
      {/* Right Side Navigation */}
      <nav className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar} aria-label="Close navigation">&times;</button>
        <a href="#about" onClick={toggleSidebar}>About</a>
        <a href="#projects" onClick={toggleSidebar}>Projects</a>
        <a href="#contact" onClick={toggleSidebar}>Contact</a>
      </nav>
      <div
        className={`overlay${sidebarOpen ? " show" : ""}`}
        onClick={toggleSidebar}
        aria-hidden={!sidebarOpen}
      />
    </div>
  );
};

export default Portfolio;
