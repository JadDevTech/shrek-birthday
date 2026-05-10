'use client';

import { useState, useEffect } from 'react';
import { getAudio } from '@/lib/audio';

export default function MusicToggle() {
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const check = setInterval(() => {
      const a = getAudio();
      setPlaying(!a.paused);
      setMuted(a.muted);
    }, 300);
    return () => clearInterval(check);
  }, []);

  function toggle() {
    const a = getAudio();
    a.muted = !a.muted;
    setMuted(a.muted);
  }

  if (!playing) return null;

  return (
    <button
      className="music-btn"
      onClick={toggle}
      aria-label={muted ? 'Attiva audio' : 'Muta audio'}
      title={muted ? 'Attiva audio' : 'Muta audio'}
    >
      {muted ? '\uD83D\uDD07' : '\uD83D\uDD0A'}
    </button>
  );
}
