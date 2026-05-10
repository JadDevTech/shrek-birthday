'use client';

interface MapBlockProps {
  address?: string;
  hint?: string;
}

export default function MapBlock({ address, hint }: MapBlockProps) {
  return (
    <div className="map-block leaf">
      <div className="corner-flourish tl">&#10086;</div>
      <div className="corner-flourish tr">&#10086;</div>
      <div className="corner-flourish bl">&#10086;</div>
      <div className="corner-flourish br">&#10086;</div>

      <div className="map-grid">
        <div className="map-art">
          <svg viewBox="0 0 360 240" width="100%" height="100%" aria-hidden="true">
            <defs>
              <pattern id="mp-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#7a4f1c" strokeWidth=".5" opacity=".25"/>
              </pattern>
            </defs>
            <rect width="360" height="240" fill="url(#mp-hatch)" opacity=".3"/>
            <path d="M -20 160 Q 80 130 160 170 T 380 150" fill="none" stroke="#5b8a3a" strokeWidth="6" opacity=".5"/>
            <path d="M -20 160 Q 80 130 160 170 T 380 150" fill="none" stroke="#a3c243" strokeWidth="2" opacity=".7"/>
            {[[60,80],[100,60],[140,90],[80,180],[260,70],[300,90],[290,200],[330,170]].map(([x,y],i)=>(
              <g key={i} transform={`translate(${x},${y})`}>
                <path d="M 0 0 L -10 14 L -4 14 L -10 24 L -2 24 L -8 34 L 8 34 L 2 24 L 10 24 L 4 14 L 10 14 Z" fill="#2f4818" opacity=".85"/>
                <rect x="-2" y="34" width="4" height="6" fill="#5a3818"/>
              </g>
            ))}
            <path d="M 20 30 Q 90 60 160 100 Q 230 130 300 120" fill="none" stroke="#5a3818" strokeWidth="2" strokeDasharray="3 6"/>
            <g transform="translate(300,120)">
              <circle r="22" fill="#7a2718" opacity=".15"/>
              <text x="0" y="6" textAnchor="middle" fill="#7a2718" fontFamily="UnifrakturCook, serif" fontSize="32">&#10005;</text>
            </g>
            <g transform="translate(40,200)">
              <circle r="16" fill="#f1e4c4" stroke="#5a3818" strokeWidth="1"/>
              <path d="M 0 -14 L 4 0 L 0 14 L -4 0 Z" fill="#7a2718"/>
              <text x="0" y="-18" textAnchor="middle" fontSize="9" fill="#5a3818" fontFamily="IM Fell English SC">N</text>
            </g>
          </svg>
        </div>

        <div className="map-info">
          <div className="rule"><span className="glyph">&#10086;</span><span className="glyph">&#10086;</span></div>
          <h3 className="display">La Palude di Shrek</h3>
          <p className="muted" style={{ marginTop: 8 }}>
            {address || (
              <span className="faded">
                <span className="mono">[indirizzo da inserire qui]</span>
              </span>
            )}
          </p>
          {hint && <p className="faded italic" style={{ marginTop: 10 }}>{hint}</p>}
          <div className="rule"><span className="glyph">&#10086;</span><span className="glyph">&#10086;</span></div>
        </div>
      </div>
    </div>
  );
}
