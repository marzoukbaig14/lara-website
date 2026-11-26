import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { sections, type SectionId } from '../content';

/** Section wrapper: anchor id, numbered heading with a Latin maxim, and a rise-in reveal. */
export default function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  const meta = sections.find((s) => s.id === id)!;

  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <motion.header
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-numeral">{meta.numeral}</span>
        <h2 id={`${id}-title`}>{meta.label}</h2>
        <p className="section-maxim" lang="la">
          {meta.maxim}
          <span lang="en">{meta.translation}</span>
        </p>
      </motion.header>
      {children}
    </section>
  );
}

/** Fade-and-rise wrapper for content inside a section. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
