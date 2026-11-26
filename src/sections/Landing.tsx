import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import ScaleScene from '../components/ScaleScene';
import { profile } from '../content';

const MAX_TILT = 16; // degrees

export default function Landing() {
  const reduce = useReducedMotion();
  return reduce ? <StaticLanding /> : <ScrollLanding />;
}

/**
 * The signature interaction. The landing is a tall scroll runway with a sticky stage:
 * - scroll progress zooms the camera into the scale and fades the name out;
 * - scroll velocity tips the beam (scrolling down lowers the right plate, up lowers the left),
 *   through a loose spring so it swings and settles back to level when you stop.
 */
function ScrollLanding() {
  const runway = useRef<HTMLElement>(null);
  const { scrollY, scrollYProgress } = useScroll({ target: runway, offset: ['start start', 'end end'] });

  // Camera
  const zoom = useTransform(scrollYProgress, [0, 0.85], [1, 2.6]);
  // Dim behind the hero text, full while zooming, then dim again as About scrolls in over it.
  const scaleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.5, 1, 1, 0.3]);

  // Hero text
  const textOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.22], [0, -60]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  // Closing maxim, shown once we're zoomed in
  const maximOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.85, 0.97], [0, 1, 1, 0]);

  // Tilt from scroll velocity (px/s), sprung for weight
  const velocity = useVelocity(scrollY);
  const rawTilt = useTransform(velocity, (v) => Math.max(-MAX_TILT, Math.min(MAX_TILT, v / 30)));
  const tilt = useSpring(rawTilt, { stiffness: 110, damping: 8, mass: 0.9 });

  return (
    <header id="top" ref={runway} className="landing">
      <div className="landing-stage">
        <div className="landing-glow" />
        <motion.div
          className="scale-wrap"
          style={{ scale: zoom, opacity: scaleOpacity, transformOrigin: '50% 26%' }}
        >
          <ScaleScene tilt={tilt} />
        </motion.div>

        <motion.div className="landing-text" style={{ opacity: textOpacity, y: textY }}>
          <HeroText />
        </motion.div>

        <motion.div className="landing-maxim" style={{ opacity: maximOpacity }} aria-hidden="true">
          <p lang="la">Fiat justitia ruat caelum</p>
          <small>Let justice be done, though the heavens fall</small>
        </motion.div>

        <motion.div className="scroll-hint" style={{ opacity: hintOpacity }} aria-hidden="true">
          Scroll
        </motion.div>
        <div className="landing-fade" />
      </div>
    </header>
  );
}

/** Reduced-motion fallback: the scale at rest behind the hero text, no runway, no zoom. */
function StaticLanding() {
  return (
    <header id="top" className="landing is-static">
      <div className="landing-stage">
        <div className="landing-glow" />
        <div className="scale-wrap" style={{ opacity: 0.5 }}>
          <ScaleScene />
        </div>
        <div className="landing-text">
          <HeroText />
        </div>
        <div className="landing-fade" />
      </div>
    </header>
  );
}

function HeroText() {
  return (
    <>
      <p className="landing-eyebrow">{profile.eyebrow}</p>
      <h1>{profile.name}</h1>
      <p className="landing-title">{profile.title}</p>
      <a href="#projects" className="btn">View projects</a>
    </>
  );
}
