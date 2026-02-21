import { useEffect, useRef } from "react";
import type { JSX, ReactNode } from "react";

interface ScrollFadeInUpProps {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export default function ScrollFadeInUp({
  as: Component = "div",
  children,
  className = "",
  ...props
}: ScrollFadeInUpProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (ref.current) {
      ref.current.classList.add("opacity-0");
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Component ref={ref} className={className} {...props}>
      {children}
    </Component>
  );
}
