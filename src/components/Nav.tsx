import { sections } from '../content';

// Phase 2 adds active-section highlighting.
export default function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="nav-brand">S.</a>
      <ul>
        {sections.map((s) => (
          <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>
        ))}
      </ul>
    </nav>
  );
}
