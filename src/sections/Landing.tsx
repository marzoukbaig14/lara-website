import ScaleScene from '../components/ScaleScene';
import { profile } from '../content';

export default function Landing() {
  return (
    <header id="top" className="landing">
      <ScaleScene />
      <h1>{profile.name}</h1>
      <p>{profile.title}</p>
      <a href="#projects" className="cta">View projects</a>
    </header>
  );
}
