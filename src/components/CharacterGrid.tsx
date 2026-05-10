'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CHARACTERS, type Character } from '@/data/characters';
import { CHAR_AVATARS } from '@/data/character-avatars';
import { RSVPStore } from '@/lib/rsvp-store';

interface CharacterGridProps {
  onPick: (character: Character) => void;
}

export default function CharacterGrid({ onPick }: CharacterGridProps) {
  const [taken, setTaken] = useState<Record<string, string>>({});

  useEffect(() => {
    return RSVPStore.subscribe((list) => {
      const m: Record<string, string> = {};
      list.forEach(e => m[e.character_id] = e.guest_name);
      setTaken(m);
    });
  }, []);

  return (
    <div className="char-grid">
      {CHARACTERS.map((c, i) => {
        const claimedBy = taken[c.id];
        const locked = !!claimedBy;
        const avatarSrc = CHAR_AVATARS[c.id] || '';
        return (
          <motion.div
            key={c.id}
            className={"char-card" + (locked ? ' locked' : '')}
            onClick={() => !locked && onPick(c)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.5 }}
            whileHover={!locked ? { y: -3, rotate: -0.4 } : undefined}
          >
            <div className="char-portrait-wrap">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={c.nome}
                  width={200}
                  height={200}
                  className="char-portrait-img"
                  style={{ objectFit: 'cover', objectPosition: 'center 20%', width: '100%', height: '100%' }}
                  unoptimized={avatarSrc.startsWith('data:')}
                />
              ) : (
                <div className="char-portrait-placeholder">{c.nome[0]}</div>
              )}
              {locked && <div className="lock-stamp">PRESO</div>}
            </div>
            <div className="char-meta">
              <div className="char-name">{c.nome}</div>
              <div className="char-role italic">{c.ruolo}</div>
              {locked
                ? <div className="char-claimed mono">&#9733; {claimedBy}</div>
                : <div className="char-cta mono">&#8627; scegli</div>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
