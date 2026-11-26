import type { ReactNode } from 'react';

// Generic section wrapper. Phase 4 adds the reveal-on-scroll animation here.
export default function Section({ id, title, numeral, children }: { id: string; title: string; numeral: string; children: ReactNode }) {
  return (
    <section id={id} className="section">
      <h2><span className="numeral">{numeral}.</span> {title}</h2>
      {children}
    </section>
  );
}
