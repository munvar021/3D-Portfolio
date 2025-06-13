"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as THREE from "three";
import { useMouse } from "../../context/MouseContext";
import "./contact.css";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const mountRef = useRef(null);
  const particlesRef = useRef(null);
  const mousePosition = useMouse();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Store the current value of mountRef.current
    const currentMount = mountRef.current;
    if (currentMount) {
      currentMount.appendChild(renderer.domElement);
    }

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Camera position
    camera.position.z = 3;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles based on mouse position
      if (particlesRef.current) {
        particlesRef.current.rotation.x +=
          (mousePosition.y * 0.2 - particlesRef.current.rotation.x) * 0.01;
        particlesRef.current.rotation.y +=
          (mousePosition.x * 0.2 - particlesRef.current.rotation.y) * 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [mousePosition]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success response
      setPopupType("success");
      setPopupMessage(
        "Your message has been sent successfully! I will get back to you soon."
      );
      setShowPopup(true);
      reset();
    } catch (error) {
      // Error response
      setPopupType("error");
      setPopupMessage("Oops! Something went wrong. Please try again later.");
      setShowPopup(true);
    }

    setIsSubmitting(false);

    // Hide popup after 5 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-3d" ref={mountRef}></div>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Talk</h3>
            <p>
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, I'll try my best to get back to
              you!
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <i className="fas fa-envelope"></i>
                <span>john.doe@example.com</span>
              </div>
              <div className="contact-method">
                <i className="fas fa-phone"></i>
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="contact-method">
                <i className="fas fa-map-marker-alt"></i>
                <span>New York City, USA</span>
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  rows="5"
                  {...register("message", { required: "Message is required" })}
                  className={errors.message ? "error" : ""}
                ></textarea>
                {errors.message && (
                  <span className="error-message">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className={`popup ${popupType}`}>
          <div className="popup-content">
            <i
              className={`popup-icon ${
                popupType === "success"
                  ? "fas fa-check-circle"
                  : "fas fa-exclamation-circle"
              }`}
            ></i>
            <p>{popupMessage}</p>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
