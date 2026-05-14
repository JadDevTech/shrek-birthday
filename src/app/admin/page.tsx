'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CHARACTERS } from '@/data/characters';
import { CHAR_AVATARS, CHAR_STYLES } from '@/data/character-avatars';
import { RSVPStore, type RSVPEntry } from '@/lib/rsvp-store';
import { applyToneVars, applyFontVars } from '@/lib/theme';
import SwampBg from '@/components/SwampBg';

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    return RSVPStore.subscribe(setRsvps);
  }, []);

  useEffect(() => {
    applyToneVars('swamp');
    applyFontVars('storybook');
  }, []);

  async function tryUnlock(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: pass }),
      });
      const data = await res.json();
      if (data.ok) {
        setUnlocked(true);
        setErr('');
      } else {
        setErr(data.error);
      }
    } catch {
      setErr('Errore di connessione.');
    }
  }

  function lock() { setUnlocked(false); setPass(''); }

  function exportCSV() {
    const rows = [['Personaggio', 'Ospite', 'Contributo', 'Dettaglio', 'Quando']];
    rsvps.forEach(r => rows.push([
      r.character_nome || r.character_id,
      r.guest_name,
      r.contribution_kind,
      r.contribution_detail || '',
      new Date(r.when).toLocaleString('it-IT')
    ]));
    const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvp-mariantonietta.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function removeOne(id: string) {
    if (confirm('Rimuovere questa RSVP?')) await RSVPStore.remove(id);
  }

  if (!unlocked) {
    return (
      <>
        <SwampBg pattern="fireflies" tone="swamp" />
        <main className="container">
          <div className="admin-gate">
            <motion.div
              className="leaf"
              style={{ maxWidth: 460, margin: '80px auto', textAlign: 'center' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="corner-flourish tl">&#10086;</div>
              <div className="corner-flourish tr">&#10086;</div>
              <div className="corner-flourish bl">&#10086;</div>
              <div className="corner-flourish br">&#10086;</div>

              <div className="wax bob" style={{ margin: '0 auto' }}>?</div>
              <h2 className="display" style={{ marginTop: 18 }}>Pergamena Segreta</h2>
              <p className="muted">Solo per l&apos;organizzatrice. Sussurra il codice.</p>

              <form onSubmit={tryUnlock} style={{ marginTop: 22, display: 'grid', gap: 12 }}>
                <input
                  type="password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  placeholder="codice"
                  autoFocus
                />
                {err && <div className="rsvp-err">{err}</div>}
                <button type="submit" className="btn btn--primary">Apri la pergamena</button>
              </form>
              <p className="mono faded" style={{ fontSize: 11, marginTop: 18 }}>
                <a href="/">← torna all&apos;invito</a>
              </p>
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  const filtered = rsvps.filter(r =>
    !filter || r.guest_name.toLowerCase().includes(filter.toLowerCase()) ||
    (r.character_nome || '').toLowerCase().includes(filter.toLowerCase())
  );

  const taken = new Set(rsvps.map(r => r.character_id));
  const notTaken = CHARACTERS.filter(c => !taken.has(c.id));

  return (
    <>
      <SwampBg pattern="fireflies" tone="swamp" />
      <main className="container" style={{ paddingBottom: 80 }}>
        <header className="headline-block" style={{ paddingTop: 40 }}>
          <div className="eyebrow">&mdash; Pergamena Segreta dell&apos;Organizzatrice &mdash;</div>
          <h1 className="display">Chi viene al banchetto</h1>
          <div className="rule"><span className="glyph">&#10086;</span><span className="glyph">&#10086;</span><span className="glyph">&#10086;</span></div>
        </header>

        <section className="leaf">
          <div className="corner-flourish tl">&#10086;</div>
          <div className="corner-flourish tr">&#10086;</div>
          <div className="corner-flourish bl">&#10086;</div>
          <div className="corner-flourish br">&#10086;</div>

          <div className="admin-stats">
            <div className="stat-cell">
              <div className="stat-num">{rsvps.length}</div>
              <div className="stat-lbl">ospiti confermati</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">{CHARACTERS.filter(c => c.id !== 'altro').length - rsvps.length}</div>
              <div className="stat-lbl">pergamene libere</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">{rsvps.filter(r => r.contribution_kind === 'cibo').length}</div>
              <div className="stat-lbl">portano cibo</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">{rsvps.filter(r => r.contribution_kind === 'bevande').length}</div>
              <div className="stat-lbl">portano bevande</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">{rsvps.filter(r => r.contribution_kind === 'sorpresa').length}</div>
              <div className="stat-lbl">portano sorprese</div>
            </div>
          </div>
        </section>

        <section className="sect-head"><h2>Lista ospiti</h2></section>

        <div className="admin-toolbar">
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="cerca nome o personaggio..."
            style={{ flex: 1, minWidth: 200 }}
          />
          <button className="btn" onClick={exportCSV} disabled={rsvps.length === 0}>Esporta CSV</button>
          <button className="btn btn--ghost" onClick={lock}>Chiudi pergamena</button>
        </div>

        {filtered.length === 0 ? (
          <div className="leaf center" style={{ marginTop: 16 }}>
            <p className="italic muted">
              {rsvps.length === 0
                ? "Ancora nessuna RSVP. Condividi il link dell'invito."
                : 'Nessun risultato per questa ricerca.'}
            </p>
          </div>
        ) : (
          <div className="rsvp-list">
            {filtered.map((r, i) => {
              const avatarSrc = CHAR_AVATARS[r.character_id] || (r.character_id.startsWith('altro_') ? CHAR_AVATARS['altro'] : '');
              const cStyle = CHAR_STYLES[r.character_id];
              return (
                <motion.div
                  key={r.character_id + i}
                  className="rsvp-row leaf"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="rsvp-row-portrait">
                    {avatarSrc && (
                      <Image
                        src={avatarSrc}
                        alt={r.character_nome || r.character_id}
                        width={64}
                        height={64}
                        style={{ objectFit: cStyle?.objectFit || 'cover', objectPosition: cStyle?.objectPosition || 'center 20%', width: 64, height: 64 }}
                        unoptimized={avatarSrc.startsWith('data:')}
                      />
                    )}
                  </div>
                  <div className="rsvp-row-text">
                    <div className="rsvp-row-name">{r.guest_name}</div>
                    <div className="rsvp-row-char italic">come <strong>{r.character_nome || r.character_id}</strong></div>
                    <div className="mono faded" style={{ fontSize: 11, marginTop: 4 }}>
                      {r.contribution_kind === 'niente'
                        ? '— solo se stesso/a'
                        : `↦ ${r.contribution_kind}${r.contribution_detail ? ': ' + r.contribution_detail : ''}`}
                      {' \u00B7 '}
                      {new Date(r.when).toLocaleString('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <button className="rsvp-row-x" onClick={() => removeOne(r.character_id)} title="Rimuovi">&#10005;</button>
                </motion.div>
              );
            })}
          </div>
        )}

        <section className="sect-head"><h2>Pergamene ancora libere</h2></section>
        <div className="char-grid">
          {notTaken.map((c, i) => {
            const avatarSrc = CHAR_AVATARS[c.id] || '';
            const cStyle = CHAR_STYLES[c.id];
            return (
              <motion.div
                key={c.id}
                className="char-card"
                style={{ cursor: 'default' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="char-portrait-wrap">
                  {avatarSrc && (
                    <Image
                      src={avatarSrc}
                      alt={c.nome}
                      width={200}
                      height={200}
                      style={{ objectFit: cStyle?.objectFit || 'cover', objectPosition: cStyle?.objectPosition || 'center 20%', width: '100%', height: '100%' }}
                      unoptimized={avatarSrc.startsWith('data:')}
                    />
                  )}
                </div>
                <div className="char-meta">
                  <div className="char-name">{c.nome}</div>
                  <div className="char-role italic">{c.ruolo}</div>
                </div>
              </motion.div>
            );
          })}
          {notTaken.length === 0 && <p className="italic muted center" style={{ gridColumn: '1/-1' }}>Tutti i personaggi sono stati scelti!</p>}
        </div>

        <footer className="foot">
          <p>Le RSVP sono salvate localmente in questo browser.<br/>
          Per condividere con altri dispositivi, esporta il CSV o aggiungi un backend.</p>
          <p style={{ fontSize: 13, marginTop: 14 }}>
            <a href="/">← torna all&apos;invito</a>
          </p>
        </footer>
      </main>
    </>
  );
}
