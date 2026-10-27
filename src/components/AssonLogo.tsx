import React from 'react';

interface AssonLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const AssonLogo: React.FC<AssonLogoProps> = ({
  className = '',
  size = 48,
  showText = false
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm select-none"
        aria-label="ASSON OAU Logo - Association of Statistics Students of Nigeria"
      >
        {/* Outer Circular Ring */}
        <circle cx="100" cy="85" r="76" stroke="#1A759F" strokeWidth="18" fill="white" />
        
        {/* Upper Arc Path for Text */}
        <path
          id="assonArcText"
          d="M 32 90 A 68 68 0 1 1 168 90"
          fill="none"
          stroke="none"
        />

        {/* Circular Curved Text: ASSOCIATION OF STATISTICS STUDENTS */}
        <text fill="#ffffff" fontSize="10.5" fontWeight="800" letterSpacing="0.8">
          <textPath href="#assonArcText" startOffset="50%" textAnchor="middle">
            ASSOCIATION OF STATISTICS STUDENTS
          </textPath>
        </text>

        {/* Inner Map of Nigeria Silhouette in Ocean Blue */}
        <path
          d="M 58 72 
             C 65 58, 80 50, 96 52 
             C 112 48, 134 52, 142 66 
             C 148 76, 144 92, 136 102 
             C 126 114, 114 122, 98 123 
             C 82 124, 68 116, 60 106 
             C 54 94, 52 82, 58 72 Z"
          fill="#1A759F"
          opacity="0.95"
        />

        {/* Histogram Bars */}
        <rect x="70" y="92" width="6" height="18" fill="#ffffff" rx="1" opacity="0.9" />
        <rect x="78" y="82" width="6" height="28" fill="#ffffff" rx="1" opacity="0.9" />
        <rect x="86" y="72" width="6" height="38" fill="#ffffff" rx="1" opacity="0.95" />
        <rect x="94" y="66" width="6" height="44" fill="#ffffff" rx="1" opacity="1" />
        <rect x="102" y="72" width="6" height="38" fill="#ffffff" rx="1" opacity="0.95" />
        <rect x="110" y="82" width="6" height="28" fill="#ffffff" rx="1" opacity="0.9" />
        <rect x="118" y="92" width="6" height="18" fill="#ffffff" rx="1" opacity="0.9" />

        {/* Normal Distribution Curve (Bell Curve) */}
        <path
          d="M 64 110 
             Q 82 108, 90 85 
             Q 97 60, 100 58 
             Q 103 60, 110 85 
             Q 118 108, 136 110"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Statistical Formulas inside seal */}
        <text x="124" y="76" fill="#ffffff" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
          x̄ = Σx / n
        </text>
        <text x="122" y="94" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
          σ² = Σ(x-μ)² / N
        </text>

        {/* Bottom Pedestal trapezoid: NIGERIA */}
        <path
          d="M 28 152 L 40 136 L 160 136 L 172 152 Z"
          fill="#1A759F"
        />
        <text x="100" y="148" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="2">
          NIGERIA
        </text>

        {/* White Motto Plaque */}
        <rect x="24" y="154" width="152" height="26" fill="#ffffff" stroke="#1A759F" strokeWidth="4" rx="3" />
        <text x="100" y="171" fill="#1A759F" fontSize="8.5" fontWeight="900" textAnchor="middle" letterSpacing="0.4">
          Facts with reliable figures
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-extrabold tracking-tight text-slate-900 leading-tight text-base md:text-lg">
            ASSON <span className="text-[#1A759F]">OAU</span>
          </span>
          <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
            Department of Statistics
          </span>
        </div>
      )}
    </div>
  );
};
