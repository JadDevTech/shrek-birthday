'use client';

import { useState, useEffect, useCallback } from 'react';
import SwampBg from '@/components/SwampBg';
import CursorTrail from '@/components/CursorTrail';
import MusicToggle from '@/components/MusicToggle';
import CalzoneIntro from '@/components/CalzoneIntro';
import Countdown from '@/components/Countdown';
import CharacterGrid from '@/components/CharacterGrid';
import RSVPModal from '@/components/RSVPModal';
import MapBlock from '@/components/MapBlock';
import { RSVPStore, type RSVPEntry } from '@/lib/rsvp-store';
import { applyToneVars, applyFontVars } from '@/lib/theme';
import { CHARACTERS, type Character } from '@/data/characters';

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [picked, setPicked] = useState<Character | null>(null);
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return RSVPStore.subscribe(setRsvps);
  }, []);

  useEffect(() => {
    applyToneVars('swamp');
    applyFontVars('storybook');
  }, []);

  const onIntroOpen = useCallback(() => {
    setTimeout(() => setIntroDone(true), 2800);
  }, []);

  return (
    <>
      <SwampBg pattern="fireflies" tone="swamp" />
      <CursorTrail tone="swamp" enabled={true} />
      <MusicToggle />

      {mounted && !introDone && <CalzoneIntro onOpen={onIntroOpen} />}

      <main className="container">
        <header className="headline-block">
          <div className="eyebrow">&mdash; Pergamena d&apos;Invito &mdash;</div>
          <div className="by">vi convoca</div>
          <div className="name">Mariantonietta Calzone</div>
          <h1 className="display" style={{ marginTop: 18 }}>
            <span className="italic">al suo</span> Compleanno
          </h1>
          <div className="rule">
            <span className="glyph">&#10086;</span>
            <span className="glyph">&#10086;</span>
            <span className="glyph">&#10086;</span>
          </div>
          <p className="muted" style={{ maxWidth: 620, margin: '0 auto', fontSize: '20px' }}>
            <span className="italic">Tema:</span> SHREK.
            <br/>&laquo;Meglio fuori che dentro, dico sempre io.&raquo;
            <br/>Scegli il tuo personaggio dal film e presentati al banchetto.
          </p>
        </header>

        <section className="leaf wobble" style={{ animationDuration: '7s' }}>
          <div className="corner-flourish tl">&#10086;</div>
          <div className="corner-flourish tr">&#10086;</div>
          <div className="corner-flourish bl">&#10086;</div>
          <div className="corner-flourish br">&#10086;</div>

          <div className="invitation-card">
            <div>
              <div className="rule"><span className="glyph">&#10086;</span></div>
              <p style={{ marginTop: 0 }}>
                <span className="shrek-s" style={{ color: 'var(--shrek-green)', fontFamily: 'var(--font-blackletter)', textShadow: '2px 2px 0 var(--moss-deep), 0 0 8px rgba(107,168,58,.4)' }}>S</span>i fa sapere a tutti gli abitanti di Molto Molto Lontano, a Shrek, Fiona e Ciuchino, al Gatto con gli Stivali e a Lord Farquaad, ai Tre Porcellini e ai Tre Topi Ciechi, alla Fata Madrina e a Tremotino, che la padrona della palude apre il portone della sua casetta-di-Shrek per festeggiare un altro giro intorno al sole.
              </p>
              <dl className="party-detail">
                <dt>Quando</dt>
                <dd><em>Venerdì</em> 29 Maggio MMXXVI</dd>
                <dt>A che ora</dt>
                <dd>Dalle <em>ore venti</em> in poi</dd>
                <dt>Cosa si fa</dt>
                <dd><em>Si mangia lì.</em> E si ride forte.</dd>
                <dt>Codice di abbigliamento</dt>
                <dd>Vestiti come un personaggio di <em>Shrek</em> ↓</dd>
              </dl>
              <p className="mono" style={{ marginTop: 18, fontSize: 15, textAlign: 'center', color: 'var(--crimson)', fontWeight: 600 }}>
                ⚠ IL TRAVESTIMENTO È OBBLIGATORIO. ⚠<br/>
                <span style={{ fontWeight: 400, fontSize: 13, color: 'var(--ink-soft)' }}>
                  Non si entra nella palude senza costume. Impegnatevi. Sul serio.
                </span>
              </p>
            </div>
            <div className="center" style={{ display: 'grid', gap: 18, justifyItems: 'center' }}>
              <div className="script" style={{ fontSize: 38, color: 'var(--moss-deep)' }}>conto alla rovescia</div>
              <Countdown target="2026-05-29T20:00:00" />
              <div className="wax">RSVP</div>
              <div className="mono faded" style={{ fontSize: 11, letterSpacing: '.25em' }}>
                conferma scegliendo un personaggio
              </div>
            </div>
          </div>
        </section>

        <section className="sect-head">
          <div className="kicker">&mdash; Atto Secondo &mdash;</div>
          <h2>Scegli il tuo personaggio di Shrek</h2>
          <div className="sub">trenta personaggi del film &middot; primo che arriva, primo che si traveste</div>
        </section>

        <CharacterGrid onPick={setPicked} />

        <div className="tally-strip">
          <div><strong>{rsvps.length}</strong>su {CHARACTERS.filter(c => c.id !== 'altro').length} pergamene reclamate</div>
          <div><strong>{rsvps.filter(r => r.contribution_kind === 'cibo').length}</strong>portano cibo</div>
          <div><strong>{rsvps.filter(r => r.contribution_kind === 'bevande').length}</strong>portano bevande</div>
          <div><strong>{rsvps.filter(r => r.contribution_kind === 'sorpresa').length}</strong>portano sorprese</div>
        </div>

        <section className="sect-head">
          <div className="kicker">&mdash; Atto Terzo &mdash;</div>
          <h2>Come arrivare a Molto Molto Lontano</h2>
          <div className="sub">segui il sentiero della palude di Shrek</div>
        </section>

        <MapBlock
          address="Via Perugia 4, Pisa — lì dove cresce il prezzemolo selvatico"
        />

        <footer className="foot">
          <p>che il banchetto sia abbondante e le risate più forti dei fuochi.</p>
          <p style={{ fontSize: 13, marginTop: 14 }}>
            Sei l&apos;organizzatrice? <a href="/admin">apri la pergamena segreta</a>
          </p>
        </footer>
      </main>

      {picked && <RSVPModal character={picked} onClose={() => setPicked(null)} onConfirm={() => setPicked(null)} />}
    </>
  );
}
