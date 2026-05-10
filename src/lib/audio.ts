let audio: HTMLAudioElement | null = null;

export function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.5;
  }
  return audio;
}

export function startMusic() {
  const a = getAudio();
  a.volume = 0;
  a.play().then(() => {
    let v = 0;
    const fade = setInterval(() => {
      v = Math.min(v + 0.02, 0.5);
      a.volume = v;
      if (v >= 0.5) clearInterval(fade);
    }, 30);
  }).catch(() => {});
}
