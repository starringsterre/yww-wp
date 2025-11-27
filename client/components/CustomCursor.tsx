import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        body {
          cursor: none !important;
        }
      `}</style>

      {/* Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Outer glow effect */}
        <motion.div
          className="absolute w-8 h-8 rounded-full"
          animate={{
            boxShadow: isVisible
              ? "0 0 20px rgba(217, 233, 223, 0.6), 0 0 40px rgba(217, 233, 223, 0.3)"
              : "0 0 0px rgba(217, 233, 223, 0)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Flower emoji cursor */}
        <motion.div
          className="text-3xl"
          animate={{
            scale: isVisible ? 1 : 0.8,
            rotate: isVisible ? 0 : -45,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          🌸
        </motion.div>
      </motion.div>

      {/* Click ripple effect */}
      <ClickRipple />
    </>
  );
}

function ClickRipple() {
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed pointer-events-none rounded-full border-2"
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: "rgba(217, 233, 223, 0.8)",
          }}
          initial={{ scale: 0, opacity: 1, x: "-50%", y: "-50%" }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </>
  );
}
