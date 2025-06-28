import Image from "next/image";
import React, { useState } from "react";

const projects = [
  {
    title: "Project Title 1",
    description: "A short description of the project, its purpose, and the technologies used.",
    image: "project1.jpg",
    link: "#"
  },
  {
    title: "Project Title 2",
    description: "Description of another project.",
    image: "project2.jpg",
    link: "#"
  },
  // Add more projects as needed
];

export const Portfolio: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className="portfolio-root">
      {/* Side Navigation */}
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
      <header>
        <button className="menu-btn" onClick={toggleSidebar} aria-label="Open navigation">
          &#9776;
        </button>
        <h1>Your Name</h1>
        <p>Web Developer | Designer | Creator</p>
      </header>
      <main>
        <section id="about">
          <h2>About Me</h2>
          <p>
            Brief bio here. Summarize your background, skills, and what you’re passionate about.
          </p>
        </section>
        <section id="projects">
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map((proj, idx) => (
              <div className="project-card" key={idx}>
                <img src={proj.image} alt={proj.title + " screenshot"} />
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
            Email: <a href="mailto:youremail@example.com">youremail@example.com</a>
          </p>
          {/* Social links can go here */}
        </section>
      </main>
    </div>
  );
};

export default Portfolio;
