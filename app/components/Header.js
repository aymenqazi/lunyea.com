"use client";

import { useState, useEffect } from "react";
import { treatments } from "../data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header--solid" : "header--top"}`}>
      <div className="container header-inner">
        <a href="#" className="logo" aria-label="Luneya home">
          <img
            className="logo-mark"
            src={scrolled ? "/logo-mark-black.svg" : "/logo-mark-white.svg"}
            alt=""
          />
          <img
            className="logo-word"
            src={scrolled ? "/logo-wordmark-black.svg" : "/logo-wordmark-white.svg"}
            alt="Luneya"
          />
        </a>

        <nav className="nav">
          <a href="#locations" className="nav-link">Our clinics</a>

          <div className="has-dropdown">
            <span className="nav-link">
              Treatments
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="dropdown">
              {treatments.map((t) => (
                <a key={t.title} href="#" className="dropdown-item">
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </a>
              ))}
            </div>
          </div>

          <a href="#contact" className="nav-link">Contact us</a>
        </nav>

        <div className="header-actions">
          <a href="tel:+17807841350" className="phone-link">(780) 784-1350</a>
          <a href="#assessment" className="header-cta">Free sleep assessment</a>
        </div>
      </div>
    </header>
  );
}
