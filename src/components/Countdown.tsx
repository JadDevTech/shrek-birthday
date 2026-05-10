'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  target?: string;
}

export default function Countdown({ target = '2026-05-29T20:00:00' }: CountdownProps) {
  const [now, setNow] = useState(0);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = new Date(target).getTime();
  const diff = Math.max(0, t - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const Cell = ({ label, val }: { label: string; val: number }) => (
    <div className="cd-cell">
      <div className="cd-num">{String(val).padStart(2, '0')}</div>
      <div className="cd-lbl">{label}</div>
    </div>
  );

  return (
    <div className="cd-wrap">
      <Cell label="Giorni" val={d} />
      <div className="cd-sep">:</div>
      <Cell label="Ore" val={h} />
      <div className="cd-sep">:</div>
      <Cell label="Min" val={m} />
      <div className="cd-sep">:</div>
      <Cell label="Sec" val={s} />
    </div>
  );
}
