'use client';

import { useEffect } from 'react';

interface CursorTrailProps {
  tone?: string;
  enabled?: boolean;
}

const trailPalettes: Record<string, string[]> = {
  swamp:  ['#5b8a3a', '#2f4818', '#a3c243', '#7a4f1c'],
  sunset: ['#e3735a', '#ffa46b', '#ffd49a'],
  mud:    ['#7a4f1c', '#a87a3e', '#d4b076'],
  pink:   ['#d96b9a', '#ff9bbf', '#ffd0e0']
};

export default function CursorTrail({ tone = 'swamp', enabled = true }: CursorTrailProps) {
  useEffect(() => {
    if (!enabled) return;
    const cols = trailPalettes[tone] || trailPalettes.swamp;
    const layer = document.createElement('div');
    Object.assign(layer.style, {
      position: 'fixed', inset: '0', pointerEvents: 'none', zIndex: '9999', overflow: 'hidden'
    });
    document.body.appendChild(layer);

    let last = 0;
    function spawn(x: number, y: number) {
      const now = performance.now();
      if (now - last < 28) return;
      last = now;
      const dot = document.createElement('div');
      const size = 6 + Math.random() * 10;
      const col = cols[Math.floor(Math.random() * cols.length)];
      Object.assign(dot.style, {
        position: 'absolute',
        left: (x - size / 2) + 'px',
        top: (y - size / 2) + 'px',
        width: size + 'px', height: size + 'px',
        borderRadius: Math.random() > 0.4 ? '50%' : '40% 60% 55% 45% / 60% 40% 60% 40%',
        background: `radial-gradient(circle at 35% 30%, ${col}cc, ${col}33 70%, transparent 75%)`,
        transform: `translate(0,0) rotate(${Math.random() * 360}deg) scale(1)`,
        transition: 'transform 1.1s ease-out, opacity 1.1s ease-out',
        opacity: '.9',
        filter: 'blur(.3px)'
      });
      layer.appendChild(dot);
      requestAnimationFrame(() => {
        const dx = (Math.random() - .5) * 30;
        const dy = 18 + Math.random() * 18;
        dot.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg) scale(.4)`;
        dot.style.opacity = '0';
      });
      setTimeout(() => dot.remove(), 1200);
    }
    function onMove(e: MouseEvent) { spawn(e.clientX, e.clientY); }
    function onTouch(e: TouchEvent) { const t = e.touches[0]; if (t) spawn(t.clientX, t.clientY); }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      layer.remove();
    };
  }, [tone, enabled]);
  return null;
}
