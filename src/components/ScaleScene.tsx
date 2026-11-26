import { useEffect, useRef } from 'react';
import type { MotionValue } from 'framer-motion';

// Geometry (SVG user units, viewBox 0 0 600 500)
const PX = 300; // beam pivot
const PY = 130;
const ARM = 200; // pivot → hang point
const CHAIN = 150; // hang point → plate rim
const PLATE_R = 72;

/**
 * Inline-SVG justice scale. The beam and each plate are separate groups so they move independently:
 * the beam rotates around the pivot by `tilt` degrees, and each plate is translated to its beam end so it
 * keeps hanging straight down. Positive tilt lowers the right plate.
 */
export default function ScaleScene({ tilt }: { tilt?: MotionValue<number> }) {
  const beam = useRef<SVGGElement>(null);
  const left = useRef<SVGGElement>(null);
  const right = useRef<SVGGElement>(null);

  useEffect(() => {
    const apply = (deg: number) => {
      const rad = (deg * Math.PI) / 180;
      const dx = ARM * Math.cos(rad);
      const dy = ARM * Math.sin(rad);
      beam.current?.setAttribute('transform', `rotate(${deg} ${PX} ${PY})`);
      left.current?.setAttribute('transform', `translate(${PX - dx} ${PY - dy})`);
      right.current?.setAttribute('transform', `translate(${PX + dx} ${PY + dy})`);
    };
    apply(tilt?.get() ?? 0);
    return tilt?.on('change', apply);
  }, [tilt]);

  return (
    <svg className="scale-svg" viewBox="0 0 600 500" role="img" aria-label="Scales of justice">
      <defs>
        <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0d79d" />
          <stop offset="0.45" stopColor="#c29f63" />
          <stop offset="1" stopColor="#6e5530" />
        </linearGradient>
        <linearGradient id="brass-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7a5e34" />
          <stop offset="0.5" stopColor="#e6c88a" />
          <stop offset="1" stopColor="#7a5e34" />
        </linearGradient>
        <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9bb7c" />
          <stop offset="1" stopColor="#5b4527" />
        </linearGradient>
        <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f3c77a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f3c77a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Candle halo behind the pivot */}
      <circle cx={PX} cy={PY} r="190" fill="url(#halo)" />

      {/* Floor shadow */}
      <ellipse cx={PX} cy="482" rx="150" ry="10" fill="#000" opacity="0.5" />

      {/* Plinth */}
      <rect x="205" y="458" width="190" height="20" rx="2" fill="url(#brass)" />
      <rect x="232" y="442" width="136" height="18" rx="2" fill="url(#brass)" />
      <rect x="226" y="440" width="148" height="4" fill="#f0d79d" opacity="0.6" />

      {/* Fluted column */}
      <rect x="289" y="150" width="22" height="292" fill="url(#brass-h)" />
      <g stroke="#5b4527" strokeWidth="1.2" opacity="0.7">
        <line x1="294" y1="158" x2="294" y2="436" />
        <line x1="300" y1="158" x2="300" y2="436" />
        <line x1="306" y1="158" x2="306" y2="436" />
      </g>
      {/* Capital */}
      <path d="M276 150h48l-6-10h-36z" fill="url(#brass)" />
      <rect x="270" y="148" width="60" height="6" rx="2" fill="url(#brass)" />
      {/* Column base ring */}
      <rect x="282" y="430" width="36" height="12" rx="2" fill="url(#brass)" />

      {/* Left plate (origin = hang point) */}
      <g ref={left}>
        <Plate />
      </g>
      {/* Right plate */}
      <g ref={right}>
        <Plate />
      </g>

      {/* Beam */}
      <g ref={beam}>
        <path
          d={`M${PX - ARM} ${PY - 3} Q${PX} ${PY - 14} ${PX + ARM} ${PY - 3} L${PX + ARM} ${PY + 3} Q${PX} ${PY + 9} ${PX - ARM} ${PY + 3} Z`}
          fill="url(#brass)"
          stroke="#5b4527"
          strokeWidth="1"
        />
        {/* Scroll ornaments near the ends */}
        <path
          d={`M${PX - ARM + 8} ${PY - 4} c-10 -14 -26 -6 -20 4 M${PX + ARM - 8} ${PY - 4} c10 -14 26 -6 20 4`}
          fill="none"
          stroke="#d4b373"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx={PX - ARM} cy={PY} r="6" fill="url(#brass)" stroke="#5b4527" />
        <circle cx={PX + ARM} cy={PY} r="6" fill="url(#brass)" stroke="#5b4527" />
        {/* Pivot boss */}
        <circle cx={PX} cy={PY} r="16" fill="url(#brass)" stroke="#5b4527" strokeWidth="1.2" />
        <circle cx={PX} cy={PY} r="6" fill="#5b4527" />
      </g>

      {/* Finial: a small flame above the pivot */}
      <path d={`M${PX} ${PY - 52} c10 14 10 22 0 30 c-10 -8 -10 -16 0 -30z`} fill="#f3c77a" opacity="0.9" />
      <rect x={PX - 4} y={PY - 24} width="8" height="10" fill="url(#brass)" />
    </svg>
  );
}

function Plate() {
  const rimY = CHAIN;
  return (
    <g>
      {/* Three chains, dashed to read as links */}
      <g stroke="#c9a96a" strokeWidth="1.6" strokeDasharray="4 2.5" fill="none">
        <line x1="0" y1="4" x2={-PLATE_R + 6} y2={rimY} />
        <line x1="0" y1="4" x2="0" y2={rimY - 2} />
        <line x1="0" y1="4" x2={PLATE_R - 6} y2={rimY} />
      </g>
      <circle cx="0" cy="0" r="5" fill="none" stroke="#d4b373" strokeWidth="2" />
      {/* Bowl */}
      <path d={`M${-PLATE_R} ${rimY} Q0 ${rimY + 48} ${PLATE_R} ${rimY} Z`} fill="url(#plate)" />
      <ellipse cx="0" cy={rimY} rx={PLATE_R} ry="8" fill="#e6c88a" stroke="#6e5530" strokeWidth="1" />
      <ellipse cx="0" cy={rimY} rx={PLATE_R - 10} ry="4.5" fill="#8a6c3d" opacity="0.6" />
    </g>
  );
}
