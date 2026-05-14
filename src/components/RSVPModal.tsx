'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Character } from '@/data/characters';
import { CHAR_AVATARS, CHAR_STYLES } from '@/data/character-avatars';
import { RSVPStore } from '@/lib/rsvp-store';

interface RSVPModalProps {
  character: Character;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RSVPModal({ character, onClose, onConfirm }: RSVPModalProps) {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [customChar, setCustomChar] = useState('');
  const [tipo, setTipo] = useState<'niente' | 'cibo' | 'bevande' | 'sorpresa'>('niente');
  const [dettaglio, setDettaglio] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const isAltro = character.id === 'altro';
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => inputRef.current?.focus(), 250);
    return () => { document.body.style.overflow = ''; };
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const trimmedNome = nome.trim();
    const trimmedCognome = cognome.trim();
    if (trimmedNome.length < 2) { setError('Scrivi il tuo nome, gentile creatura.'); return; }
    if (trimmedCognome.length < 2) { setError('Anche il cognome, per favore!'); return; }
    if (isAltro && customChar.trim().length < 2) { setError('Scrivi il personaggio che vuoi interpretare!'); return; }
    const fullName = trimmedNome + ' ' + trimmedCognome;
    const charId = isAltro ? 'altro_' + Date.now() : character.id;
    const charNome = isAltro ? customChar.trim() : character.nome;
    const ok = await RSVPStore.add({
      character_id: charId,
      character_nome: charNome,
      guest_name: fullName,
      contribution_kind: tipo,
      contribution_detail: dettaglio.trim()
    });
    if (!ok) { setError('Ahimè, qualcuno ha già reclamato questo personaggio.'); return; }
    setConfirmed(true);
    setTimeout(() => onConfirm(), 2400);
  }

  const avatarSrc = CHAR_AVATARS[character.id] || '';
  const customStyle = CHAR_STYLES[character.id];

  return (
    <AnimatePresence>
      <motion.div
        className="rsvp-overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="rsvp-card leaf"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35 }}
        >
          <div className="corner-flourish tl">&#10086;</div>
          <div className="corner-flourish tr">&#10086;</div>
          <div className="corner-flourish bl">&#10086;</div>
          <div className="corner-flourish br">&#10086;</div>

          <button className="rsvp-close" onClick={onClose} aria-label="Chiudi">&#10005;</button>

          {!confirmed ? (
            <form onSubmit={submit} className="rsvp-form">
              <div className="rsvp-head">
                <div className="rsvp-portrait">
                  <div className="rsvp-portrait-ring">
                    {avatarSrc && (
                      <Image
                        src={avatarSrc}
                        alt={character.nome}
                        width={120}
                        height={120}
                        style={{
                          objectFit: customStyle?.objectFit || 'cover',
                          objectPosition: customStyle?.objectPosition || 'center 20%',
                          width: '100%',
                          height: '100%',
                        }}
                        unoptimized={avatarSrc.startsWith('data:')}
                      />
                    )}
                  </div>
                </div>
                <div className="rsvp-head-text">
                  <div className="script" style={{ fontSize: '40px', color: 'var(--moss-deep)' }}>
                    Sarò...
                  </div>
                  <h2 className="display">{character.nome}</h2>
                  <div className="italic faded">{character.ruolo}</div>
                </div>
              </div>

              <div className="rule"><span className="glyph">&#10086;</span></div>

              {isAltro && (
                <label className="rsvp-label">
                  <span className="mono">Che personaggio vuoi essere?</span>
                  <input
                    type="text"
                    value={customChar}
                    onChange={e => setCustomChar(e.target.value)}
                    placeholder="es. Principe Ranocchio, Hansel, Gretel..."
                    maxLength={60}
                  />
                </label>
              )}

              <div className="rsvp-name-row">
                <label className="rsvp-label">
                  <span className="mono">Nome</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder="Il tuo nome"
                    maxLength={40}
                  />
                </label>
                <label className="rsvp-label">
                  <span className="mono">Cognome</span>
                  <input
                    type="text"
                    value={cognome}
                    onChange={e => setCognome(e.target.value)}
                    placeholder="Il tuo cognome"
                    maxLength={40}
                  />
                </label>
              </div>

              <div className="rsvp-label">
                <span className="mono">Porto qualcosa?</span>
                <div className="seg">
                  {([
                    { k: 'niente' as const, l: 'Solo me stesso' },
                    { k: 'cibo' as const, l: 'Cibo' },
                    { k: 'bevande' as const, l: 'Bevande' },
                    { k: 'sorpresa' as const, l: 'Una sorpresa' }
                  ]).map(o => (
                    <button
                      type="button"
                      key={o.k}
                      className={"seg-btn " + (tipo === o.k ? 'on' : '')}
                      onClick={() => setTipo(o.k)}
                    >{o.l}</button>
                  ))}
                </div>
              </div>

              {tipo !== 'niente' && (
                <label className="rsvp-label">
                  <span className="mono">Cosa porterai? <span className="faded">(facoltativo)</span></span>
                  <input
                    type="text"
                    value={dettaglio}
                    onChange={e => setDettaglio(e.target.value)}
                    placeholder={
                      tipo === 'cibo' ? 'es. lasagne della nonna' :
                      tipo === 'bevande' ? 'es. due bottiglie di rosso' :
                      'tienilo segreto se preferisci'
                    }
                    maxLength={120}
                  />
                </label>
              )}

              {error && <div className="rsvp-err">{error}</div>}

              <div className="rsvp-actions">
                <button type="button" className="btn btn--ghost" onClick={onClose}>Annulla</button>
                <button type="submit" className="btn btn--primary">Sigilla la pergamena</button>
              </div>
            </form>
          ) : (
            <motion.div
              className="rsvp-confirmed center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <div className="wax bob">RSVP</div>
              <h2 className="display" style={{ marginTop: 18 }}>Pergamena sigillata!</h2>
              <p className="muted" style={{ marginTop: 8 }}>
                <strong>{nome} {cognome}</strong>, sarai <strong>{isAltro ? customChar : character.nome}</strong>.
              </p>
              <p className="script" style={{ fontSize: '38px', color: 'var(--moss-deep)' }}>
                ci vediamo nella palude
              </p>
              <div className="rule"><span className="glyph">&#10086;</span></div>
              <p className="mono faded" style={{ fontSize: '12px' }}>
                Venerdì 29 Maggio &middot; ore 20:00
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
