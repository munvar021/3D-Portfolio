"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const MouseContext = createContext();

export const MouseProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Use useCallback to prevent unnecessary re-renders
  const handleMouseMove = useCallback((e) => {
    // Calculate mouse position relative to the center of the screen
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setMousePosition({ x, y });
    });
  }, []);

  useEffect(() => {
    // Use passive event listener for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <MouseContext.Provider value={mousePosition}>
      {children}
    </MouseContext.Provider>
  );
};

export const useMouse = () => useContext(MouseContext);
