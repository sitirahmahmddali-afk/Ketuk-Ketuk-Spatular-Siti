// Audio Engine for "Ketuk-Ketuk Spatular Mama Siti"
// Uses pure Web Audio API for 100% reliable, zero-latency cooking sound effects and authentic traditional melodies.

class KitchenAudioEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private currentTrackIndex = 0;
  private musicVolume = 0.45;
  private sfxVolume = 0.75;
  private sequenceTimer: number | null = null;
  private currentNoteIndex = 0;
  private listeners: ((playing: boolean, track: MusicTrack, noteProgress: number) => void)[] = [];

  public tracks: MusicTrack[] = [
    {
      id: 'joget-spatula',
      title: 'Joget Ketuk Spatula',
      rhythm: 'Rentak Joget 6/8',
      tempoBpm: 124,
      pantun: 'Ketuk kuali bunyi bersahut, Minyak panas tumis sekata; Bau semerbak hidangan terpaut, Air tangan ibu penyeri kita.',
      notes: [
        { f: 523.25, d: 0.25 }, // C5
        { f: 587.33, d: 0.25 }, // D5
        { f: 659.25, d: 0.25 }, // E5
        { f: 783.99, d: 0.5 },  // G5
        { f: 659.25, d: 0.25 }, // E5
        { f: 587.33, d: 0.25 }, // D5
        { f: 523.25, d: 0.5 },  // C5
        { f: 440.00, d: 0.25 }, // A4
        { f: 523.25, d: 0.25 }, // C5
        { f: 587.33, d: 0.5 },  // D5
        { f: 659.25, d: 0.25 }, // E5
        { f: 523.25, d: 0.5 },  // C5
      ],
    },
    {
      id: 'dondang-sayang',
      title: 'Dondang Sayang di Dapur',
      rhythm: 'Rentak Asli & Sayu Manis',
      tempoBpm: 84,
      pantun: 'Lengkuas halia serai seikat, Daging diperap rempah bermutu; Kasih dicurah santan dipekat, Enak dimakan seisi ratu.',
      notes: [
        { f: 440.00, d: 0.6 },  // A4
        { f: 493.88, d: 0.4 },  // B4
        { f: 523.25, d: 0.6 },  // C5
        { f: 659.25, d: 0.8 },  // E5
        { f: 587.33, d: 0.4 },  // D5
        { f: 523.25, d: 0.6 },  // C5
        { f: 493.88, d: 0.6 },  // B4
        { f: 440.00, d: 0.8 },  // A4
        { f: 392.00, d: 0.4 },  // G4
        { f: 440.00, d: 0.8 },  // A4
      ],
    },
    {
      id: 'inang-santan',
      title: 'Inang Santan & Serai',
      rhythm: 'Rentak Inang Lemah Gemalai',
      tempoBpm: 98,
      pantun: 'Daun kunyit nira kelapa, Asam keping pembuka selera; Rendang digaul janganlah lupa, Irama berdendang gembira mesra.',
      notes: [
        { f: 392.00, d: 0.4 },  // G4
        { f: 440.00, d: 0.4 },  // A4
        { f: 523.25, d: 0.4 },  // C5
        { f: 587.33, d: 0.4 },  // D5
        { f: 659.25, d: 0.6 },  // E5
        { f: 587.33, d: 0.4 },  // D5
        { f: 523.25, d: 0.4 },  // C5
        { f: 440.00, d: 0.6 },  // A4
        { f: 392.00, d: 0.8 },  // G4
      ],
    },
    {
      id: 'kenduri-raya',
      title: 'Rentak Kenduri Beraya',
      rhythm: 'Rentak Zapin Masakan',
      tempoBpm: 112,
      pantun: 'Ayam berkokok fajar menjelma, Beras ditanak di atas bara; Ketuk-ketuk spatula kita bersama, Hidangan lazat sekeluarga gembira.',
      notes: [
        { f: 587.33, d: 0.3 },  // D5
        { f: 659.25, d: 0.3 },  // E5
        { f: 698.46, d: 0.3 },  // F5
        { f: 783.99, d: 0.5 },  // G5
        { f: 698.46, d: 0.3 },  // F5
        { f: 659.25, d: 0.3 },  // E5
        { f: 587.33, d: 0.5 },  // D5
        { f: 523.25, d: 0.3 },  // C5
        { f: 587.33, d: 0.6 },  // D5
      ],
    },
  ];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play Spatula Knock ("Ketuk Spatula pada Kuali" - Tang! Klang!)
  public playSpatulaClack(pitchModifier = 1.0) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Primary metallic clang (oscillator simulating steel spatula striking cast iron wok)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(840 * pitchModifier, now);
      osc1.frequency.exponentialRampToValueAtTime(320, now + 0.18);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(1260 * pitchModifier, now);
      osc2.frequency.exponentialRampToValueAtTime(410, now + 0.12);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, now);
      filter.Q.setValueAtTime(6, now);

      gainNode.gain.setValueAtTime(0.7 * this.sfxVolume, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.23);
      osc2.stop(now + 0.23);

      // Subtle sizzle puff following the strike
      this.playQuickSizzle(0.08, 0.25 * this.sfxVolume);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // Hot oil sizzle sound ("Tsshhh!")
  public playQuickSizzle(duration = 0.25, volume = 0.3) {
    try {
      const ctx = this.getContext();
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(3200, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume * this.sfxVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio restricted
    }
  }

  // Mortar & Pestle ("Lesung Batu" Thud)
  public playMortarThud() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.16);

      gain.gain.setValueAtTime(0.8 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // Audio restricted
    }
  }

  // Cooking Timer Chime (Sweet brass bell)
  public playTimerChime() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      [1046.5, 1318.51, 1567.98].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.4 * this.sfxVolume, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 1.0);
      });
    } catch {
      // Audio restricted
    }
  }

  // Play single note in traditional Gambang / Angklung / Gamelan warm acoustic style
  private playTraditionalNote(freq: number, duration: number) {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);

    // Warm marimba/gamelan envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.32 * this.musicVolume, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.2);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + duration * 1.3);
    oscHarmonic.stop(now + duration * 1.3);

    // Occasional gentle woodblock / kendang tap to keep the beat
    if (Math.random() > 0.4) {
      const beatOsc = ctx.createOscillator();
      const beatGain = ctx.createGain();
      beatOsc.type = 'sine';
      beatOsc.frequency.setValueAtTime(190, now);
      beatOsc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

      beatGain.gain.setValueAtTime(0.12 * this.musicVolume, now);
      beatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      beatOsc.connect(beatGain);
      beatGain.connect(ctx.destination);

      beatOsc.start(now);
      beatOsc.stop(now + 0.1);
    }
  }

  // Start music loop
  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.pauseMusic();
      return false;
    } else {
      this.playMusic();
      return true;
    }
  }

  public playMusic() {
    this.getContext();
    this.isMusicPlaying = true;
    this.currentNoteIndex = 0;
    this.scheduleNextNote();
    this.notify();
  }

  public pauseMusic() {
    this.isMusicPlaying = false;
    if (this.sequenceTimer) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
    this.notify();
  }

  public nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.currentNoteIndex = 0;
    if (this.isMusicPlaying) {
      if (this.sequenceTimer) clearTimeout(this.sequenceTimer);
      this.scheduleNextNote();
    }
    this.notify();
  }

  public prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.currentNoteIndex = 0;
    if (this.isMusicPlaying) {
      if (this.sequenceTimer) clearTimeout(this.sequenceTimer);
      this.scheduleNextNote();
    }
    this.notify();
  }

  public setTrack(index: number) {
    if (index >= 0 && index < this.tracks.length) {
      this.currentTrackIndex = index;
      this.currentNoteIndex = 0;
      if (this.isMusicPlaying) {
        if (this.sequenceTimer) clearTimeout(this.sequenceTimer);
        this.scheduleNextNote();
      }
      this.notify();
    }
  }

  public setMusicVolume(val: number) {
    this.musicVolume = Math.max(0, Math.min(1, val));
  }

  public setSfxVolume(val: number) {
    this.sfxVolume = Math.max(0, Math.min(1, val));
  }

  public getCurrentTrack(): MusicTrack {
    return this.tracks[this.currentTrackIndex];
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }

  private scheduleNextNote() {
    if (!this.isMusicPlaying) return;

    const track = this.tracks[this.currentTrackIndex];
    const note = track.notes[this.currentNoteIndex];

    this.playTraditionalNote(note.f, note.d);

    const stepMs = note.d * 1000;
    this.notify();

    this.sequenceTimer = window.setTimeout(() => {
      this.currentNoteIndex = (this.currentNoteIndex + 1) % track.notes.length;
      this.scheduleNextNote();
    }, stepMs);
  }

  public subscribe(cb: (playing: boolean, track: MusicTrack, noteIndex: number) => void) {
    this.listeners.push(cb);
    cb(this.isMusicPlaying, this.getCurrentTrack(), this.currentNoteIndex);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify() {
    const track = this.getCurrentTrack();
    this.listeners.forEach(cb => cb(this.isMusicPlaying, track, this.currentNoteIndex));
  }
}

export interface NoteDef {
  f: number; // Frequency in Hz
  d: number; // Duration in seconds
}

export interface MusicTrack {
  id: string;
  title: string;
  rhythm: string;
  tempoBpm: number;
  pantun: string;
  notes: NoteDef[];
}

export const kitchenAudio = new KitchenAudioEngine();
