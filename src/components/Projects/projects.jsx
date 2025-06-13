"use client";

import { useState, useMemo } from "react";
import "./projects.css";
import Modal from "../Modal/modal";

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Wrap projects array in useMemo to prevent recreation on each render
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "E-Commerce Platform",
        description:
          "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product filtering, cart functionality, and payment processing.",
        image:
          "https://cdn.dribbble.com/userupload/11689406/file/original-69ad9d938946c69fd243b9e11ed1b751.png?resize=400x0",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
        github: "https://github.com/johndoe/ecommerce-platform",
        demo: "https://ecommerce-platform-demo.netlify.app",
      },
      {
        id: 2,
        title: "Task Management App",
        description:
          "A productivity application that helps users organize tasks, set priorities, and track progress. Built with React and Firebase for real-time updates and authentication.",
        image: "https://public-files.gumroad.com/fmru2vi51x9xdksc0pthxobp265i",
        technologies: ["React", "Firebase", "Material UI", "Context API"],
        github: "https://github.com/johndoe/task-management",
        demo: "https://task-management-demo.netlify.app",
      },
      {
        id: 3,
        title: "Weather Dashboard",
        description:
          "An interactive weather dashboard that provides current weather conditions and forecasts for any location. Utilizes OpenWeatherMap API and features a clean, responsive design.",
        image:
          "https://cdn.dribbble.com/userupload/18456569/file/original-7490c73afd13e8a2523fbe2c34f6853b.png?format=webp&resize=400x300&vertical=center",
        technologies: ["JavaScript", "HTML5", "CSS3", "OpenWeatherMap API"],
        github: "https://github.com/johndoe/weather-dashboard",
        demo: "https://weather-dashboard-demo.netlify.app",
      },
    ],
    []
  ); // Empty dependency array since projects don't change

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                />
                <div className="project-overlay">
                  <button
                    className="view-project-btn"
                    onClick={() => openModal(project)}
                  >
                    <i className="fas fa-eye"></i> View Details
                  </button>
                </div>
              </div>
              <div className="project-info">
                <div className="project-header">
                  <h3>{project.title}</h3>
                </div>
                <p>{project.description.substring(0, 100)}...</p>
                <div className="project-tech">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index}>{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span>+{project.technologies.length - 3}</span>
                  )}
                </div>
                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && selectedProject && (
        <Modal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  );
};

export default Projects;
