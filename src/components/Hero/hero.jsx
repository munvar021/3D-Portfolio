"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { useMouse } from "../../context/MouseContext";
import "./hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  const mountRef = useRef(null);
  const sphereRef = useRef(null);
  const mousePosition = useMouse();

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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    // Store the current value of mountRef.current
    const currentMount = mountRef.current;
    currentMount.appendChild(renderer.domElement);

    // Create a more complex geometry
    const geometry = new THREE.IcosahedronGeometry(5, 2); // More detailed icosahedron

    // Create custom shader material for more interesting visuals
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.3,
      roughness: 0.5,
      wireframe: true,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light with more intensity
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Add second point light for more dynamic lighting
    const pointLight2 = new THREE.PointLight(0xcccccc, 1);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Camera position
    camera.position.z = 15;

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Add bloom effect
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5, // strength
      0.4, // radius
      0.85 // threshold
    );
    composer.addPass(bloomPass);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Apply mouse movement influence to the sphere rotation with smoother easing
      if (sphereRef.current) {
        // Rotate based on mouse position with smooth easing
        sphereRef.current.rotation.x +=
          (mousePosition.y * 0.3 - sphereRef.current.rotation.x) * 0.05;
        sphereRef.current.rotation.y +=
          (mousePosition.x * 0.3 - sphereRef.current.rotation.y) * 0.05;

        // Add subtle continuous rotation
        sphereRef.current.rotation.z += 0.001;
      }

      // Move point light based on mouse position
      pointLight.position.x = mousePosition.x * 10;
      pointLight.position.y = mousePosition.y * 10;

      composer.render();
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      // Use the captured value in the cleanup function
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [mousePosition]); // Add mousePosition to the dependency array to fix the ESLint warning

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Munvar Khajavali</h1>
        <h2>Full Stack Developer</h2>
        <p>Building beautiful web experiences with modern technologies</p>
        <div className="hero-buttons">
          <Link to="/projects" className="btn">
            <i className="fas fa-code"></i> View My Work
          </Link>
          <Link to="/contact" className="btn btn-outline">
            <i className="fas fa-paper-plane"></i> Contact Me
          </Link>
        </div>
      </div>
      <div className="hero-3d" ref={mountRef}></div>
    </section>
  );
};

export default Hero;
