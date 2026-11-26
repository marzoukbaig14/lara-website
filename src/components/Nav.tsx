import { useEffect, useState } from 'react';
import { sections } from '../content';

export default function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [solid, setSolid] = useState(false);

  // Active section = the last one whose top has passed the middle of the viewport.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    let frame = 0;
    const update = () => {
      frame = 0;
      setSolid(window.scrollY > 40);
      const line = window.innerHeight * 0.5;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      if (atBottom && els.length) current = els[els.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <nav className={`nav${solid ? ' is-solid' : ''}`} aria-label="Sections">
      <a href="#top" className="nav-brand" aria-label="Back to top">
        S<span>.</span>
      </a>
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={active === s.id ? 'is-active' : undefined}
              aria-current={active === s.id ? 'true' : undefined}
            >
              <span className="nav-numeral" aria-hidden="true">{s.numeral}.</span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
