"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMouse } from "../../context/MouseContext";
import "./about.css";

const About = () => {
  const mountRef = useRef(null);
  const cubeRef = useRef(null);
  const mousePosition = useMouse();

  const skills = [
    { name: "HTML5", icon: "fab fa-html5" },
    { name: "CSS3", icon: "fab fa-css3-alt" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "React", icon: "fab fa-react" },
    { name: "Node.js", icon: "fab fa-node-js" },
    { name: "Git", icon: "fab fa-git-alt" },
    { name: "Sass", icon: "fab fa-sass" },
    { name: "Python", icon: "fab fa-python" },
  ];

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Use aspect ratio 1 for square container
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(300, 300); // Fixed size for the about section 3D element
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    // Store the current value of mountRef.current
    const currentMount = mountRef.current;
    if (currentMount) {
      currentMount.appendChild(renderer.domElement);
    }

    // Create a more interesting cube with custom geometry
    const geometry = new THREE.BoxGeometry(3, 3, 3, 2, 2, 2);

    // Create materials with different shades of white/gray for each face
    const materials = [
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.5,
        roughness: 0.2,
        emissive: 0xffffff,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xdddddd,
        metalness: 0.5,
        roughness: 0.2,
        emissive: 0xdddddd,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.5,
        roughness: 0.2,
        emissive: 0xffffff,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xdddddd,
        metalness: 0.5,
        roughness: 0.2,
        emissive: 0xdddddd,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.5,
        roughness: 0.2,
        emissive: 0xffffff,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xdddddd,
        metalness: 0.5,
        roughness: 0.2,
        emissive: 0xdddddd,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      }),
    ];

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    cubeRef.current = cube;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Add second point light
    const pointLight2 = new THREE.PointLight(0xcccccc, 1);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Camera position
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Apply mouse movement influence to the cube rotation with smoother easing
      if (cubeRef.current) {
        // Rotate based on mouse position with smooth easing
        cubeRef.current.rotation.x +=
          (mousePosition.y * 0.5 - cubeRef.current.rotation.x) * 0.05;
        cubeRef.current.rotation.y +=
          (mousePosition.x * 0.5 - cubeRef.current.rotation.y) * 0.05;

        // Add subtle continuous rotation
        cubeRef.current.rotation.z += 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [mousePosition]);

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div className="about-content">
          <div className="about-image">
            <div className="image-wrapper">
              <div className="about-3d" ref={mountRef}></div>
            </div>
          </div>

          <div className="about-text">
            <p>
              Hello! I'm Munvar, a passionate Full Stack Developer based in New
              York City. I enjoy creating things that live on the internet,
              whether that be websites, applications, or anything in between.
            </p>
            <p>
              My goal is to always build products that provide pixel-perfect,
              performant experiences. Shortly after graduating from University
              of Technology, I joined the engineering team at a startup where I
              work on a wide variety of interesting and meaningful projects on a
              daily basis.
            </p>
            <p>Here are a few technologies I've been working with recently:</p>

            <div className="skills-container">
              {skills.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <i className={skill.icon}></i>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
