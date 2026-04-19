"use client";

import { useId } from "react";

/**
 * Неровный золотой сургуч + монограмма DG, визуально «вдавленная» в воск.
 */
export function WaxSeal({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const waxGold = `waxGold-${id}`;
  const waxShade = `waxShade-${id}`;

  return (
    <svg
      className={className}
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id={waxGold} cx="32%" cy="24%" r="85%">
          <stop offset="0%" stopColor="#f4ead8" />
          <stop offset="22%" stopColor="#e8d4b8" />
          <stop offset="45%" stopColor="#C4A77D" />
          <stop offset="72%" stopColor="#9e7f55" />
          <stop offset="100%" stopColor="#5c3d24" />
        </radialGradient>
        <radialGradient id={waxShade} cx="70%" cy="78%" r="52%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.32)" />
        </radialGradient>
      </defs>

      <path
        fill={`url(#${waxGold})`}
        d="M108 14c26-.8 48 8 64 26 17 19 25 46 20 72-4 22-17 42-36 54-21 14-48 18-74 12-28-6-52-24-64-50-10-22-10-48 2-70 12-24 36-42 64-46 8-1 16-1 24 2z"
      />
      <path
        fill={`url(#${waxShade})`}
        opacity={0.55}
        d="M108 14c26-.8 48 8 64 26 17 19 25 46 20 72-4 22-17 42-36 54-21 14-48 18-74 12-28-6-52-24-64-50-10-22-10-48 2-70 12-24 36-42 64-46 8-1 16-1 24 2z"
      />
      <ellipse cx={102} cy={48} rx={44} ry={16} fill="rgba(255,255,255,0.22)" />

      {/**
       * Латинские D / G: плотное перекрытие, G чуть ниже и правее внутрь D.
       */}
      <g transform="translate(110 118)">
        <g
          style={{
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: "62px",
          }}
        >
          {/* Тень гравировки — сначала D, потом G (G сверху по перекрытию) */}
          <g transform="translate(-16 -1) rotate(-9) translate(1.2 1.8)" opacity={0.42}>
            <text
              fill="#1a0f08"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              D
            </text>
          </g>
          <g transform="translate(6 22) rotate(6) translate(1.2 1.8)" opacity={0.42}>
            <text
              fill="#1a0f08"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              G
            </text>
          </g>

          <g transform="translate(-16 -1) rotate(-9)">
            <text
              fill="#5c4033"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              D
            </text>
          </g>
          <g transform="translate(6 22) rotate(6)">
            <text
              fill="#5c4033"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              G
            </text>
          </g>

          <g
            fill="none"
            stroke="rgba(255,252,247,0.35)"
            strokeWidth={0.35}
          >
            <text transform="translate(-16 -1) rotate(-9)" textAnchor="middle" dominantBaseline="middle">
              D
            </text>
            <text transform="translate(6 22) rotate(6)" textAnchor="middle" dominantBaseline="middle">
              G
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
}
