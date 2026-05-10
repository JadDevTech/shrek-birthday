'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { startMusic } from '@/lib/audio';

interface CalzoneIntroProps {
  onOpen: () => void;
}

export default function CalzoneIntro({ onOpen }: CalzoneIntroProps) {
  const [phase, setPhase] = useState<'closed' | 'cracking' | 'open'>('closed');

  useEffect(() => {
    if (phase === 'cracking') {
      const t = setTimeout(() => { setPhase('open'); onOpen(); }, 2800);
      return () => clearTimeout(t);
    }
  }, [phase, onOpen]);

  if (phase === 'open') return null;

  const opening = phase === 'cracking';

  return (
    <AnimatePresence>
      <motion.div
        className={"calzone-overlay " + (opening ? 'opening' : '')}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.9 }}
      >
        <div className="calzone-stage">
          <div className="calzone-prompt">
            <div className="script" style={{ fontSize: '54px' }}>tocca il calzone</div>
            <div className="mono faded" style={{ fontSize: '13px', letterSpacing: '.2em', marginTop: 4 }}>
              ↓ c&apos;è SHREK qui dentro ↓
            </div>
          </div>

          <div className="steam-layer" aria-hidden="true">
            {[0,1,2,3,4].map(i => (
              <div key={i} className={"steam s" + i}></div>
            ))}
          </div>

          <button className="calzone-btn" onClick={() => { startMusic(); setPhase('cracking'); }} aria-label="Apri il calzone">
            <svg viewBox="-130 -90 260 180" className="calzone-svg">
              <defs>
                <radialGradient id="cz-body" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#f5d488"/>
                  <stop offset="60%" stopColor="#d99a3e"/>
                  <stop offset="100%" stopColor="#7a4f1c"/>
                </radialGradient>
                <radialGradient id="cz-shine" cx="40%" cy="30%" r="40%">
                  <stop offset="0%" stopColor="#fff5d6" stopOpacity=".7"/>
                  <stop offset="100%" stopColor="#fff5d6" stopOpacity="0"/>
                </radialGradient>
                <linearGradient id="cz-inside" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5b8a3a"/>
                  <stop offset="100%" stopColor="#2f4818"/>
                </linearGradient>
              </defs>

              <ellipse cx="0" cy="78" rx="110" ry="9" fill="#000" opacity=".22"/>

              <g className="cz-inside-layer">
                <path d="M -100 0 Q 0 -80 100 0 Q 0 70 -100 0 Z" fill="url(#cz-inside)"/>
                <circle cx="-30" cy="-10" r="6" fill="#a3c243" opacity=".7"/>
                <circle cx="20" cy="-20" r="4" fill="#cdd86f" opacity=".7"/>
                <circle cx="40" cy="10" r="5" fill="#a3c243" opacity=".7"/>
              </g>

              <g className="cz-top">
                <path d="M -100 0 Q 0 -90 100 0 Q 60 -10 0 -12 Q -60 -10 -100 0 Z"
                      fill="url(#cz-body)" stroke="#5a3818" strokeWidth="1.5"/>
                <path d="M -100 0 Q -90 -6 -82 0 Q -74 -6 -66 0 Q -58 -6 -50 0 Q -42 -6 -34 0 Q -26 -6 -18 0 Q -10 -6 -2 0 Q 6 -6 14 0 Q 22 -6 30 0 Q 38 -6 46 0 Q 54 -6 62 0 Q 70 -6 78 0 Q 86 -6 94 0 Q 100 -3 100 0"
                      fill="none" stroke="#5a3818" strokeWidth="1.5"/>
                <path d="M -50 -30 Q -40 -36 -32 -28" fill="none" stroke="#7a4f1c" strokeWidth="1.4" opacity=".7"/>
                <path d="M 20 -42 Q 30 -50 40 -40" fill="none" stroke="#7a4f1c" strokeWidth="1.4" opacity=".7"/>
                <path d="M -10 -55 Q 0 -62 10 -56" fill="none" stroke="#7a4f1c" strokeWidth="1.4" opacity=".7"/>
                <ellipse cx="-20" cy="-50" rx="40" ry="10" fill="url(#cz-shine)"/>
              </g>

              <g className="cz-bot">
                <path d="M -100 0 Q -60 8 0 8 Q 60 8 100 0 Q 60 60 0 64 Q -60 60 -100 0 Z"
                      fill="url(#cz-body)" stroke="#5a3818" strokeWidth="1.5"/>
                <path d="M -78 26 Q -72 30 -64 26" fill="none" stroke="#7a4f1c" strokeWidth="1.4" opacity=".7"/>
                <path d="M 18 38 Q 28 42 38 36" fill="none" stroke="#7a4f1c" strokeWidth="1.4" opacity=".7"/>
                <path d="M -14 50 Q -4 54 6 48" fill="none" stroke="#7a4f1c" strokeWidth="1.4" opacity=".7"/>
              </g>

              <g className="cz-splat" aria-hidden="true">
                <path d="M 0 0 Q -20 -40 -50 -50 Q -30 -30 -42 -8 Q -70 -2 -60 18 Q -36 16 -30 36 Q -12 22 0 42 Q 12 22 30 36 Q 36 16 60 18 Q 70 -2 42 -8 Q 30 -30 50 -50 Q 20 -40 0 0 Z"
                      fill="#5b8a3a" opacity=".0"/>
                <circle cx="-72" cy="-22" r="6" fill="#5b8a3a" opacity="0"/>
                <circle cx="80" cy="6" r="5" fill="#5b8a3a" opacity="0"/>
                <circle cx="0" cy="-72" r="7" fill="#5b8a3a" opacity="0"/>
              </g>
            </svg>
          </button>

          {/* Shrek GIF — bursts out when calzone cracks */}
          {opening && (
            <motion.div
              className="shrek-burst"
              initial={{ scale: 0, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: -20 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring', bounce: 0.5 }}
            >
              <Image
                src="/images/shrek-intro.gif"
                alt="Shrek esce dal calzone!"
                width={800}
                height={712}
                unoptimized
                priority
                style={{ width: '70vw', maxWidth: '70vh', height: 'auto', borderRadius: 16, boxShadow: '0 12px 60px rgba(0,0,0,.6)' }}
              />
            </motion.div>
          )}

          <div className="calzone-caption mono faded">
            Shrek sta per uscire da un calzone
          </div>

          {!opening && (
            <motion.div
              className="mono"
              style={{ marginTop: 24, textAlign: 'center', color: 'var(--gold)', fontSize: 14, letterSpacing: '.1em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              &#x1F50A; Alza il volume del dispositivo per l&apos;esperienza completa!
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
