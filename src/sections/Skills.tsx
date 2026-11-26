import Section, { Reveal } from '../components/Section';
import { skills } from '../content';

export default function Skills() {
  return (
    <Section id="skills">
      <div className="skills-grid">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.1}>
            <div className="ledger">
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
