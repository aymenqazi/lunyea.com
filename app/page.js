import Header from "./components/Header";
import ScrollReveal from "./components/ScrollReveal";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import { specialists, testimonials, educationCards, treatments } from "./data";

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  return (
    <>
      {/* Safety: if JS never runs, reveal everything immediately */}
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
      </noscript>

      <Header />
      <ScrollReveal />

      {/* ===== Hero ===== */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline
          poster="/content/ad5b6220-35be-4431-8438-5c3bfb450313.png">
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay" />
        <div className="hero-grain" />

        <div className="hero-content">
          <h1>
            <span className="hero-line hero-line-1">Stop Snoring.</span>
            <span className="hero-line hero-line-2 serif">Start Sleeping.</span>
          </h1>
          <div className="hero-actions">
            <a href="#assessment" className="hero-cta">Free sleep assessment</a>
          </div>
        </div>

      </section>

      {/* ===== Value proposition ===== */}
      <section className="section valueprop" id="assessment">
        <div className="container valueprop-inner reveal-group">
          <p className="eyebrow" data-reveal>Why Luneya</p>
          <h2 className="title" data-reveal>
            Restful sleep <span className="serif">starts here</span>
          </h2>
          <p className="valueprop-lead" data-reveal>
            We treat snoring and sleep apnea at the source, with surgical, in-office,
            and device-based care led by head and neck surgeons.
          </p>
          <a href="#specialists" className="btn btn-primary" data-reveal>Free sleep assessment</a>
        </div>
      </section>

      {/* ===== Specialists ===== */}
      <section className="section specialists" id="specialists">
        <div className="container">
          <div className="section-head reveal-group">
            <p className="eyebrow" data-reveal>Your surgeons</p>
            <h2 className="title" data-reveal>
              Care led by <span className="serif">specialists</span>
            </h2>
          </div>
          <div className="specialists-grid reveal-group">
            {specialists.map((s) => (
              <article key={s.name} className="spec-card" data-reveal>
                <div className="spec-photo-wrap">
                  <img className="spec-photo" src={s.photo} alt={s.name} />
                </div>
                <div className="spec-body">
                  <div className="spec-role">{s.role}</div>
                  <h3>{s.name}</h3>
                  <p className="spec-bio">{s.bio}</p>
                  <div className="spec-foot">
                    <div className="unis">
                      {s.unis.map((u) => (
                        <img key={u.name} src={u.logo} alt={u.name} title={u.name} />
                      ))}
                    </div>
                    <a href="#" className="read-more">Profile <Arrow /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="section testimonials">
        <div className="container">
          <div className="section-head reveal-group">
            <p className="eyebrow" data-reveal>Patient stories</p>
            <h2 className="title" data-reveal>
              Quiet nights, <span className="serif">in their words</span>
            </h2>
          </div>
          <div data-reveal>
            <TestimonialsCarousel items={testimonials} />
          </div>
        </div>
      </section>

      {/* ===== Education ===== */}
      <section className="section" id="learn">
        <div className="container">
          <div className="section-head edu-intro reveal-group">
            <p className="eyebrow" data-reveal>Understanding snoring</p>
            <h2 className="title" data-reveal>
              Know what your <span className="serif">sleep is telling you</span>
            </h2>
            <p data-reveal>
              Snoring is throat tissue vibrating as airflow narrows. Often harmless, it can also
              signal sleep apnea, where breathing stops and starts through the night.
            </p>
          </div>
          <div className="edu-grid reveal-group">
            {educationCards.map((c, i) => (
              <div key={c.title} className="edu-card" data-reveal>
                <span className="edu-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="edu-text">
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="edu-cta" data-reveal>
            <a href="#assessment" className="btn btn-primary">Free sleep assessment</a>
          </div>
        </div>
      </section>

      {/* ===== Locations ===== */}
      <section className="section locations" id="locations">
        <div className="container loc-grid">
          <div className="loc-img" data-reveal>
            <img src="/content/ad5b6220-35be-4431-8438-5c3bfb450313.png"
              alt="Visit our clinics in Edmonton and Calgary" data-parallax="0.1" />
          </div>
          <div className="loc-copy reveal-group">
            <p className="eyebrow" data-reveal>Where to find us</p>
            <h2 data-reveal>Clinics in Edmonton and Calgary</h2>
            <p data-reveal>
              Care through our partner head and neck surgery clinics, including Aria Sleep,
              Alberta ENT, Mission Surgery, and Sleep Surgery Canada. Modern facilities, with
              your health and sleep at the center.
            </p>
            <a href="#" className="read-more" data-reveal>Visit a clinic <Arrow /></a>
          </div>
        </div>
      </section>

      {/* ===== CTA strip ===== */}
      <section className="cta-strip">
        <div className="container reveal-group">
          <h2 data-reveal>Stop snoring, start <span className="serif">sleeping</span></h2>
          <a href="#assessment" className="btn btn-light" data-reveal>Do a free sleep assessment</a>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid reveal-group">
            <div className="footer-brand" data-reveal>
              <img src="/luneya_footer_logo_desktop.png" alt="Luneya logo" />
              <p>Stop snoring, start sleeping.</p>
            </div>

            <div data-reveal>
              <h5>Treatments</h5>
              <ul>
                {treatments.map((t) => (
                  <li key={t.title}><a href="#">{t.title}</a></li>
                ))}
              </ul>
            </div>

            <div data-reveal>
              <h5>Company</h5>
              <ul>
                <li><a href="#locations">Our clinics</a></li>
                <li><a href="#specialists">Specialists</a></li>
                <li><a href="#learn">Learn more</a></li>
                <li><a href="#contact">Contact us</a></li>
              </ul>
            </div>

            <div data-reveal>
              <h5>Get in touch</h5>
              <ul>
                <li><a href="tel:+17807841350">(780) 784-1350</a></li>
                <li>Hours: Monday to Friday<br />9 am – 7 pm EST</li>
                <li>#200, 11104 102 Ave NW<br />Edmonton, AB T5K 2H4</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Luneya. All rights reserved.</span>
            <span>Stop Snoring. Start Sleeping.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
