import Section from '../components/Section';
import { profile } from '../content';

// Phase 4: gavel shake + drop reveals the photo and bio.
export default function About() {
  return (
    <Section id="about" title="About" numeral="I">
      {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
    </Section>
  );
}
