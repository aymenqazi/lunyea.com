"use client";

import { useRef, useState, useEffect, useCallback } from "react";

function initials(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("");
}

const Chevron = ({ dir }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TestimonialsCarousel({ items }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(true);

  // refs the autoplay loop reads without re-subscribing
  const activeRef = useRef(0);
  const dirRef = useRef(1);
  const pausedRef = useRef(false);

  const step = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = track.children;
    if (cards.length < 2) return track.clientWidth;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  };

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const s = step() || 1;
    const start = track.scrollLeft <= 2;
    const end = track.scrollLeft >= max - 2;
    const idx = end ? items.length - 1 : Math.round(track.scrollLeft / s);
    setAtStart(start);
    setAtEnd(end);
    setScrollable(max > 4);
    setActive(idx);
    activeRef.current = idx;
  }, [items.length]);

  const goTo = useCallback((i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    track.scrollTo({ left: clamped * step(), behavior: "smooth" });
  }, [items.length]);

  useEffect(() => {
    sync();
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; sync(); });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sync]);

  // Gentle ping-pong autoplay; pauses on hover/focus, off for reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || items.length < 2) return;

    const id = setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      let next = activeRef.current + dirRef.current;
      if (next > items.length - 1) { dirRef.current = -1; next = items.length - 2; }
      else if (next < 0) { dirRef.current = 1; next = 1; }
      goTo(next);
    }, 5200);
    return () => clearInterval(id);
  }, [goTo, items.length]);

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  return (
    <div
      className={`carousel ${atStart ? "is-start" : ""} ${atEnd ? "is-end" : ""}`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <div className="carousel-viewport">
        <div className="carousel-track" ref={trackRef}>
          {items.map((t) => (
            <article key={t.name} className="testi-card">
              <div className="stars">★★★★★</div>
              <p>{t.text}</p>
              <div className="testi-name">
                <span className="avatar">{initials(t.name)}</span>
                {t.name}
              </div>
            </article>
          ))}
        </div>
      </div>

      {scrollable && (
        <div className="carousel-controls">
          <div className="carousel-dots" role="tablist" aria-label="Testimonials">
            {items.map((t, i) => (
              <button
                key={t.name}
                className={`carousel-dot ${i === active ? "active" : ""}`}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-selected={i === active}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className="carousel-arrows">
            <button
              className="carousel-arrow"
              aria-label="Previous testimonial"
              onClick={() => goTo(active - 1)}
              disabled={atStart}
            >
              <Chevron dir="left" />
            </button>
            <button
              className="carousel-arrow"
              aria-label="Next testimonial"
              onClick={() => goTo(active + 1)}
              disabled={atEnd}
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
