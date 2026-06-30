"use client";

import { useEffect } from "react";

/**
 * Lightweight, dependency-free motion system in the spirit of Emil Kowalski:
 * motion with purpose, natural ease-out, short distances, a soft blur-in.
 *  - [data-reveal]   : fades / lifts / unblurs once as it enters the viewport
 *  - [data-parallax] : drifts slowly against the scroll for subtle depth
 * Both honour prefers-reduced-motion and only touch transform / opacity / filter.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ----- Reveal on enter -----
    const revealEls = document.querySelectorAll("[data-reveal]");

    if (reduce || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }

    // ----- Subtle parallax -----
    const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of parallaxEls) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax) || 0.12;
        const center = rect.top + rect.height / 2;
        const progress = (center - vh / 2) / (vh / 2 + rect.height / 2);
        const shift = -progress * speed * rect.height;
        el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(1.14)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const useParallax = !reduce && parallaxEls.length > 0;
    if (useParallax) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
