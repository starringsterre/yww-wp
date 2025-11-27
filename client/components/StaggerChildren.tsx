import { useEffect, useRef } from "react";
import { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  animationType?: "fade-in-up" | "slide-in-left" | "slide-in-right" | "blur-reveal";
  [key: string]: any;
}

export default function StaggerChildren({
  children,
  className = "",
  staggerDelay = 100,
  animationType = "fade-in-up",
  ...props
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const childElements = entry.target.querySelectorAll("[data-stagger-child]");
          childElements.forEach((child, index) => {
            const element = child as HTMLElement;
            element.classList.add(`animate-${animationType}`);
            element.style.animationDelay = `${index * staggerDelay}ms`;
          });
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animationType, staggerDelay]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}
