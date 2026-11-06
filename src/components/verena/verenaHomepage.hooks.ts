import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}

export function useInViewport<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

export const STAGE_LEAVE_DURATION_MS = 350;

export function useStageTransition<T>(active: T) {
  const [leaving, setLeaving] = useState<T | null>(null);
  const prevRef = useRef(active);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    if (prev === active) return;
    prevRef.current = active;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setLeaving(prev);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setLeaving(null), STAGE_LEAVE_DURATION_MS);
  }, [active]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return leaving;
}
