'use client';

import { useRef, useState, useEffect } from 'react';

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  function start() {
    if (!audioRef.current) {
      const a = new Audio('/music.mp3');
      a.loop = true;
      a.volume = 0;
      audioRef.current = a;
    }
    const a = audioRef.current;
    a.play().then(() => {
      let v = 0;
      const fade = setInterval(() => {
        v = Math.min(v + 0.02, 0.5);
        a.volume = v;
        if (v >= 0.5) clearInterval(fade);
      }, 30);
    }).catch(() => {});
  }

  function stop() {
    const a = audioRef.current;
    if (!a) return;
    let v = a.volume;
    const fade = setInterval(() => {
      v = Math.max(v - 0.02, 0);
      a.volume = v;
      if (v <= 0) { clearInterval(fade); a.pause(); }
    }, 30);
  }

  function toggle() {
    if (on) { stop(); setOn(false); }
    else    { start(); setOn(true); }
  }

  return (
    <button
      className="music-btn"
      onClick={toggle}
      aria-label={on ? 'Spegni musica' : 'Accendi musica'}
      title={on ? 'Silenzio nella palude' : 'Musica della palude'}
    >
      {on ? '\u266A ' : '\u266B '}{on ? 'Silenzio' : 'Musica'}
    </button>
  );
}
