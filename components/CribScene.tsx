import { useId } from "react";

export type CribState = "back" | "tummy" | "cover" | "blind";

const C = {
  bg: "#0B1019",
  rail: "#41517A",
  railFill: "#18213A",
  mattress: "#26324D",
  dot: "#34436A",
  skin: "#C9D1DE",
  skinShade: "#B3BDCE",
  hair: "#97A3B9",
  sack: "#8796B0",
  sackShade: "#7787A3",
  ink: "#141C2B",
  blanket: "#6E7D9B",
  blanketFold: "#5D6B88",
  amber: "#F0A04B",
};

const SIDE_YS = Array.from({ length: 12 }, (_, i) => 66 + i * 26);
const END_XS = Array.from({ length: 8 }, (_, i) => 69 + i * 26);

function BabyOnBack({ breathe }: { breathe?: boolean }) {
  return (
    <g>
      {/* arms up beside the head, the usual sleeping pose */}
      <path d="M136 214 Q112 204 110 170" stroke={C.skinShade} strokeWidth="17" strokeLinecap="round" fill="none" />
      <path d="M184 214 Q208 204 210 170" stroke={C.skinShade} strokeWidth="17" strokeLinecap="round" fill="none" />
      <circle cx="110" cy="166" r="10" fill={C.skin} />
      <circle cx="210" cy="166" r="10" fill={C.skin} />
      <g className={breathe ? "breathe" : undefined}>
        <path d="M118 212 Q118 196 136 194 H184 Q202 196 202 212 L207 318 Q207 348 160 350 Q113 348 113 318 Z" fill={C.sack} />
        <path d="M160 202 V338" stroke={C.sackShade} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="160" cy="206" r="3.5" fill={C.sackShade} />
      </g>
      <circle cx="124" cy="164" r="8" fill={C.skinShade} />
      <circle cx="196" cy="164" r="8" fill={C.skinShade} />
      <circle cx="160" cy="160" r="37" fill={C.skin} />
      <path d="M144 129 q7 -7 14 -2 M157 125 q7 -6 14 0 M168 128 q6 -3 10 2" stroke={C.hair} strokeWidth="3" strokeLinecap="round" fill="none" />
      <g stroke={C.ink} strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M141 160 q7 5.5 14 0" />
        <path d="M165 160 q7 5.5 14 0" />
        <path d="M154 178 q6 3.5 12 0" />
      </g>
    </g>
  );
}

function BabyOnTummy() {
  return (
    <g>
      {/* arms bent, hands near the shoulders, seen from behind */}
      <path d="M136 214 Q106 214 112 190" stroke={C.skinShade} strokeWidth="17" strokeLinecap="round" fill="none" />
      <path d="M184 214 Q214 214 208 190" stroke={C.skinShade} strokeWidth="17" strokeLinecap="round" fill="none" />
      <circle cx="113" cy="186" r="10" fill={C.skin} />
      <circle cx="207" cy="186" r="10" fill={C.skin} />
      <path d="M118 212 Q118 196 136 194 H184 Q202 196 202 212 L207 318 Q207 348 160 350 Q113 348 113 318 Z" fill={C.sack} />
      <path d="M126 224 Q160 214 194 224" stroke={C.sackShade} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="128" cy="170" r="8" fill={C.skinShade} />
      <circle cx="160" cy="160" r="37" fill={C.hair} />
      <path d="M128 168 Q130 196 160 197 Q190 196 192 168 Q176 182 160 182 Q144 182 128 168Z" fill={C.skinShade} />
      <g stroke="#7E8BA3" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M160 150 m-9 0 a9 9 0 1 1 9 9" />
        <path d="M146 136 q14 -8 28 0" />
        <path d="M138 150 q4 -12 12 -16" />
      </g>
    </g>
  );
}

type Pt = [number, number];
const UP_BODY: Pt[] = [[134, 212], [186, 212], [118, 196], [202, 196], [110, 168], [210, 168], [140, 300], [180, 300]];
const UP_FACE: Pt[] = [[148, 160], [172, 160], [160, 170]];
const DOWN_BODY: Pt[] = [[134, 212], [186, 212], [112, 210], [208, 210], [113, 188], [207, 188], [140, 300], [180, 300]];
const LIMBS: [number, number][] = [[0, 2], [2, 4], [1, 3], [3, 5], [0, 1], [0, 6], [1, 7], [6, 7]];

function Keypoints({ state }: { state: CribState }) {
  if (state === "blind") return null;
  const body = state === "tummy" ? DOWN_BODY : UP_BODY;
  const hidden = state === "cover";
  return (
    <g className="keypoints" stroke={C.amber} fill={C.amber}>
      <g strokeWidth="1.5" opacity={hidden ? 0.35 : 0.6} strokeDasharray={hidden ? "3 4" : undefined}>
        {LIMBS.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={body[a][0]} y1={body[a][1]} x2={body[b][0]} y2={body[b][1]} />
        ))}
      </g>
      {body.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.4" fillOpacity={hidden ? 0 : 1} strokeWidth="1.5" />
      ))}
      {state !== "tummy" &&
        UP_FACE.map(([x, y]) => (
          <circle key={`f${x}-${y}`} cx={x} cy={y} r="3.4" fillOpacity={hidden ? 0 : 1} strokeWidth="1.5" />
        ))}
    </g>
  );
}

export function CribScene({
  state,
  detection = true,
  breathe = false,
}: {
  state: CribState;
  detection?: boolean;
  breathe?: boolean;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const facing = state === "tummy" ? "down" : "up";
  const labels: Record<CribState, string> = {
    back: "Overhead night view of a baby asleep on their back in a crib",
    tummy: "Overhead night view of a baby who has rolled onto their tummy",
    cover: "Overhead night view of a baby whose face is covered by a blanket",
    blind: "The camera view is blocked",
  };

  return (
    <svg viewBox="0 0 320 420" className="crib-scene" role="img" aria-label={labels[state]}>
      <defs>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="42%" r="62%">
          <stop offset="0" stopColor="#4A5C84" stopOpacity="0.55" />
          <stop offset="1" stopColor={C.bg} stopOpacity="0" />
        </radialGradient>
        <pattern id={`sheet-${uid}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1.7" fill={C.dot} />
        </pattern>
        <filter id={`grain-${uid}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width="320" height="420" fill={C.bg} />
      <rect x="18" y="18" width="284" height="384" rx="26" fill={C.railFill} stroke={C.rail} strokeWidth="8" />
      <g stroke={C.rail} strokeWidth="5" strokeLinecap="round">
        {SIDE_YS.map((y) => (
          <g key={y}>
            <line x1="24" y1={y} x2="40" y2={y} />
            <line x1="280" y1={y} x2="296" y2={y} />
          </g>
        ))}
        {END_XS.map((x) => (
          <g key={x}>
            <line x1={x} y1="24" x2={x} y2="40" />
            <line x1={x} y1="380" x2={x} y2="396" />
          </g>
        ))}
      </g>
      <rect x="44" y="44" width="232" height="332" rx="14" fill={C.mattress} />
      <rect x="44" y="44" width="232" height="332" rx="14" fill={`url(#sheet-${uid})`} />
      <rect width="320" height="420" fill={`url(#glow-${uid})`} />

      {detection && (
        <rect x="50" y="50" width="220" height="320" rx="10" fill="none" stroke={C.amber} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="6 7" />
      )}

      <g className="baby" key={facing}>
        {facing === "up" ? <BabyOnBack breathe={breathe && state === "back"} /> : <BabyOnTummy />}
      </g>

      <g className={`blanket${state === "cover" ? " is-on" : ""}`}>
        <path d="M62 132 Q110 112 160 120 Q212 112 258 134 L264 350 Q264 366 248 366 H72 Q56 366 56 350 Z" fill={C.blanket} />
        <g stroke={C.blanketFold} strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M84 178 Q130 168 168 186" />
          <path d="M150 236 Q200 222 240 240" />
          <path d="M80 290 Q120 280 160 300" />
        </g>
      </g>

      {detection && <Keypoints state={state} />}

      <rect width="320" height="420" filter={`url(#grain-${uid})`} opacity="0.07" />

      <g className={`blocked${state === "blind" ? " is-on" : ""}`}>
        <rect width="320" height="420" fill="#06090F" />
        <rect width="320" height="420" filter={`url(#grain-${uid})`} opacity="0.12" />
        <g transform="translate(160 196)" stroke="#A9B4C6" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M-22 0 Q0 -18 22 0 Q0 18 -22 0Z" />
          <circle r="6" />
          <path d="M-24 18 L24 -18" />
        </g>
        <text x="160" y="248" textAnchor="middle" fill="#A9B4C6" fontSize="15" fontFamily="var(--font-body), sans-serif">
          No clear view
        </text>
      </g>
    </svg>
  );
}

export function CribView({
  state,
  time = "2:14 am",
  breathe,
  detection,
}: {
  state: CribState;
  time?: string;
  breathe?: boolean;
  detection?: boolean;
}) {
  return (
    <div className="cribview">
      <div className="cribview-hud" aria-hidden="true">
        <span>
          <i className="rec" /> Night vision
        </span>
        <span>{time}</span>
      </div>
      <CribScene state={state} breathe={breathe} detection={detection} />
    </div>
  );
}
