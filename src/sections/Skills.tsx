import Section from '../components/Section';
import { skills } from '../content';

export default function Skills() {
  return (
    <Section id="skills" title="Skills" numeral="II">
      {skills.map((g) => (
        <div key={g.group}>
          <h3>{g.group}</h3>
          <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      ))}
    </Section>
  );
}
