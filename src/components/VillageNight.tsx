/**
 * Illustrated night scene for the founder story: a small village house with one lit window
 * and a laptop glowing at 2 AM. Drawn in SVG (no photos), so it stays sharp and light.
 */
export default function VillageNight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 420" className={className} role="img" aria-label="Illustration of a village house at night with one window lit by a laptop screen at 2 AM">
      <defs>
        <linearGradient id="vn-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#071C15" />
          <stop offset="1" stopColor="#123F2E" />
        </linearGradient>
        <radialGradient id="vn-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F6C873" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F6C873" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="420" rx="28" fill="url(#vn-sky)" />
      {/* stars */}
      <g fill="#F6F5F0" opacity="0.8">
        {[[60, 50], [120, 90], [210, 40], [300, 70], [380, 30], [450, 85], [560, 55], [600, 110], [90, 140], [520, 140]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={x % 3 === 0 ? 1.8 : 1.2} />
        ))}
      </g>
      {/* moon */}
      <circle cx="530" cy="80" r="30" fill="#F6C873" />
      <circle cx="543" cy="72" r="27" fill="#0B271D" />
      {/* fields */}
      <path d="M0 300 Q160 270 320 292 T640 282 V420 H0Z" fill="#0C2D21" />
      <path d="M0 340 Q200 318 400 336 T640 330 V420 H0Z" fill="#174F39" />
      <g stroke="#2C7A57" strokeWidth="2" opacity="0.6">
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M${20 + i * 70} 420 L${120 + i * 60} 342`} />
        ))}
      </g>
      {/* neighbour houses */}
      <g fill="#123F2E">
        <path d="M40 300v-50l40-28 40 28v50z" />
        <path d="M470 296v-44l36-24 36 24v44z" />
        <rect x="560" y="258" width="60" height="38" />
      </g>
      {/* main house */}
      <g>
        <rect x="200" y="200" width="230" height="110" fill="#F6F5F0" />
        <rect x="200" y="186" width="230" height="16" fill="#D6EADF" />
        <rect x="220" y="168" width="30" height="20" fill="#F6F5F0" />
        <rect x="380" y="168" width="30" height="20" fill="#F6F5F0" />
        {/* gate */}
        <rect x="222" y="232" width="70" height="78" rx="4" fill="#C9852A" />
        <path d="M226 248h62M226 266h62M226 284h62" stroke="#8A5A1C" strokeWidth="2" />
        {/* lit window */}
        <circle cx="365" cy="250" r="70" fill="url(#vn-glow)" />
        <rect x="330" y="222" width="70" height="56" rx="4" fill="#F6C873" />
        <path d="M365 222v56M330 250h70" stroke="#C9852A" strokeWidth="2" />
        {/* laptop silhouette in window */}
        <rect x="346" y="244" width="30" height="20" rx="2" fill="#123F2E" />
        <rect x="349" y="247" width="24" height="14" fill="#7DB99A" />
        <rect x="341" y="264" width="40" height="4" rx="2" fill="#123F2E" />
      </g>
      {/* clock */}
      <g transform="translate(40 40)">
        <rect width="128" height="52" rx="14" fill="#F6F5F0" opacity="0.95" />
        <text x="64" y="34" textAnchor="middle" fontSize="24" fontWeight="800" fill="#123F2E" fontFamily="Arial, sans-serif">2:00 AM</text>
      </g>
    </svg>
  );
}
