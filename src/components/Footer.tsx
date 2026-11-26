import { profile } from '../content';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <p lang="la">Justitia omnibus</p>
      {profile.links.length > 0 && (
        <p>
          {profile.links.map((l, i) => (
            <span key={l.href}>
              {i > 0 && ' · '}
              <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            </span>
          ))}
        </p>
      )}
      <p>© {YEAR} {profile.name}</p>
    </footer>
  );
}
