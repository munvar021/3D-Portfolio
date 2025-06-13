"use client";

import { useEffect } from "react";
import "./modal.css";

const Modal = ({ project, onClose }) => {
  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";

    // Enable body scroll when modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Close modal when clicking outside of content
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-header">
          <h2>{project.title}</h2>
        </div>

        <div className="modal-body">
          <div className="modal-image">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
            />
          </div>

          <div className="modal-details">
            <div className="modal-description">
              <h3>Description</h3>
              <p>{project.description}</p>
            </div>

            <div className="modal-technologies">
              <h3>Technologies</h3>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
            </div>

            <div className="modal-links">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <i className="fab fa-github"></i> View Code
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
