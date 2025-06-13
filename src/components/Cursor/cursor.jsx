"use client";

import { useEffect, useState, useRef } from "react";
import { useMouse } from "../../context/MouseContext";
import "./cursor.css";

const Cursor = () => {
  const mousePosition = useMouse();
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  // Use refs to store the current position for smoother animation
  const cursorPos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseOver = () => {
      setIsHovering(true);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, .project-card"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);
    });

    // Animation function using requestAnimationFrame for smoother performance
    const animateCursor = () => {
      // Calculate the target position based on mouse coordinates
      const targetX =
        (mousePosition.x * window.innerWidth) / 2 + window.innerWidth / 2;
      const targetY =
        (-mousePosition.y * window.innerHeight) / 2 + window.innerHeight / 2;

      // Smooth cursor movement with easing
      cursorPos.current.x += (targetX - cursorPos.current.x) * 0.2;
      cursorPos.current.y += (targetY - cursorPos.current.y) * 0.2;

      // Follower has slower movement for trailing effect
      followerPos.current.x += (targetX - followerPos.current.x) * 0.1;
      followerPos.current.y += (targetY - followerPos.current.y) * 0.1;

      // Apply transforms using hardware-accelerated CSS
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animateCursor);
    };

    // Start the animation
    const animationId = requestAnimationFrame(animateCursor);

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseout", handleMouseOut);
      });

      // Clean up animation
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition]);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div
        className={`cursor-follower ${isHovering ? "hovering" : ""}`}
        ref={followerRef}
      />
    </>
  );
};

export default Cursor;
