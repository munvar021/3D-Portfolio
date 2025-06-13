"use client";

import { useEffect, useRef } from "react";
import "./smoothScroll.css";

const SmoothScroll = ({ children }) => {
  const scrollingContainerRef = useRef(null);
  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  useEffect(() => {
    requestAnimationFrame(() => smoothScrolling());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setBodyHeight = () => {
    document.body.style.height = `${
      scrollingContainerRef.current.getBoundingClientRect().height
    }px`;
  };

  useEffect(() => {
    // Set the height of the body to the height of the scrolling container
    setBodyHeight();
    window.addEventListener("resize", setBodyHeight);

    return () => {
      window.removeEventListener("resize", setBodyHeight);
    };
  }, []);

  const smoothScrolling = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    if (scrollingContainerRef.current) {
      scrollingContainerRef.current.style.transform = `translateY(-${data.rounded}px)`;
    }

    // Call itself on the next animation frame
    requestAnimationFrame(() => smoothScrolling());
  };

  return (
    <div className="parent">
      <div ref={scrollingContainerRef} className="smooth-scroll">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
