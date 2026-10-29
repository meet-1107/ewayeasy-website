/**
 * Animated hero scene (CSS + SVG, no JS): a manufacturer taps Generate in E-Way Easy on his phone,
 * the e-way bill is generated, boxes are loaded onto the truck and it drives off for delivery.
 * Hand-drawn outline style. One 9-second loop; respects prefers-reduced-motion (shows the final frame).
 */
const INK = '#16211C';

export default function DispatchAnimation({ className = '' }: { className?: string }) {
  return (
    <div className={`ee-scene relative ${className}`}>
      <style>{CSS}</style>
      <svg viewBox="0 0 640 480" className="h-auto w-full" role="img"
        aria-label="Animation: a manufacturer generates an e-way bill in the E-Way Easy app on his phone, boxes are loaded onto a truck and the truck leaves for delivery">
        {/* ground & road */}
        <rect x="0" y="0" width="640" height="480" rx="32" fill="#F6F5F0" />
        <circle cx="560" cy="80" r="44" fill="#F6C873" opacity="0.55" />
        <path d="M0 392h640v88H0z" fill="#D6EADF" />
        <path d="M0 392h640" stroke={INK} strokeWidth="3" />
        <g className="ee-road">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 70} y="432" width="36" height="6" rx="3" fill={INK} opacity="0.35" />
          ))}
        </g>

        {/* factory */}
        <g stroke={INK} strokeWidth="3" strokeLinejoin="round">
          <path d="M24 392V250l52-34v34l52-34v34l52-34v176z" fill="#FFFFFF" />
          <rect x="140" y="170" width="22" height="64" fill="#FFFFFF" />
          <rect x="44" y="300" width="56" height="92" fill="#2C7A57" />
          <path d="M44 322h56M44 344h56M44 366h56" stroke="#123F2E" strokeWidth="2" />
          <rect x="116" y="290" width="44" height="30" rx="4" fill="#F6C873" />
        </g>
        <g className="ee-smoke" fill="#FFFFFF" stroke={INK} strokeWidth="2">
          <circle cx="151" cy="150" r="10" /><circle cx="166" cy="132" r="13" /><circle cx="186" cy="112" r="16" />
        </g>
        <text x="102" y="270" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="13" fill={INK}>FACTORY</text>

        {/* boxes waiting at the factory (move into the truck) */}
        {[0, 1, 2].map((i) => (
          <g key={i} className={`ee-box ee-box-${i}`}>
            <rect x={186 + (i % 2) * 34} y={i === 2 ? 322 : 356} width="32" height="32" rx="3" fill="#E5A243" stroke={INK} strokeWidth="3" />
            <path d={`M${186 + (i % 2) * 34} ${(i === 2 ? 322 : 356) + 12}h32`} stroke={INK} strokeWidth="2" />
          </g>
        ))}

        {/* truck */}
        <g className="ee-truck">
          <g stroke={INK} strokeWidth="3" strokeLinejoin="round">
            <rect x="300" y="290" width="168" height="92" rx="8" fill="#FFFFFF" />
            <g className="ee-cargo">
              <rect x="316" y="326" width="36" height="36" rx="3" fill="#E5A243" />
              <rect x="356" y="326" width="36" height="36" rx="3" fill="#E5A243" />
              <rect x="336" y="292" width="36" height="34" rx="3" fill="#E5A243" />
            </g>
            <path d="M468 314h44l30 34v34h-74z" fill="#2C7A57" />
            <path d="M478 322h30l20 24h-50z" fill="#D6EADF" />
            <circle cx="336" cy="390" r="18" fill={INK} /><circle cx="336" cy="390" r="7" fill="#D6EADF" />
            <circle cx="506" cy="390" r="18" fill={INK} /><circle cx="506" cy="390" r="7" fill="#D6EADF" />
          </g>
          <rect x="316" y="300" width="136" height="20" rx="4" fill="#123F2E" />
          <text x="384" y="315" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill="#F6C873">E-WAY EASY</text>
          <g className="ee-speed" stroke={INK} strokeWidth="3" strokeLinecap="round">
            <path d="M270 320h-24M276 344h-36M270 368h-22" />
          </g>
        </g>

        {/* delivery pin */}
        <g className="ee-delivered">
          <rect x="430" y="214" width="176" height="46" rx="23" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
          <circle cx="456" cy="237" r="13" fill="#2C7A57" />
          <path d="m450 237 4 4 8-9" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" />
          <text x="478" y="243" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="15" fill={INK}>On the way!</text>
        </g>

        {/* manufacturer with phone */}
        <g transform="translate(200 120)">
          <g stroke={INK} strokeWidth="3" strokeLinejoin="round">
            {/* body */}
            <path d="M-6 150c0-40 18-62 46-62s46 22 46 62z" fill="#7DB99A" />
            <path d="M28 90l12 18 12-18" fill="#FFFFFF" />
            {/* head */}
            <circle cx="40" cy="58" r="28" fill="#C68B59" />
            <path d="M12 54c0-22 14-34 30-34s28 10 28 30c-8-8-22-10-34-6-10 4-18 6-24 10z" fill="#16211C" />
            <circle cx="40" cy="48" r="2.4" fill="#C2185B" stroke="none" />
            <path d="M30 68c6 5 14 5 20 0" fill="none" strokeWidth="2.5" strokeLinecap="round" />
            {/* arm holding the phone */}
            <path d="M74 112c18 4 30 -6 36 -22" fill="none" strokeWidth="10" stroke="#C68B59" strokeLinecap="round" />
            <path d="M74 112c18 4 30 -6 36 -22" fill="none" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>

        {/* the phone (big, readable) */}
        <g transform="translate(302 70)">
          <rect x="0" y="0" width="104" height="186" rx="16" fill="#123F2E" stroke={INK} strokeWidth="3" />
          <rect x="7" y="9" width="90" height="168" rx="10" fill="#FFFFFF" />
          <text x="52" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="10" fill="#174F39">E-Way Easy</text>
          {/* screen A: invoice + Generate */}
          <g className="ee-screen-a">
            <rect x="16" y="38" width="72" height="8" rx="4" fill="#D6EADF" />
            <rect x="16" y="52" width="56" height="8" rx="4" fill="#D6EADF" />
            <rect x="16" y="66" width="64" height="8" rx="4" fill="#D6EADF" />
            <text x="16" y="96" fontFamily="Arial, sans-serif" fontSize="8" fill="#4A5A52">Total</text>
            <text x="16" y="110" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill={INK}>₹1,47,500</text>
            <g className="ee-btn">
              <rect x="16" y="128" width="72" height="26" rx="13" fill="#E5A243" stroke={INK} strokeWidth="2" />
              <text x="52" y="145" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="10" fill={INK}>Generate</text>
            </g>
          </g>
          {/* screen B: generated */}
          <g className="ee-screen-b">
            <circle cx="52" cy="78" r="24" fill="#2C7A57" />
            <path d="m41 78 8 8 15-17" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="52" y="124" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="10" fill={INK}>E-way bill</text>
            <text x="52" y="138" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="10" fill={INK}>generated</text>
            <rect x="20" y="148" width="64" height="18" rx="9" fill="#25D366" />
            <text x="52" y="161" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="8.5" fill="#FFFFFF">Share PDF</text>
          </g>
          {/* tapping finger */}
          <g className="ee-tap">
            <circle cx="70" cy="146" r="9" fill="#C68B59" stroke={INK} strokeWidth="2.5" />
            <circle className="ee-ripple" cx="70" cy="146" r="9" fill="none" stroke="#E5A243" strokeWidth="3" />
          </g>
        </g>

        {/* doodle accents */}
        <g stroke={INK} strokeWidth="3" strokeLinecap="round" className="ee-spark">
          <path d="M424 60l10-12M436 74l16-4M422 46l2-16" />
        </g>
      </svg>
    </div>
  );
}

const CSS = `
.ee-scene{--ee-t:9s}
.ee-scene .ee-screen-a{animation:ee-a var(--ee-t) infinite}
.ee-scene .ee-screen-b{opacity:0;animation:ee-b var(--ee-t) infinite}
.ee-scene .ee-tap{animation:ee-tap var(--ee-t) infinite}
.ee-scene .ee-ripple{transform-origin:70px 146px;transform-box:fill-box;animation:ee-ripple var(--ee-t) infinite}
.ee-scene .ee-btn{transform-origin:center;transform-box:fill-box;animation:ee-press var(--ee-t) infinite}
.ee-scene .ee-box{animation:ee-load var(--ee-t) infinite}
.ee-scene .ee-box-1{animation-name:ee-load1}
.ee-scene .ee-box-2{animation-name:ee-load2}
.ee-scene .ee-cargo{opacity:0;animation:ee-cargo var(--ee-t) infinite}
.ee-scene .ee-truck{animation:ee-drive var(--ee-t) infinite}
.ee-scene .ee-speed{opacity:0;animation:ee-speed var(--ee-t) infinite}
.ee-scene .ee-road{animation:ee-road var(--ee-t) infinite linear}
.ee-scene .ee-delivered{opacity:0;transform-origin:518px 237px;transform-box:view-box;animation:ee-pop var(--ee-t) infinite}
.ee-scene .ee-smoke{animation:ee-smoke 3s infinite ease-in-out}
.ee-scene .ee-spark{animation:ee-spark var(--ee-t) infinite}
@keyframes ee-a{0%,30%{opacity:1}34%,96%{opacity:0}100%{opacity:1}}
@keyframes ee-b{0%,30%{opacity:0}34%,94%{opacity:1}98%,100%{opacity:0}}
@keyframes ee-tap{0%,10%{opacity:0;transform:translate(14px,24px)}18%{opacity:1;transform:translate(0,0)}26%{opacity:1;transform:translate(0,0)}32%,100%{opacity:0;transform:translate(14px,24px)}}
@keyframes ee-ripple{0%,20%{opacity:0;transform:scale(1)}24%{opacity:1;transform:scale(1)}32%,100%{opacity:0;transform:scale(2.6)}}
@keyframes ee-press{0%,21%{transform:scale(1)}24%{transform:scale(.92)}28%,100%{transform:scale(1)}}
@keyframes ee-load{0%,38%{opacity:1;transform:translate(0,0)}48%{opacity:1;transform:translate(130px,-10px)}50%,100%{opacity:0;transform:translate(130px,-10px)}}
@keyframes ee-load1{0%,42%{opacity:1;transform:translate(0,0)}52%{opacity:1;transform:translate(136px,-10px)}54%,100%{opacity:0;transform:translate(136px,-10px)}}
@keyframes ee-load2{0%,46%{opacity:1;transform:translate(0,0)}56%{opacity:1;transform:translate(150px,-30px)}58%,100%{opacity:0;transform:translate(150px,-30px)}}
@keyframes ee-cargo{0%,48%{opacity:0}50%,96%{opacity:1}100%{opacity:0}}
@keyframes ee-drive{0%,60%{transform:translateX(0)}86%{transform:translateX(420px)}87%{transform:translateX(-420px)}96%,100%{transform:translateX(0)}}
@keyframes ee-speed{0%,60%{opacity:0}64%,84%{opacity:1}86%,100%{opacity:0}}
@keyframes ee-road{0%,60%{transform:translateX(0)}86%,100%{transform:translateX(-140px)}}
@keyframes ee-pop{0%,64%{opacity:0;transform:scale(.6)}70%{opacity:1;transform:scale(1.06)}74%,92%{opacity:1;transform:scale(1)}96%,100%{opacity:0;transform:scale(.9)}}
@keyframes ee-smoke{0%,100%{transform:translateY(0);opacity:.9}50%{transform:translateY(-8px);opacity:.6}}
@keyframes ee-spark{0%,30%{opacity:0}34%,50%{opacity:1}56%,100%{opacity:0}}
@media (prefers-reduced-motion: reduce){
  .ee-scene *{animation:none!important}
  .ee-scene .ee-screen-a{opacity:0}.ee-scene .ee-screen-b{opacity:1}
  .ee-scene .ee-box{opacity:0}.ee-scene .ee-cargo{opacity:1}
  .ee-scene .ee-delivered{opacity:1}.ee-scene .ee-tap{opacity:0}
}
`;
