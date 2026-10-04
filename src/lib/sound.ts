// Web Audio API synthesized luxury automotive dual-tone horn
let audioCtx: AudioContext | null = null;

export function playCarHorn() {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx || audioCtx.state === "suspended") {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Dual frequencies typical of luxury European GT cars (High + Low horns: ~435 Hz & 360 Hz)
    const tones = [
      { freq: 435, gain: 0.18 },
      { freq: 365, gain: 0.22 },
      { freq: 870, gain: 0.05 }, // 2nd harmonic
      { freq: 730, gain: 0.06 }, // 2nd harmonic
    ];

    const masterGain = audioCtx.createGain();
    masterGain.connect(audioCtx.destination);

    // Double-pulse luxury beep envelope: Beep 1 (0.12s), Pause (0.05s), Beep 2 (0.16s)
    masterGain.gain.setValueAtTime(0, now);
    // Pulse 1
    masterGain.gain.linearRampToValueAtTime(1, now + 0.02);
    masterGain.gain.setValueAtTime(1, now + 0.12);
    masterGain.gain.linearRampToValueAtTime(0.01, now + 0.15);
    // Pulse 2
    masterGain.gain.setValueAtTime(0.01, now + 0.20);
    masterGain.gain.linearRampToValueAtTime(1, now + 0.22);
    masterGain.gain.setValueAtTime(1, now + 0.38);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    tones.forEach(({ freq, gain }) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const toneGain = audioCtx.createGain();

      // Sawtooth mixed with sine for authentic automotive acoustic resonance
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);

      // Lowpass filter to smooth harshness and give rich acoustic chamber resonance
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1600, now);

      toneGain.gain.setValueAtTime(gain, now);

      osc.connect(filter);
      filter.connect(toneGain);
      toneGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.48);
    });
  } catch (e) {
    console.warn("Audio context not available", e);
  }
}
