import Section, { Reveal } from '../components/Section';
import { projects } from '../content';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export default function Projects() {
  return (
    <Section id="projects">
      <div className="cases">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.1} className="fill">
            <article className="case fill">
              <div className="case-no">
                <span>Case No. {ROMAN[i] ?? i + 1}</span>
                {p.year && <em>{p.year}</em>}
              </div>
              <h3>{p.title}</h3>
              {p.tags && p.tags.length > 0 && (
                <ul className="case-tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              <p>{p.description}</p>
              {p.links && p.links.length > 0 && (
                <div className="case-links">
                  {p.links.map((l, j) => (
                    <a key={l.href + j} href={l.href} target="_blank" rel="noreferrer">
                      <sup>{j + 1}</sup>
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
