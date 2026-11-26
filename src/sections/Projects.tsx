import Section from '../components/Section';
import { projects } from '../content';

export default function Projects() {
  return (
    <Section id="projects" title="Projects" numeral="III">
      {projects.map((p) => (
        <article key={p.title}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </article>
      ))}
    </Section>
  );
}
