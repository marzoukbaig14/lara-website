import { useEffect, useState } from 'react';
import { motion, useAnimate, useInView, useReducedMotion } from 'framer-motion';
import Section from '../components/Section';
import { profile } from '../content';

const RAISED = -32; // gavel angle before the strike (degrees)

export default function About() {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.6 });
  const [struck, setStruck] = useState(!!reduce);

  // Gavel sequence: tremble → wind up → slam → shockwave + shake → reveal the content.
  useEffect(() => {
    if (!inView || reduce) return;
    let cancelled = false;
    (async () => {
      await animate('.gavel-head', { rotate: [RAISED, RAISED + 5, RAISED - 4, RAISED + 4, RAISED - 3, RAISED] }, { duration: 0.7, ease: 'easeInOut' });
      if (cancelled) return;
      await animate('.gavel-head', { rotate: RAISED - 16 }, { duration: 0.28, ease: 'easeOut' });
      if (cancelled) return;
      await animate('.gavel-head', { rotate: 0 }, { duration: 0.13, ease: [0.75, 0, 1, 1] });
      if (cancelled) return;
      animate('.gavel-head', { rotate: [0, -7, 0] }, { duration: 0.35, ease: 'easeOut' });
      animate('.gavel-ring', { scale: [0.15, 1.6], opacity: [0.9, 0] }, { duration: 0.8, ease: 'easeOut' });
      animate(scope.current, { x: [0, -7, 6, -4, 2, 0], y: [0, 4, -3, 2, 0] }, { duration: 0.4 });
      setStruck(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [inView, reduce, animate, scope]);

  const show = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: struck ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <Section id="about">
      <div ref={scope}>
        <div className="gavel-stage" aria-hidden="true">
          <GavelBlock />
          <motion.div
            className="gavel-head"
            style={{ position: 'absolute', inset: 0 }}
            initial={{ rotate: reduce ? 0 : RAISED }}
          >
            <Gavel />
          </motion.div>
          <div className="gavel-ring" />
        </div>
        <motion.p className="gavel-caption" {...show(0)} aria-hidden="true">
          The court is in session
        </motion.p>

        <div className="about-grid">
          <motion.figure className="portrait" {...show(1)}>
            {profile.photo ? (
              <img src={profile.photo} alt={`Portrait of ${profile.name}`} loading="lazy" />
            ) : (
              <div className="portrait-placeholder" role="img" aria-label="Portrait placeholder">
                {profile.name.charAt(0)}
              </div>
            )}
            <figcaption>{profile.photoCaption}</figcaption>
          </motion.figure>

          <div className="bio">
            {profile.bio.map((p, i) => (
              <motion.p key={i} {...show(2 + i)}>
                {p}
              </motion.p>
            ))}
            <motion.ul className="bio-facts" {...show(2 + profile.bio.length)}>
              {profile.facts.map((f) => (
                <li key={f.label}>
                  <strong>{f.label}</strong>
                  <span>{f.value}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* Gavel art — viewBox 0 0 260 200. The head strikes the block at (100, 160); the hand pivot is (240, 120). */

function GavelBlock() {
  return (
    <svg viewBox="0 0 260 200">
      <defs>
        <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b3f24" />
          <stop offset="1" stopColor="#2e1a10" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="194" rx="82" ry="6" fill="#000" opacity="0.5" />
      <path d="M30 168v16c0 7 31 12 70 12s70-5 70-12v-16z" fill="url(#wood)" />
      <ellipse cx="100" cy="168" rx="70" ry="11" fill="#7d4a2b" stroke="#b08d57" strokeWidth="1.5" />
      <ellipse cx="100" cy="168" rx="52" ry="7" fill="none" stroke="#b08d57" strokeOpacity="0.4" />
    </svg>
  );
}

function Gavel() {
  return (
    <svg viewBox="0 0 260 200">
      <defs>
        <linearGradient id="gavel-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a2214" />
          <stop offset="0.5" stopColor="#8a532f" />
          <stop offset="1" stopColor="#3a2214" />
        </linearGradient>
        <linearGradient id="handle-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a532f" />
          <stop offset="1" stopColor="#3a2214" />
        </linearGradient>
      </defs>
      {/* Handle */}
      <path d="M118 114h112c6 0 12 3 12 6s-6 6-12 6H118z" fill="url(#handle-wood)" />
      <rect x="226" y="113" width="5" height="14" rx="1" fill="#b08d57" />
      {/* Head: a barrel standing upright, striking face at the bottom */}
      <rect x="78" y="86" width="44" height="72" rx="6" fill="url(#gavel-wood)" />
      <rect x="76" y="98" width="48" height="7" rx="2" fill="#b08d57" />
      <rect x="76" y="139" width="48" height="7" rx="2" fill="#b08d57" />
      <rect x="82" y="152" width="36" height="8" rx="3" fill="#2e1a10" />
    </svg>
  );
}
