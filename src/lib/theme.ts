export type Tone = 'swamp' | 'sunset' | 'mud' | 'pink';

export const toneVars: Record<Tone, Record<string, string>> = {
  swamp: {
    '--bg-parchment': '#fde7eb',
    '--bg-parchment-2': '#f6c8d2',
    '--ink': '#1a2410',
    '--ink-soft': '#34481f',
    '--ink-faded': '#5d7a3a',
    '--moss': '#5b8a3a', '--moss-deep': '#1f3812',
    '--gold': '#b8862f', '--rule': '#6b8a3a'
  },
  sunset: {
    '--bg-parchment': '#fbe7cf',
    '--bg-parchment-2': '#f4cfa3',
    '--moss': '#c25f3a', '--moss-deep': '#7a2718',
    '--gold': '#d99a3e', '--rule': '#d4a06e'
  },
  mud: {
    '--bg-parchment': '#ecdcb5',
    '--bg-parchment-2': '#d8be88',
    '--moss': '#7a4f1c', '--moss-deep': '#3a2410',
    '--gold': '#a87a3e', '--rule': '#a88858'
  },
  pink: {
    '--bg-parchment': '#fde7eb',
    '--bg-parchment-2': '#f6c8d2',
    '--moss': '#b04a78', '--moss-deep': '#6b2547',
    '--gold': '#c98ba6', '--rule': '#c8949f'
  }
};

export function applyToneVars(tone: Tone) {
  const v = toneVars[tone] || toneVars.swamp;
  for (const k in v) document.documentElement.style.setProperty(k, v[k]);
}

export function applyFontVars(set: string) {
  const sets: Record<string, Record<string, string>> = {
    storybook: {
      '--font-display': "'IM Fell English SC', 'Cormorant Garamond', 'EB Garamond', serif",
      '--font-body': "'EB Garamond', Georgia, serif",
      '--font-display-italic': "'IM Fell English', 'Cormorant Garamond', serif"
    },
    fairytale: {
      '--font-display': "'Cormorant Garamond', 'EB Garamond', serif",
      '--font-body': "'Cormorant Garamond', Georgia, serif",
      '--font-display-italic': "'Cormorant Garamond', serif"
    },
    medieval: {
      '--font-display': "'UnifrakturCook', 'IM Fell English SC', serif",
      '--font-body': "'IM Fell English', 'EB Garamond', serif",
      '--font-display-italic': "'IM Fell English', serif"
    }
  };
  const v = sets[set] || sets.storybook;
  for (const k in v) document.documentElement.style.setProperty(k, v[k]);
}
