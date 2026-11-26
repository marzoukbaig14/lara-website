/** Ornamental rule with a small Ionic-column glyph between sections. */
export default function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <svg viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M6 7c2-3 6-3 7 0M28 7c-2-3-6-3-7 0" />
        <path d="M5 9h24" />
        <path d="M11 9v18M15 9v18M19 9v18M23 9v18" />
        <path d="M8 27h18M6 30h22" />
      </svg>
    </div>
  );
}
