import React, { useState, useEffect } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Ray Tracer",
    description: "Ray Tracer developed from scratch in C, includes importance and adaptive sampling. A BVH and object instancing.",
    image: "cornell.png",
    link: "https://github.com/TSSchaef/336-RayTracer"
  },
  {
    title: "Connect-4 Solver",
    description: "Nega-Max (Mini-Max variant) tree with Alpha-Beta pruning. Transposition table to improve efficiency",
    image: "connect4.png",
    link: "https://github.com/TSSchaef/connect-4"
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
              // Minimal white sun icon for dark mode
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2" fill="none"/>
                <g stroke="#fff" strokeWidth="2">
                  <line x1="12" y1="2" x2="12" y2="4"/>
                  <line x1="12" y1="20" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="4" y2="12"/>
                  <line x1="20" y1="12" x2="22" y2="12"/>
                  <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/>
                  <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
                  <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/>
                  <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>
                </g>
              </svg>
            ) : (
              // Minimal black moon icon for light mode
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                  fill="#111"
                />
              </svg>
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
I’m a senior at Iowa State University studying Software Engineering and Applied Mathematics, graduating in December 2025. Currently, I’m spending the summer interning with the Distributed Hosting team at Principal Financial Group, learning the ins and outs of running reliable systems at scale.
          </p>
          <p>
I like solving tricky problems—whether it’s in code, a math proof, or an interesting puzzle. I enjoy thinking deeply about how things work and how to make them work better.
          </p>
          <p>
Outside of school and work, I spend time reading, painting, and getting lost in logic puzzles. I’m always up for a challenge, especially if it means learning something new along the way.
          </p>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map((proj, idx) => (
              <a
                className="project-card"
                key={idx}
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                aria-label={`View project: ${proj.title}`}
              >
                <div className="project-img-wrapper">
                  <Image src={proj.image} alt={proj.title + " screenshot"} />
                  <div className="img-gloss" />
                </div>
                <div className="project-info">
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <span className="project-link-indicator">View Project</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>
            Email: <a href="mailto:tschaeferstorm@gmail.com">tschaeferstorm@gmail.com</a>
          </p>
          <p>
            GitHub: <a href="https://github.com/TSSchaef">https://github.com/TSSchaef</a>
          </p>
          <p>
            LinkedIn: <a href="https://www.linkedin.com/in/tyler-schaefer-1454bb26a">www.linkedin.com/in/tyler-schaefer-1454bb26a</a>
          </p>
          <p>
            Resume: <a href="">TO DO: Add up to date pdf download</a>
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
