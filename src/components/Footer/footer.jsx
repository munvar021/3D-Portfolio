"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMouse } from "../../context/MouseContext";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const mountRef = useRef(null);
  const ringsRef = useRef(null);
  const mousePosition = useMouse();

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 200,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, 200);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Store the current value of mountRef.current
    const currentMount = mountRef.current;
    if (currentMount) {
      currentMount.appendChild(renderer.domElement);
    }

    // Create rings
    const rings = new THREE.Group();

    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.TorusGeometry(i * 0.5 + 1, 0.05, 16, 100);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3 - i * 0.05,
        wireframe: true,
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2;
      rings.add(ring);
    }

    scene.add(rings);
    ringsRef.current = rings;

    // Camera position
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Apply mouse movement influence to the rings rotation
      if (ringsRef.current) {
        ringsRef.current.rotation.x +=
          (mousePosition.y * 0.2 - ringsRef.current.rotation.x) * 0.05;
        ringsRef.current.rotation.y +=
          (mousePosition.x * 0.2 - ringsRef.current.rotation.y) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / 200;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 200);
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

  return (
    <footer className="footer">
      <div className="footer-3d" ref={mountRef}></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span>JD</span>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-social">
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

        <div className="footer-bottom">
          <p>&copy; {currentYear} Munvar Khajavali. All Rights Reserved.</p>
          <p>
            Designed & Built with <i className="fas fa-heart"></i>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
