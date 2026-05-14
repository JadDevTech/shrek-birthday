const img = '/images/characters/';

function svgDataUri(svg: string): string {
  return 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">' + svg + '</svg>'
  );
}

export const CHAR_AVATARS: Record<string, string> = {
  orco:      img + 'shrek.png',
  fiona:     img + 'fiona.png',
  ciuchino:  img + 'ciuchino.png',
  gatto:     img + 'gatto.png',
  farquaad:  img + 'farquaad.png',
  drago:     img + 'drago.png',
  gingy:     img + 'gingy.png',
  pinocchio: img + 'pinocchio.jpg',
  lupo:      img + 'lupo.png',
  topo1:     img + 'topo1.png',
  topo2:     img + 'topo1.png',
  topo3:     img + 'topo1.png',
  porcello1: img + 'porcelli.png',
  porcello2: img + 'porcelli.png',
  porcello3: img + 'porcelli.png',
  fata:      img + 'fata.png',
  azzurro:   img + 'azzurro.png',
  harold:    img + 'harold.jpg',
  lillian:   img + 'lillian.jpg',
  rumpel:    img + 'rumpel.png',
  uncino:    img + 'uncino.png',
  mongo:     img + 'mongo.png',
  artie:     img + 'artie.jpg',
  merlino:   img + 'merlin.png',
  doris:     img + 'doris.jpg',
  cenerentola: img + 'cenerentola.jpg',
  biancaneve:  img + 'biancaneve.jpg',
  bella:       img + 'bella.png',
  raperonzolo: img + 'rapunzel_shrek.png',
  humpty:    img + 'humpty.jpeg',
  kitty:     img + 'kitty.jpeg',
  specchio:  img + 'specchio.jpeg',
  robin:     img + 'robin.jpeg',
  altro: svgDataUri(
    '<circle cx="60" cy="60" r="48" fill="#5c6b3c"/>' +
    '<circle cx="60" cy="60" r="42" fill="#6b7a45"/>' +
    '<text x="60" y="72" text-anchor="middle" font-size="42" font-weight="bold" fill="#f5f0e1">?</text>'
  ),
  cappuccetto: svgDataUri(
    '<circle cx="60" cy="60" r="60" fill="#a02020"/>' +
    '<path d="M24 60 Q26 14 60 10 Q94 14 96 60 Q92 70 86 80 L34 80 Q28 70 24 60Z" fill="#d03030"/>' +
    '<ellipse cx="60" cy="66" rx="26" ry="26" fill="#f0d0b0"/>' +
    '<circle cx="46" cy="58" r="3.5" fill="#3a5a2a"/>' +
    '<circle cx="74" cy="58" r="3.5" fill="#3a5a2a"/>' +
    '<path d="M52 72 Q60 78 68 72" fill="none" stroke="#a07060" stroke-width="1.5" stroke-linecap="round"/>' +
    '<circle cx="44" cy="68" r="5" fill="#e08080" opacity=".35"/>' +
    '<circle cx="76" cy="68" r="5" fill="#e08080" opacity=".35"/>'
  )
};

/** Override objectFit to 'contain' so full-body images fit inside the circle */
export const CHAR_STYLES: Record<string, { objectFit: 'contain'; objectPosition: string }> = {
  humpty:   { objectFit: 'contain', objectPosition: 'center center' },
  kitty:    { objectFit: 'contain', objectPosition: 'center center' },
  specchio: { objectFit: 'contain', objectPosition: 'center center' },
  robin:    { objectFit: 'contain', objectPosition: 'center center' },
};
