import React, { useEffect, useRef } from "react";

const RunningText = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const animationRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;
    let start = container.offsetWidth;
    const textWidth = text.offsetWidth;
    const speed = 0.5;
    const animate = () => {
      start -= speed;
      if (start < -textWidth) {
        start = container.offsetWidth;
      }
      text.style.transform = `translateX(${start}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);
  return (
    <div
      className="fixed bottom-0 w-full p-2 bg-amber-500 overflow-hidden"
      ref={containerRef}
    >
      <span
        className="text-white font-bold inline-block"
        ref={textRef}
        style={{ willChange: "transform" }}
      >
        Layanan Jam Buka Layanan Kami adalah Pukul 09 : 00 s.d 21.00 ..
      </span>
    </div>
  );
};

export default RunningText;
