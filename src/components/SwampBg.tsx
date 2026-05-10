'use client';

import { useEffect, useRef } from 'react';

interface SwampBgProps {
  pattern?: string;
  tone?: string;
}

const palettes: Record<string, string[]> = {
  swamp:  ['#cdd86f', '#a3c243', '#5b8a3a', '#fff1b8'],
  sunset: ['#ffd49a', '#ffa46b', '#e3735a', '#ffe9b8'],
  mud:    ['#d4b076', '#a87a3e', '#7a4f1c', '#f0d9a3'],
  pink:   ['#ffd0e0', '#ff9bbf', '#d96b9a', '#fff0e6']
};

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r1: number, r2: number, points: number) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? r1 : r2;
    const a = (Math.PI / points) * i - Math.PI / 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

export default function SwampBg({ pattern = 'fireflies', tone = 'swamp' }: SwampBgProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    let raf: number;
    let w: number, h: number, dpr: number;

    interface Particle { x: number; y: number; r: number; vx: number; vy: number; phase: number; col: string; }
    let particles: Particle[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv!.clientWidth; h = cv!.clientHeight;
      cv!.width = w * dpr; cv!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const cols = palettes[tone] || palettes.swamp;

    function spawn() {
      particles = [];
      const n = pattern === 'none' ? 0 : (pattern === 'stars' ? 80 : 60);
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: pattern === 'bubbles' ? (3 + Math.random() * 12) : (1 + Math.random() * 2.4),
          vx: (Math.random() - .5) * 0.3,
          vy: pattern === 'bubbles' ? -(0.2 + Math.random() * 0.6) : (Math.random() - .5) * 0.25,
          phase: Math.random() * Math.PI * 2,
          col: cols[Math.floor(Math.random() * cols.length)]
        });
      }
    }
    spawn();

    let t = 0;
    function frame() {
      t += 0.016;
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx + (pattern === 'bubbles' ? Math.sin(t + p.phase) * 0.3 : 0);
        p.y += p.vy + (pattern === 'fireflies' ? Math.sin(t * 0.6 + p.phase) * 0.15 : 0);
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        if (pattern === 'fireflies') {
          const a = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 2 + p.phase));
          ctx!.beginPath();
          const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
          grad.addColorStop(0, p.col + 'cc');
          grad.addColorStop(0.4, p.col + '55');
          grad.addColorStop(1, p.col + '00');
          ctx!.fillStyle = grad;
          ctx!.globalAlpha = a;
          ctx!.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = 1;
        } else if (pattern === 'bubbles') {
          ctx!.beginPath();
          ctx!.strokeStyle = p.col + '88';
          ctx!.lineWidth = 1.2;
          ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.fillStyle = p.col + '22';
          ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.beginPath();
          ctx!.fillStyle = '#ffffff66';
          ctx!.arc(p.x - p.r * 0.35, p.y - p.r * 0.35, p.r * 0.25, 0, Math.PI * 2);
          ctx!.fill();
        } else if (pattern === 'stars') {
          ctx!.fillStyle = p.col;
          ctx!.globalAlpha = 0.5 + 0.5 * Math.sin(t * 1.4 + p.phase);
          drawStar(ctx!, p.x, p.y, p.r * 1.6, p.r * 0.7, 5);
          ctx!.globalAlpha = 1;
        } else if (pattern === 'dragonflies') {
          ctx!.save();
          ctx!.translate(p.x, p.y);
          ctx!.rotate(Math.sin(t + p.phase) * 0.4);
          ctx!.fillStyle = p.col + 'aa';
          ctx!.fillRect(-1, -8, 2, 16);
          ctx!.fillStyle = p.col + '55';
          ctx!.beginPath(); ctx!.ellipse(-6, -2, 6, 2, 0, 0, Math.PI * 2); ctx!.fill();
          ctx!.beginPath(); ctx!.ellipse(6, -2, 6, 2, 0, 0, Math.PI * 2); ctx!.fill();
          ctx!.restore();
        }
      }

      raf = requestAnimationFrame(frame);
    }
    if (pattern !== 'none') raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [pattern, tone]);

  return (
    <div className="swamp-scene-wrap">
      <svg className="swamp-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050e04"/>
            <stop offset="40%" stopColor="#0a1a08"/>
            <stop offset="70%" stopColor="#0f2a0c"/>
            <stop offset="100%" stopColor="#132e10"/>
          </linearGradient>
          <radialGradient id="moon-glow" cx="80%" cy="12%" r="18%">
            <stop offset="0%" stopColor="rgba(200,220,160,.25)"/>
            <stop offset="50%" stopColor="rgba(140,180,80,.08)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a2008"/>
            <stop offset="40%" stopColor="#071a06"/>
            <stop offset="100%" stopColor="#040e03"/>
          </linearGradient>
          <filter id="tree-blur">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        <rect width="1440" height="900" fill="url(#sky)"/>
        <rect width="1440" height="900" fill="url(#moon-glow)"/>

        <circle cx="1150" cy="110" r="32" fill="rgba(200,220,160,.15)"/>
        <circle cx="1150" cy="110" r="22" fill="rgba(220,240,180,.12)"/>
        <circle cx="1150" cy="110" r="14" fill="rgba(240,255,200,.2)"/>

        <g filter="url(#tree-blur)" opacity=".5">
          <path d="M0,520 C60,480 80,440 100,380 C110,420 130,460 140,380 C150,440 160,470 180,500 C200,460 210,400 230,350 C240,410 260,470 280,500 C300,440 310,390 330,340 C340,400 360,450 380,490 C400,420 420,370 440,320 C450,380 470,440 500,480 C520,420 540,360 560,310 C570,380 590,440 620,480 C640,420 660,370 680,330 C690,390 710,440 740,480 C760,410 780,360 800,310 C810,370 830,430 860,470 C880,410 900,360 920,320 C930,380 950,430 980,470 C1000,400 1020,350 1040,300 C1050,360 1070,420 1100,460 C1120,390 1140,340 1160,290 C1170,350 1190,410 1220,450 C1240,380 1260,330 1280,290 C1290,350 1310,410 1340,460 C1360,390 1380,420 1400,450 L1440,500 L1440,600 L0,600 Z" fill="#0d1f0a"/>
        </g>

        <g opacity=".7">
          <path d="M-20,620 L40,620 L35,440 C35,440 60,380 38,300 C30,270 20,310 18,280 C10,240 25,200 20,180 C15,200 5,250 8,300 C-5,260 0,200 -5,170 C-10,210 -15,280 -10,320 C-25,280 -20,220 -30,190 C-30,240 -25,310 -20,360 L-20,620 Z" fill="#091508"/>
          <path d="M-5,280 Q-15,320 -10,360" stroke="#0a1a06" strokeWidth="2" fill="none" opacity=".5"/>
          <path d="M25,290 Q35,330 30,370" stroke="#0a1a06" strokeWidth="2" fill="none" opacity=".5"/>
          <path d="M10,260 Q0,310 5,350" stroke="#0a1a06" strokeWidth="1.5" fill="none" opacity=".4"/>
          <path d="M1300,620 L1380,620 L1370,400 C1370,400 1400,340 1375,260 C1365,230 1350,270 1348,240 C1340,200 1360,160 1355,140 C1350,170 1335,220 1340,270 C1325,230 1330,170 1320,140 C1318,180 1315,250 1320,290 C1305,250 1310,190 1298,160 C1298,210 1305,280 1310,320 L1300,620 Z" fill="#091508"/>
          <path d="M1440,620 L1460,620 L1450,380 C1450,380 1470,320 1448,250 C1440,220 1430,260 1428,230 C1422,190 1438,150 1432,130 C1428,160 1418,210 1420,260 L1440,620 Z" fill="#091508"/>
          <path d="M350,620 L370,620 L368,480 C375,440 385,400 372,360 C365,380 358,420 360,460 L350,620 Z" fill="#0b1808"/>
          <path d="M900,620 L920,620 L918,470 C925,430 935,380 920,340 C912,360 908,400 910,450 L900,620 Z" fill="#0b1808"/>
        </g>

        <path d="M0,600 Q200,590 400,600 Q600,610 800,600 Q1000,590 1200,600 Q1350,608 1440,600 L1440,900 L0,900 Z" fill="url(#water)"/>

        <g className="swamp-water-shimmer">
          <rect x="0" y="620" width="1440" height="4" rx="2" fill="rgba(100,160,70,.08)"/>
          <rect x="100" y="660" width="800" height="3" rx="1.5" fill="rgba(100,160,70,.06)"/>
          <rect x="300" y="700" width="600" height="2" rx="1" fill="rgba(100,160,70,.05)"/>
          <rect x="50" y="740" width="900" height="3" rx="1.5" fill="rgba(100,160,70,.04)"/>
          <rect x="200" y="780" width="700" height="2" rx="1" fill="rgba(100,160,70,.03)"/>
        </g>

        <g opacity=".6">
          <ellipse cx="200" cy="650" rx="28" ry="10" fill="#1a3a12" transform="rotate(-8 200 650)"/>
          <path d="M200,650 L200,640" stroke="#0a2008" strokeWidth="3" fill="none"/>
          <ellipse cx="600" cy="670" rx="22" ry="8" fill="#1a3a12" transform="rotate(5 600 670)"/>
          <ellipse cx="1050" cy="640" rx="25" ry="9" fill="#1a3a12" transform="rotate(-3 1050 640)"/>
          <ellipse cx="850" cy="690" rx="18" ry="7" fill="#1a3a12" transform="rotate(10 850 690)"/>
        </g>

        <g opacity=".65">
          <line x1="80" y1="620" x2="75" y2="520" stroke="#0f2208" strokeWidth="2.5"/>
          <ellipse cx="74" cy="525" rx="4" ry="14" fill="#1a2e10" transform="rotate(-3 74 525)"/>
          <line x1="100" y1="620" x2="98" y2="540" stroke="#0f2208" strokeWidth="2"/>
          <ellipse cx="97" cy="545" rx="3.5" ry="12" fill="#1a2e10"/>
          <line x1="65" y1="620" x2="60" y2="550" stroke="#0f2208" strokeWidth="2"/>
          <ellipse cx="59" cy="555" rx="3" ry="10" fill="#1a2e10" transform="rotate(4 59 555)"/>
          <line x1="1350" y1="620" x2="1345" y2="510" stroke="#0f2208" strokeWidth="2.5"/>
          <ellipse cx="1344" cy="515" rx="4" ry="14" fill="#1a2e10" transform="rotate(2 1344 515)"/>
          <line x1="1370" y1="620" x2="1372" y2="530" stroke="#0f2208" strokeWidth="2"/>
          <ellipse cx="1373" cy="535" rx="3.5" ry="12" fill="#1a2e10" transform="rotate(-3 1373 535)"/>
          <line x1="450" y1="615" x2="448" y2="545" stroke="#0f2208" strokeWidth="2"/>
          <ellipse cx="447" cy="550" rx="3.5" ry="11" fill="#1a2e10"/>
          <line x1="1100" y1="615" x2="1103" y2="540" stroke="#0f2208" strokeWidth="2"/>
          <ellipse cx="1104" cy="545" rx="3.5" ry="11" fill="#1a2e10" transform="rotate(-2 1104 545)"/>
        </g>

        <g opacity=".8">
          <line x1="30" y1="900" x2="25" y2="680" stroke="#071208" strokeWidth="3.5"/>
          <line x1="55" y1="900" x2="60" y2="720" stroke="#071208" strokeWidth="3"/>
          <line x1="1410" y1="900" x2="1415" y2="690" stroke="#071208" strokeWidth="3.5"/>
          <line x1="1385" y1="900" x2="1380" y2="730" stroke="#071208" strokeWidth="3"/>
        </g>
      </svg>

      <div className="swamp-fog swamp-fog--1"></div>
      <div className="swamp-fog swamp-fog--2"></div>
      <div className="swamp-fog swamp-fog--3"></div>

      <canvas
        ref={ref}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
          mixBlendMode: pattern === 'fireflies' ? 'screen' : 'normal',
          opacity: pattern === 'none' ? 0 : 1
        }}
      />
    </div>
  );
}
