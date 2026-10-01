/**
 * ==========================================================================
 * ANNUAL GALA LUCKY DRAW — TRI-MODE: FOIL PACK, GALA REEL & TICKER FORTUNE WHEEL
 * Vue 3 Application, Web Audio Synthesizer & Real Physics Engines
 * ==========================================================================
 */

// ================= PROCEDURAL AUDIO ENGINE (Web Audio API) =================
class ProceduralAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.hasUserInteracted = false;
  }

  initOnFirstGesture() {
    if (this.hasUserInteracted && this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        this.hasUserInteracted = true;
      }
    } catch (e) {
      console.warn('AudioContext initialization note:', e);
    }
  }

  setMute(muted) {
    this.isMuted = muted;
  }

  // Foil pack swipe sound
  playSliceScratchSound(intensity = 0.5) {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const duration = 0.08;

    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.4 ? 0.8 : 0.2);
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2000 + intensity * 2500, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(Math.min(0.25, 0.08 + intensity * 0.2), now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noiseNode.start(now);
    noiseNode.stop(now + duration);
  }

  // Foil pack cut complete sound
  playSliceCompleteSound() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.exponentialRampToValueAtTime(3200, now + 0.15);

    oscGain.gain.setValueAtTime(0.2, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);

    const ripDuration = 0.28;
    const bufferSize = ctx.sampleRate * ripDuration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.3 ? 0.9 : 0.15);
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.frequency.exponentialRampToValueAtTime(4200, now + ripDuration);
    filter.Q.value = 2.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + ripDuration);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noiseNode.start(now);
    noiseNode.stop(now + ripDuration);
  }

  // Card slide sound
  playSlideSound() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const duration = 0.55;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Card flip bell
  playFlipSound() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const duration = 0.8;

    [2400, 3600].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.001, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.2 / (idx + 1), now + 0.02 + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + duration);
    });
  }

  // ================= REEL MECHANICAL SOUNDS =================
  // Individual mechanical detent notch click
  playReelClick(speed = 1.0) {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const baseFreq = 500 + Math.min(500, speed * 25);
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.35, now + 0.028);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.028);
  }

  // Creaking friction sound as inertia crawls over the barrier ridge
  playFrictionGroan() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(220, now + 0.2);
    osc.frequency.linearRampToValueAtTime(140, now + 0.4);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Soft, light mechanical plectrum flutter on brass peg
  playNeedleTick(speed = 1.0) {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // High, delicate plectrum flick (crisp, light, low-drag)
    osc.type = 'triangle';
    const baseFreq = 1450 + Math.min(500, speed * 0.3);
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.014);

    gain.gain.setValueAtTime(0.12, now); // softened volume
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.014); // ultra-short crisp flutter

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.014);
  }

  // Heavy mechanical peg snap when peg crests the bent needle tip
  playPegSnap() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // 1. Sharp plectrum snap release
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'sawtooth';
    snapOsc.frequency.setValueAtTime(1400, now);
    snapOsc.frequency.exponentialRampToValueAtTime(260, now + 0.035);

    snapGain.gain.setValueAtTime(0.35, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);
    snapOsc.start(now);
    snapOsc.stop(now + 0.035);

    // 2. Resonant brass chassis ping
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(1850, now + 0.005);
    bellGain.gain.setValueAtTime(0.22, now + 0.005);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    bellOsc.connect(bellGain);
    bellGain.connect(ctx.destination);
    bellOsc.start(now + 0.005);
    bellOsc.stop(now + 0.3);
  }

  // Solid mechanical latch "CLACK-CHING!" when resting into winner slot
  playLatchSnap() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Heavy mechanical thump
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(820, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);

    // High brass harmonic ring
    const bell = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bell.type = 'sine';
    bell.frequency.setValueAtTime(2600, now + 0.015);
    bellGain.gain.setValueAtTime(0.25, now + 0.015);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    bell.connect(bellGain);
    bellGain.connect(ctx.destination);
    bell.start(now + 0.015);
    bell.stop(now + 0.6);
  }

  // Triumphant fanfare
  playFanfare() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const notes = [
      { f: 261.63, start: 0.00, dur: 0.9 },
      { f: 329.63, start: 0.12, dur: 0.9 },
      { f: 392.00, start: 0.24, dur: 1.1 },
      { f: 523.25, start: 0.36, dur: 1.6 },
      { f: 783.99, start: 0.48, dur: 1.8 }
    ];

    notes.forEach(note => {
      const noteTime = now + note.start;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(note.f, noteTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.12, noteTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + note.dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + note.dur);
    });
  }

  // ================= CELESTIAL FIREWORK PYROTECHNIC SOUNDS =================
  playFuseIgnite(duration = 0.4) {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    
    // Sizzling potassium nitrate fuse cord
    const bufSize = Math.floor(ctx.sampleRate * duration);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const out = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      out[i] = (Math.random() * 2 - 1) * (Math.random() > 0.3 ? 0.75 : 0.2);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3600, now);
    filter.frequency.linearRampToValueAtTime(4800, now + duration);
    filter.Q.setValueAtTime(3.5, now);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);

    // Micro-pops of sputtering black powder
    for (let i = 0; i < 5; i++) {
      const popTime = now + (i * duration / 5) + Math.random() * 0.03;
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = 'triangle';
      popOsc.frequency.setValueAtTime(1200 + Math.random() * 800, popTime);
      popGain.gain.setValueAtTime(0.08, popTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.025);
      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.start(popTime);
      popOsc.stop(popTime + 0.025);
    }
  }

  // 1. Mortar Tube Lift Charge (底火发射出膛重低音轰鸣与黑火药爆响)
  playMortarLift() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // A. Sub-bass tube thump (140Hz -> 30Hz) — physical air pressure shock
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
    subGain.gain.setValueAtTime(1.0, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.5);

    // B. Hollow mortar tube chamber resonance (210Hz Q=5 ring)
    const resOsc = ctx.createOscillator();
    const resGain = ctx.createGain();
    resOsc.type = 'triangle';
    resOsc.frequency.setValueAtTime(210, now);
    resOsc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
    resGain.gain.setValueAtTime(0.55, now);
    resGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    resOsc.connect(resGain);
    resGain.connect(ctx.destination);
    resOsc.start(now);
    resOsc.stop(now + 0.35);

    // C. Violent black powder muzzle blast noise crack
    const bufSize = Math.floor(ctx.sampleRate * 0.32);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const out = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) out[i] = (Math.random() * 2 - 1) * 0.9;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 0.32);
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.9, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(now);
  }

  // 2. Realistic Pyrotechnic Rocket Ascent (Rushing Jet Wind + Aerodynamic Screamer Whistle)
  playRocketAscent(duration = 1.3) {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // A. Burning propellant rush & turbulent jet wind
    const bufSize = Math.floor(ctx.sampleRate * duration);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const out = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) out[i] = (Math.random() * 2 - 1) * 0.45;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const nFilter = ctx.createBiquadFilter();
    nFilter.type = 'bandpass';
    nFilter.frequency.setValueAtTime(500, now);
    nFilter.frequency.exponentialRampToValueAtTime(2200, now + duration * 0.95);
    nFilter.Q.setValueAtTime(3.8, now);
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.18, now);
    nGain.gain.linearRampToValueAtTime(0.38, now + duration * 0.4);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    noise.connect(nFilter);
    nFilter.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(now);

    // B. Pyrotechnic screamer whistle with acoustic flutter (potassium benzoate whistle)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(1580, now + duration * 0.94);

    // Aerodynamic air turbulence pitch vibrato
    const vibrato = ctx.createOscillator();
    const vibGain = ctx.createGain();
    vibrato.frequency.value = 16; // 16Hz flutter
    vibGain.gain.value = 28; // 28Hz pitch wobble
    vibrato.connect(osc.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration);

    oscGain.gain.setValueAtTime(0.02, now);
    oscGain.gain.linearRampToValueAtTime(0.25, now + 0.15);
    oscGain.gain.setValueAtTime(0.28, now + duration * 0.85);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  playMortarBlast() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // 1. Heavy sub-bass shockwave thump (35Hz ~ 130Hz)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(130, now);
    subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.7);
    subGain.gain.setValueAtTime(0.85, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.7);

    // 2. Punch noise crack
    const bufSize = Math.floor(ctx.sampleRate * 0.45);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const out = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) out[i] = (Math.random() * 2 - 1);
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const nFilter = ctx.createBiquadFilter();
    nFilter.type = 'lowpass';
    nFilter.frequency.setValueAtTime(550, now);
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.65, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    noise.connect(nFilter);
    nFilter.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(now);

    // 3. Crackling sparkle embers
    for (let i = 0; i < 7; i++) {
      const crackTime = now + 0.12 + i * 0.07 + Math.random() * 0.04;
      const crkOsc = ctx.createOscillator();
      const crkGain = ctx.createGain();
      crkOsc.type = 'triangle';
      crkOsc.frequency.setValueAtTime(950 + Math.random() * 650, crackTime);
      crkGain.gain.setValueAtTime(0.12, crackTime);
      crkGain.gain.exponentialRampToValueAtTime(0.001, crackTime + 0.045);
      crkOsc.connect(crkGain);
      crkGain.connect(ctx.destination);
      crkOsc.start(crackTime);
      crkOsc.stop(crackTime + 0.045);
    }
  }

  playSwarmMorph() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Atmospheric rushing whoosh as particles swarm to center
    const bufSize = Math.floor(ctx.sampleRate * 0.7);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const out = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) out[i] = (Math.random() * 2 - 1) * 0.35;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.exponentialRampToValueAtTime(1600, now + 0.65);
    filter.Q.setValueAtTime(3.2, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.24, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);

    // Ethereal rising harmonics (magnetic convergence)
    const freqs = [329.63, 440.00, 554.37, 659.25, 880.00];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.07);
      osc.frequency.linearRampToValueAtTime(f * 1.45, now + 0.7);
      oscGain.gain.setValueAtTime(0.001, now + i * 0.07);
      oscGain.gain.linearRampToValueAtTime(0.09, now + 0.3);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now + i * 0.07);
      osc.stop(now + 0.75);
    });
  }

  playStarlightChime() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    freqs.forEach((f, idx) => {
      const t = now + idx * 0.075;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 1.2);
    });
  }
}

// ================= CONFETTI & SPARKS ENGINE =================
class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  emitSparks(x, y) {
    if (!this.canvas || !this.ctx) return;
    const count = 5;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        type: 'spark',
        x: x + (Math.random() * 8 - 4),
        y: y + (Math.random() * 8 - 4),
        vx: (Math.random() * 8 - 4),
        vy: (Math.random() * -6 - 2),
        size: Math.random() * 3.5 + 1.5,
        color: Math.random() > 0.3 ? '#fef08a' : '#38bdf8',
        opacity: 1,
        decay: Math.random() * 0.04 + 0.03,
        gravity: 0.25
      });
    }

    if (!this.animId) {
      this.render();
    }
  }

  burstConfetti() {
    if (!this.canvas || !this.ctx) return;
    this.resize();
    const count = 150;
    const colors = [
      '#f7d070', '#d4af37', '#ffd97d', '#ffffff', 
      '#38bdf8', '#f43f5e', '#a855f7'
    ];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        type: 'confetti',
        x: this.canvas.width / 2 + (Math.random() * 240 - 120),
        y: this.canvas.height * 0.42,
        vx: (Math.random() * 18 - 9),
        vy: (Math.random() * -15 - 5),
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() * 12 - 6),
        gravity: 0.35,
        opacity: 1,
        decay: Math.random() * 0.005 + 0.007
      });
    }

    if (!this.animId) {
      this.render();
    }
  }

  render() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.opacity);

      if (p.type === 'spark') {
        this.ctx.fillStyle = p.color;
        this.ctx.shadowColor = p.color;
        this.ctx.shadowBlur = 8;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.render());
    } else {
      this.animId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ================= CELESTIAL FIREWORK PHYSICS ENGINE (MODE 4) =================
// Authentic Multi-Colored Pyrotechnic Blast with High-Contrast Diamond-Gold Typography
class CelestialFireworkEngine {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.canvas = null;
    this.ctx = null;
    this.stars = [];
    this.particles = [];
    this.smokeClouds = [];
    this.shockwaves = [];
    this.rocket = null;
    this.apexSpark = null;
    this.animId = null;
    this.cameraSpeed = 0;
    this.screenShake = 0;
    this.launchMuzzleX = 0;
    this.launchMuzzleY = 0;
    this.explosionState = null;
    this.flashAlpha = 0;
    this.groundFlashAlpha = 0;
    this.textInfo = null;
    this.textAlpha = 0;
    this.lastBackgroundBurst = 0;

    this.ensureCanvas();
    window.addEventListener('resize', () => {
      this.resize();
      this.initStars();
    });
  }

  ensureCanvas() {
    if (!this.canvas || !this.ctx || !document.contains(this.canvas)) {
      this.canvas = document.getElementById(this.canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      if (this.canvas) {
        this.resize();
        if (this.stars.length === 0) {
          this.initStars();
        }
      }
    }
    return !!(this.canvas && this.ctx);
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initStars() {
    this.stars = [];
    const count = 160;
    const w = window.innerWidth || 1920;
    const h = window.innerHeight || 1080;
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        speedFactor: Math.random() * 0.8 + 0.4
      });
    }
  }

  // 1. Mortar Tube Launch & Rocket Ejection
  launchRocket(startX, startY, targetX, targetY, durationMs, onApex, onExplode) {
    if (!this.ensureCanvas()) return;
    this.launchMuzzleX = startX;
    this.launchMuzzleY = startY;

    this.rocket = {
      baseX: startX,
      x: startX,
      y: startY,
      startX,
      startY,
      targetX,
      targetY,
      startTime: performance.now(),
      duration: durationMs,
      history: [],
      onApex,
      onExplode,
      apexTriggered: false
    };
    this.cameraSpeed = 0;
    this.textAlpha = 0;
    this.textInfo = null;

    // A. Visceral Camera Shudder (炮口后坐力屏幕震颤)
    this.screenShake = 8.0;

    // B. Intense Mortar Muzzle Lift Flash (底火爆炸白金火光)
    this.groundFlashAlpha = 1.0;

    // C. High-velocity fountain of lift propellant sparks (出膛冲天炽热火星)
    const liftSparks = 85;
    for (let i = 0; i < liftSparks; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.42;
      const speed = Math.random() * 22 + 10;
      this.particles.push({
        x: startX + (Math.random() - 0.5) * 14,
        y: startY + (Math.random() - 0.5) * 4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.35 ? '#ffffff' : (Math.random() > 0.5 ? '#fef08a' : '#ff9800'),
        size: Math.random() * 2.5 + 1.2,
        alpha: 1.0,
        decay: 1.0 / (Math.random() * 24 + 18),
        drag: 0.91,
        gravity: 0.28,
        isText: false,
        trail: [],
        maxTrail: 3
      });
    }

    // D. Billowing Toroidal Smoke Ring Puff from Muzzle
    for (let i = 0; i < 22; i++) {
      const sAngle = Math.random() * Math.PI * 2;
      const sDist = Math.random() * 12;
      this.smokeClouds.push({
        x: startX + Math.cos(sAngle) * sDist,
        y: startY + Math.sin(sAngle) * (sDist * 0.35) - 4,
        vx: Math.cos(sAngle) * (Math.random() * 2.8 + 0.8),
        vy: -Math.random() * 4.5 - 1.5,
        radius: Math.random() * 14 + 10,
        growth: Math.random() * 0.45 + 0.35,
        alpha: 0.55,
        decay: 0.012,
        color: Math.random() > 0.5 ? 'rgba(230, 215, 195,' : 'rgba(180, 168, 155,'
      });
    }

    if (!this.animId) this.loop();
  }

  // Sample target points for name from off-screen canvas with high stroke density
  sampleTextPoints(text, targetCenterY) {
    const w = window.innerWidth || 1920;
    const h = window.innerHeight || 1080;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = w;
    offCanvas.height = h;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return { points: [], fontSize: 72, textY: targetCenterY };

    // Dynamically calculate font size based on text length and screen width
    const maxTextWidth = Math.min(w * 0.82, 1100);
    let fontSize = 72;
    if (text.length > 20) fontSize = 44;
    else if (text.length > 15) fontSize = 52;
    else if (text.length > 11) fontSize = 62;

    // Use a clean, robust, ultra-bold font with elegant letter spacing
    offCtx.font = `800 ${fontSize}px "Plus Jakarta Sans", "Inter", -apple-system, sans-serif`;
    offCtx.letterSpacing = '3.5px';
    let measuredWidth = offCtx.measureText(text.toUpperCase()).width;
    if (measuredWidth > maxTextWidth) {
      fontSize = Math.floor(fontSize * (maxTextWidth / measuredWidth));
      offCtx.font = `800 ${fontSize}px "Plus Jakarta Sans", "Inter", -apple-system, sans-serif`;
    }

    offCtx.fillStyle = '#ffffff';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(text.toUpperCase(), w / 2, targetCenterY);

    const imgData = offCtx.getImageData(0, 0, w, h);
    const pixels = imgData.data;
    const points = [];

    // High-efficiency starlight sampling: 3.6px yields ~650 crisp diamond-starlight coordinates at 60 FPS
    const step = 3.6;
    const startY = Math.max(0, Math.floor(targetCenterY - fontSize * 0.85));
    const endY = Math.min(h, Math.floor(targetCenterY + fontSize * 0.85));
    const startX = Math.max(0, Math.floor((w - maxTextWidth) / 2));
    const endX = Math.min(w, Math.floor((w + maxTextWidth) / 2));

    for (let py = startY; py < endY; py += step) {
      const iy = Math.floor(py);
      for (let px = startX; px < endX; px += step) {
        const ix = Math.floor(px);
        const idx = (iy * w + ix) * 4;
        if (pixels[idx + 3] > 115) {
          points.push({
            tx: ix,
            ty: iy,
            tz: (Math.random() - 0.5) * 20
          });
        }
      }
    }
    return { points, fontSize, textY: targetCenterY, text: text.toUpperCase() };
  }

  createExplosion(x, y, nameText, onMorphStart, onLocked) {
    if (!this.ensureCanvas()) return;
    this.apexSpark = null;
    this.rocket = null;

    // 1. Initial Detonation Supernova Flash, Mach Shockwave & Heavy Screen Shudder
    this.flashAlpha = 1.0;
    this.screenShake = 14.0;
    this.shockwaves.push({
      x,
      y,
      radius: 12,
      maxRadius: Math.min(window.innerWidth || 1920, window.innerHeight || 1080) * 0.5,
      speed: 24,
      alpha: 0.95
    });

    this.particles = [];
    const now = performance.now();

    // 2. Supernova Core: Blinding Diamond Starlight Sparks
    const CORE_COLORS = ['#ffffff', '#ffffff', '#fffbeb', '#fef08a', '#fde047', '#ffd700'];
    const coreCount = 140;
    for (let i = 0; i < coreCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14.0 + 3.5;
      const color = CORE_COLORS[i % CORE_COLORS.length];
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 1.5 + 1.2,
        alpha: 1.0,
        decay: 1.0 / (Math.random() * 45 + 50),
        drag: 0.955,
        gravity: 0.035,
        trail: [],
        maxTrail: 3
      });
    }

    // 3. Multi-Colored Peony Stars
    const SHELL_COLORS = [
      '#ff2a6d', '#ff5252', '#f43f5e', // Strontium Ruby
      '#00f5a0', '#10b981', '#34d399', // Barium Emerald
      '#00e5ff', '#38bdf8', '#0284c7', // Copper Electric Cyan
      '#c084fc', '#d946ef', '#a855f7', // Potassium Royal Violet
      '#fbbf24', '#f59e0b', '#fef08a'  // Sodium Imperial Amber
    ];
    const outerCount = 130;
    for (let i = 0; i < outerCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 17.0 + 6.0;
      const color = SHELL_COLORS[i % SHELL_COLORS.length];
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 2.0 + 1.5,
        alpha: 1.0,
        decay: 1.0 / (Math.random() * 60 + 65),
        drag: 0.962,
        gravity: 0.048,
        trail: [],
        maxTrail: 4
      });
    }

    // 4. Golden Brocade Kamuro Willows
    const willowCount = 60;
    for (let i = 0; i < willowCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9.5 + 3.0;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        color: Math.random() > 0.3 ? '#fef08a' : '#ffd700',
        size: Math.random() * 2.0 + 1.4,
        alpha: 1.0,
        decay: 1.0 / (Math.random() * 90 + 90),
        drag: 0.97,
        gravity: 0.075,
        trail: [],
        maxTrail: 5
      });
    }

    // 5. Dragon's Egg Crackling Micro-Salutes
    const crackleCount = 30;
    for (let i = 0; i < crackleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 13.0 + 4.0;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: '#ffffff',
        size: 1.5,
        alpha: 1.0,
        decay: 1.0 / (Math.random() * 45 + 40),
        drag: 0.955,
        gravity: 0.05,
        isCrackle: true,
        crackleTime: now + (Math.random() * 350 + 250),
        hasCrackled: false,
        trail: [],
        maxTrail: 3
      });
    }

    // Lifecycle Coordinator
    this.explosionState = {
      startTime: now,
      onMorphStart,
      onLocked,
      lockedTriggered: false
    };

    this.lastBackgroundBurst = now;
    if (!this.animId) this.loop();
  }

  // Spawn gentle celebratory mini-peonies in the distant background
  spawnBackgroundBurst() {
    const w = this.canvas ? this.canvas.width : 1920;
    const h = this.canvas ? this.canvas.height : 1080;
    const bx = Math.random() > 0.5 ? (Math.random() * (w * 0.22) + w * 0.06) : (w - Math.random() * (w * 0.22) - w * 0.06);
    const by = Math.random() * (h * 0.35) + 60;

    const MINI_COLORS = ['#ff2a6d', '#00f5a0', '#00e5ff', '#c084fc', '#fbbf24', '#ffffff'];
    const burstColor = MINI_COLORS[Math.floor(Math.random() * MINI_COLORS.length)];
    const count = 55;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.8 + 1.8;
      this.particles.push({
        x: bx,
        y: by,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: burstColor,
        size: Math.random() * 1.6 + 1.2,
        alpha: 1.0,
        decay: 1.0 / (Math.random() * 50 + 55),
        drag: 0.965,
        gravity: 0.045,
        isText: false,
        trail: [],
        maxTrail: 4
      });
    }
  }

  clear() {
    this.ensureCanvas();
    this.particles = [];
    this.smokeClouds = [];
    this.shockwaves = [];
    this.rocket = null;
    this.apexSpark = null;
    this.cameraSpeed = 0;
    this.screenShake = 0;
    this.explosionState = null;
    this.flashAlpha = 0;
    this.groundFlashAlpha = 0;
    this.textInfo = null;
    this.textAlpha = 0;
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  loop() {
    if (!this.ensureCanvas()) {
      this.animId = null;
      return;
    }
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const now = performance.now();

    ctx.clearRect(0, 0, w, h);

    // Apply Camera Screen Shudder (Recoil impulse from lift & explosion)
    ctx.save();
    if (this.screenShake > 0.05) {
      const shakeX = (Math.random() - 0.5) * this.screenShake;
      const shakeY = (Math.random() - 0.5) * this.screenShake;
      ctx.translate(shakeX, shakeY);
      this.screenShake *= 0.82;
    }

    // 1. Draw Starfield with Vertical Camera Parallax (Zero-overhead 60FPS)
    for (const star of this.stars) {
      star.y += this.cameraSpeed * star.speedFactor;
      if (star.y > h) star.y -= h;
      if (star.y < 0) star.y += h;

      const twinkle = Math.sin(now * star.twinkleSpeed + star.twinklePhase);
      const alpha = Math.max(0.12, star.baseAlpha + twinkle * 0.28);

      if (this.cameraSpeed > 2) {
        ctx.lineWidth = star.size;
        ctx.strokeStyle = `rgba(254, 240, 138, ${alpha * 0.75})`;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x, star.y + this.cameraSpeed * star.speedFactor * 3.5);
        ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Render Ground Mortar Lift Flash (Illuminates from the exact mortar muzzle rim)
    if (this.groundFlashAlpha > 0.01) {
      ctx.save();
      const gx = this.launchMuzzleX || (w / 2);
      const gy = this.launchMuzzleY || (h - 40);
      const gGrad = ctx.createRadialGradient(
        gx, gy, 6, 
        gx, gy, w * 0.55
      );
      gGrad.addColorStop(0, `rgba(255, 255, 255, ${this.groundFlashAlpha})`);
      gGrad.addColorStop(0.2, `rgba(254, 240, 138, ${this.groundFlashAlpha * 0.85})`);
      gGrad.addColorStop(0.55, `rgba(245, 158, 11, ${this.groundFlashAlpha * 0.4})`);
      gGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
      this.groundFlashAlpha *= 0.83;
    }

    // 3. Render Smoke Clouds (Linger and expand organically)
    for (let i = this.smokeClouds.length - 1; i >= 0; i--) {
      const s = this.smokeClouds[i];
      s.x += s.vx;
      s.y += s.vy;
      s.radius += s.growth;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        this.smokeClouds.splice(i, 1);
        continue;
      }

      ctx.save();
      const smokeGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
      smokeGrad.addColorStop(0, `${s.color}${s.alpha})`);
      smokeGrad.addColorStop(0.6, `${s.color}${s.alpha * 0.5})`);
      smokeGrad.addColorStop(1, `${s.color}0)`);
      ctx.fillStyle = smokeGrad;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 4. Render Shockwaves (Mach Detonation Blast Rings)
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += sw.speed;
      sw.speed *= 0.94; // rapid deceleration
      sw.alpha *= 0.88;

      if (sw.alpha <= 0.02 || sw.radius >= sw.maxRadius) {
        this.shockwaves.splice(i, 1);
        continue;
      }

      ctx.save();
      // Outer soft shockwave ring
      ctx.strokeStyle = `rgba(254, 240, 138, ${sw.alpha * 0.35})`;
      ctx.lineWidth = Math.max(2, 8 * (1 - sw.radius / sw.maxRadius));
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner crisp high-energy shockwave ring
      ctx.strokeStyle = `rgba(255, 255, 255, ${sw.alpha * 0.9})`;
      ctx.lineWidth = Math.max(1, 3 * (1 - sw.radius / sw.maxRadius));
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 5. Render Rocket & Thick Incandescent Burning Comet Tail
    if (this.rocket) {
      const elapsed = now - this.rocket.startTime;
      const progress = Math.min(1, elapsed / this.rocket.duration);

      // Physics-based ascent: starts fast from lift charge, curves upward against gravity
      const easeY = 1 - Math.pow(1 - progress, 2.8);
      // Aerodynamic organic corkscrew weave
      const weave = Math.sin(progress * 26) * 3.2 * (1 - progress * 0.6);
      this.rocket.x = this.rocket.baseX + (this.rocket.targetX - this.rocket.baseX) * progress + weave;
      this.rocket.y = this.rocket.startY + (this.rocket.targetY - this.rocket.startY) * easeY;
      this.cameraSpeed = Math.sin(progress * Math.PI) * 18;

      // Update rocket path history for continuous tapered incandescent ribbon
      if (!this.rocket.history) this.rocket.history = [];
      this.rocket.history.unshift({ x: this.rocket.x, y: this.rocket.y });
      if (this.rocket.history.length > 20) this.rocket.history.pop();

      // CONTINUOUS TAPERED INCANDESCENT COMET TAIL RIBBON:
      if (this.rocket.history.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Ribbon Layer 1: Radiant Outer Amber Glare
        for (let i = 0; i < this.rocket.history.length - 1; i++) {
          const p1 = this.rocket.history[i];
          const p2 = this.rocket.history[i + 1];
          const t = 1 - (i / this.rocket.history.length);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${t * 0.45})`;
          ctx.lineWidth = Math.max(1, t * 24);
          ctx.stroke();
        }

        // Ribbon Layer 2: Incandescent Golden Burning Flame Column
        for (let i = 0; i < this.rocket.history.length - 1; i++) {
          const p1 = this.rocket.history[i];
          const p2 = this.rocket.history[i + 1];
          const t = 1 - (i / this.rocket.history.length);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(254, 240, 138, ${t * 0.88})`;
          ctx.lineWidth = Math.max(1, t * 11);
          ctx.stroke();
        }

        // Ribbon Layer 3: Blinding White-Hot Titanium Center Jet
        for (let i = 0; i < this.rocket.history.length - 1; i++) {
          const p1 = this.rocket.history[i];
          const p2 = this.rocket.history[i + 1];
          const t = 1 - (i / this.rocket.history.length);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${t * 1.0})`;
          ctx.lineWidth = Math.max(0.8, t * 4.0);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Cascading titanium jet sparks spraying downward behind rocket (14 particles/frame)
      const jetCount = 14;
      for (let i = 0; i < jetCount; i++) {
        const jetAngle = Math.PI / 2 + (Math.random() - 0.5) * 0.38;
        const jetSpeed = Math.random() * 9 + 5;
        const color = Math.random() > 0.4 ? '#ffffff' : (Math.random() > 0.5 ? '#fff9db' : '#fef08a');
        this.particles.push({
          x: this.rocket.x + (Math.random() - 0.5) * 4,
          y: this.rocket.y + 6 + Math.random() * 6,
          vx: Math.cos(jetAngle) * jetSpeed,
          vy: Math.sin(jetAngle) * jetSpeed,
          color,
          size: Math.random() * 2.2 + 1.2,
          alpha: 1.0,
          decay: 0.045 + Math.random() * 0.03,
          drag: 0.93,
          gravity: 0.08,
          isText: false,
          trail: [],
          maxTrail: 3
        });
      }

      // Outer sparkling gold spray (8 particles/frame)
      for (let i = 0; i < 8; i++) {
        this.particles.push({
          x: this.rocket.x + (Math.random() - 0.5) * 6,
          y: this.rocket.y + 10 + Math.random() * 8,
          vx: (Math.random() - 0.5) * 5.0,
          vy: Math.random() * 5 + 3,
          color: Math.random() > 0.3 ? '#ffd700' : '#ff9800',
          size: Math.random() * 1.5 + 0.8,
          alpha: 0.9,
          decay: 0.05 + Math.random() * 0.035,
          drag: 0.94,
          gravity: 0.06,
          isText: false,
          trail: [],
          maxTrail: 2
        });
      }

      // Translucent smoke puffs drifting behind rocket (every 2-3 frames)
      if (Math.random() > 0.3) {
        this.smokeClouds.push({
          x: this.rocket.x + (Math.random() - 0.5) * 6,
          y: this.rocket.y + 16,
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * 0.6 + 0.2,
          radius: Math.random() * 7 + 5,
          growth: 0.3,
          alpha: 0.25,
          decay: 0.007,
          color: 'rgba(220, 210, 195,'
        });
      }

      // Render Rocket Head (Incandescent Plasma Teardrop Flame)
      ctx.save();
      const headGrad = ctx.createRadialGradient(this.rocket.x, this.rocket.y, 2, this.rocket.x, this.rocket.y, 36);
      headGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      headGrad.addColorStop(0.25, 'rgba(254, 240, 138, 0.9)');
      headGrad.addColorStop(0.6, 'rgba(245, 158, 11, 0.45)');
      headGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = headGrad;
      ctx.beginPath();
      ctx.arc(this.rocket.x, this.rocket.y, 36, 0, Math.PI * 2);
      ctx.fill();

      // White-hot incandescent shell head
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.rocket.x, this.rocket.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (progress >= 1 && !this.rocket.apexTriggered) {
        this.rocket.apexTriggered = true;
        const rx = this.rocket.targetX;
        const ry = this.rocket.targetY;
        const cb = this.rocket.onApex;
        this.rocket = null;
        this.cameraSpeed = 0;
        this.apexSpark = { x: rx, y: ry, pulse: 0, startTime: now };
        if (typeof cb === 'function') cb(rx, ry);
      }
    }

    // 6. Render Apex Delay Fuse (0.7s Suspenseful Hot Ember Sizzle)
    if (this.apexSpark) {
      this.cameraSpeed *= 0.82;
      this.apexSpark.pulse += 0.12;
      const pScale = 1 + Math.sin(this.apexSpark.pulse) * 0.35;

      ctx.save();
      // Hot glowing ruby outer corona
      ctx.fillStyle = 'rgba(255, 112, 67, 0.35)';
      ctx.beginPath();
      ctx.arc(this.apexSpark.x, this.apexSpark.y, 6.5 * pScale, 0, Math.PI * 2);
      ctx.fill();

      // Glowing core delay fuse
      ctx.fillStyle = '#ff7043';
      ctx.beginPath();
      ctx.arc(this.apexSpark.x, this.apexSpark.y, 3.2 * pScale, 0, Math.PI * 2);
      ctx.fill();

      // White-hot center pinprick
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.apexSpark.x, this.apexSpark.y, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Tiny delay fuse sizzle sparks
      if (Math.random() > 0.25) {
        this.particles.push({
          x: this.apexSpark.x + (Math.random() - 0.5) * 4,
          y: this.apexSpark.y + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 2.2,
          vy: (Math.random() - 0.5) * 2.2,
          color: Math.random() > 0.5 ? '#fef08a' : '#ff9800',
          size: 1.1,
          alpha: 0.95,
          decay: 0.05,
          drag: 0.95,
          gravity: 0.04,
          isText: false,
          trail: [],
          maxTrail: 1
        });
      }
      ctx.restore();
    }

    // 7. Detonation Shockwave Flash
    if (this.flashAlpha > 0.01) {
      ctx.save();
      const flashGrad = ctx.createRadialGradient(w / 2, h * 0.42, 10, w / 2, h * 0.42, w * 0.7);
      flashGrad.addColorStop(0, `rgba(255, 255, 255, ${this.flashAlpha})`);
      flashGrad.addColorStop(0.35, `rgba(254, 240, 138, ${this.flashAlpha * 0.8})`);
      flashGrad.addColorStop(0.7, `rgba(212, 175, 55, ${this.flashAlpha * 0.38})`);
      flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = flashGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
      this.flashAlpha *= 0.88;
    }

    // 8. Explosion Lifecycle Coordinator
    if (this.explosionState) {
      const expElapsed = now - this.explosionState.startTime;

      // 450ms into explosion: Trigger Swarm Sound
      if (expElapsed >= 450 && !this.explosionState.morphTriggered) {
        this.explosionState.morphTriggered = true;
        if (typeof this.explosionState.onMorphStart === 'function') {
          this.explosionState.onMorphStart();
        }
      }

      // 1200ms into explosion: Trigger Grand Winner Reveal
      if (expElapsed >= 1200 && !this.explosionState.lockedTriggered) {
        this.explosionState.lockedTriggered = true;
        if (typeof this.explosionState.onLocked === 'function') {
          this.explosionState.onLocked();
        }
      }

      // Continuous celebratory background mini-fireworks (every 1.6s)
      if (this.explosionState.lockedTriggered && now - this.lastBackgroundBurst > 1600) {
        this.lastBackgroundBurst = now;
        this.spawnBackgroundBurst();
      }
    }

    // 9. High-Performance Particle Rendering (Hardware Additive Blending 60 FPS)
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // Particle pool memory safety cap
    if (this.particles.length > 1000) {
      this.particles.splice(0, this.particles.length - 1000);
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // === Pyrotechnic Shell & Willow Particle Dynamics ===
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      p.trail.unshift({ x: p.x, y: p.y });
      if (p.trail.length > p.maxTrail) p.trail.pop();

      // Handle Dragon's egg micro-burst
      if (p.isCrackle && !p.hasCrackled && now >= p.crackleTime) {
        p.hasCrackled = true;
        // Spawn 3 micro bright flash embers
        if (this.particles.length < 800) {
          for (let k = 0; k < 3; k++) {
            const cAngle = Math.random() * Math.PI * 2;
            const cSpeed = Math.random() * 4.0 + 1.2;
            this.particles.push({
              x: p.x,
              y: p.y,
              vx: Math.cos(cAngle) * cSpeed,
              vy: Math.sin(cAngle) * cSpeed,
              color: Math.random() > 0.4 ? '#ffffff' : '#fef08a',
              size: 1.2,
              alpha: 1.0,
              decay: 0.08,
              drag: 0.92,
              gravity: 0.06,
              trail: [],
              maxTrail: 1
            });
          }
        }
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

        // Soft tapered fading streamer trail (Single continuous polyline)
        if (p.trail.length > 1) {
          ctx.strokeStyle = p.color;
          ctx.lineCap = 'round';
          ctx.globalAlpha = Math.max(0, p.alpha * 0.55);
          ctx.lineWidth = Math.max(0.6, p.size * 0.75);
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.stroke();
        }

        // Outer colored halo
        ctx.globalAlpha = Math.max(0, p.alpha * 0.4);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // White-hot star core
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    ctx.restore();
    this.animId = requestAnimationFrame(() => this.loop());
  }
}

// ================= DEFAULT REALISTIC MOCK EMPLOYEE ROSTER =================
const DEFAULT_EMPLOYEES = [
  { id: 'EMP-1001', name: 'Beatriz Santos', department: 'Product Design & UX', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1002', name: 'Eric Morales', department: 'Cloud Infrastructure', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1003', name: 'Diya Sharma', department: 'AI & Machine Learning', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1004', name: 'Ali Al-Mansoor', department: 'Mobile Development', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1005', name: 'Charles Dupont', department: 'Core Platform Team', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1006', name: 'Gabriel Costa', department: 'Security & Privacy', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1007', name: 'Hanna Lindqvist', department: 'Creative Brand Studio', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1042', name: 'Alexander Wright', department: 'Enterprise Architecture', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1108', name: 'Sophia Chen', department: 'Marketing Strategy', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1215', name: 'Marcus Vance', department: 'Data Intelligence', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1322', name: 'Elena Rostova', department: 'Global Operations', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1403', name: 'David Kim', department: 'Platform Engineering', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1490', name: 'Olivia Bennett', department: 'People & Culture (HR)', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1554', name: 'James Wilson', department: 'Enterprise Sales', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1631', name: 'Priya Patel', department: 'Cyber Defense', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1718', name: 'Lucas Dubois', department: 'Quality Assurance', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1804', name: 'Emily Zhang', department: 'Customer Success', avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1899', name: 'Benjamin Hayes', department: 'Finance & Legal', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1950', name: 'Chloe Taylor', department: 'Executive Office', avatar: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=256&q=80' },
  { id: 'EMP-1988', name: 'Liam O\'Connor', department: 'Global Logistics', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80' }
];

const DEFAULT_AWARD = {
  id: 'grand-prize',
  title: 'Annual Grand Prize',
  prizeName: 'MacBook Pro 16" M4 Max + Golden Trophy',
  tierBadge: '★ SSR LEGENDARY WINNER ★'
};

// ================= VUE 3 APPLICATION MOUNT =================
const { createApp, ref, computed, onMounted } = Vue;

const app = createApp({
  setup() {
    // Current Active Demo Mode: 'pack' | 'reel' | 'wheel' | 'firework'
    const currentMode = ref('pack');
    const isMuted = ref(false);

    // Common Data Pool
    const candidatePool = ref([...DEFAULT_EMPLOYEES]);
    const currentAward = ref(DEFAULT_AWARD);
    const reelTrackItems = ref([...DEFAULT_EMPLOYEES]);
    const wheelCandidates = ref([...DEFAULT_EMPLOYEES]);
    const fireworkCandidates = ref([...DEFAULT_EMPLOYEES]);

    let audio = null;
    let particleEngine = null;
    let fireworkEngine = null;

    const remainingCount = computed(() => candidatePool.value.length);

    const syncAllModesRoster = () => {
      reelTrackItems.value = [...candidatePool.value];
      wheelCandidates.value = [...candidatePool.value];
      fireworkCandidates.value = [...candidatePool.value];
    };

    // ================= ROSTER & PHOTO MANAGER STATE =================
    const isRosterOpen = ref(false);
    const bulkNamesText = ref(DEFAULT_EMPLOYEES.map(e => e.name).join('\n'));
    const activeUploadIndex = ref(-1);

    const openRosterDrawer = () => {
      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');
      isRosterOpen.value = true;
    };

    const closeRosterDrawer = () => {
      isRosterOpen.value = false;
    };

    // Sync from bulk textarea (like Wheel of Names)
    const syncBulkNames = () => {
      const lines = bulkNamesText.value.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length === 0) return;

      const newPool = lines.map((name, idx) => {
        const existing = candidatePool.value.find(c => c.name.toLowerCase() === name.toLowerCase());
        if (existing) return existing;
        return {
          id: `EMP-${1000 + idx + 1}`,
          name: name,
          department: 'Corporate Talent',
          avatar: DEFAULT_EMPLOYEES[idx % DEFAULT_EMPLOYEES.length]?.avatar || ''
        };
      });

      candidatePool.value = newPool;
      syncAllModesRoster();
    };

    const syncFromCards = () => {
      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');
      syncAllModesRoster();
    };

    const shuffleRoster = () => {
      const arr = [...candidatePool.value];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      candidatePool.value = arr;
      bulkNamesText.value = arr.map(e => e.name).join('\n');
      syncAllModesRoster();
    };

    const sortRoster = () => {
      const arr = [...candidatePool.value];
      arr.sort((a, b) => a.name.localeCompare(b.name));
      candidatePool.value = arr;
      bulkNamesText.value = arr.map(e => e.name).join('\n');
      syncAllModesRoster();
    };

    const removeCandidateAt = (idx) => {
      if (candidatePool.value.length <= 2) {
        alert('Please maintain at least 2 candidates in the pool.');
        return;
      }
      candidatePool.value.splice(idx, 1);
      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');
      syncAllModesRoster();
    };

    const restoreDefaultRoster = () => {
      candidatePool.value = JSON.parse(JSON.stringify(DEFAULT_EMPLOYEES));
      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');
      syncAllModesRoster();
    };

    const triggerPhotoUploadForIndex = (idx) => {
      activeUploadIndex.value = idx;
      const fileInput = document.getElementById('roster-photo-file-input');
      if (fileInput) fileInput.click();
    };

    const onPhotoSelected = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target.result;
        if (activeUploadIndex.value >= 0 && activeUploadIndex.value < candidatePool.value.length) {
          candidatePool.value[activeUploadIndex.value].avatar = dataUrl;
        } else if (candidatePool.value.length > 0) {
          candidatePool.value[0].avatar = dataUrl;
        }
        syncAllModesRoster();
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    };

    const getInitials = (name) => {
      if (!name) return 'AW';
      const parts = name.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    };

    const switchMode = (mode) => {
      currentMode.value = mode;
      resetCurrentMode();
      if (mode === 'firework') {
        Vue.nextTick(() => {
          if (fireworkEngine) {
            fireworkEngine.ensureCanvas();
          }
        });
      }
    };

    // =================================================================
    // MODE 1: FOIL PACK STATE & LOGIC
    // =================================================================
    const state = ref('IDLE');
    const isTorn = ref(false);
    const isShaking = ref(false);
    const isFlipped = ref(false);
    const cardPosition = ref('card-in-pack');
    const isCutting = ref(false);
    const cutProgress = ref(0);
    const sliceTrack = ref(null);
    const currentWinner = ref(null);

    const winnerInitials = computed(() => getInitials(currentWinner.value ? currentWinner.value.name : ''));
    const stateClass = computed(() => `state-${state.value.toLowerCase()}`);
    const cardPositionClass = computed(() => cardPosition.value);

    let dragStartX = 0;
    let dragStartTime = 0;
    let hasCompletedTear = false;
    let cutAnimId = null;
    let springAnimId = null;

    // Dynamic peel & tilt of the cap based on cutProgress (like authentic peeling foil packaging)
    const capDynamicStyle = computed(() => {
      if (isTorn.value) return {};
      const p = cutProgress.value;
      if (p <= 0) return {};
      const liftY = -Math.min(18, (p / 100) * 16);
      const rot = -Math.min(8.5, (p / 100) * 7.8);
      return {
        transform: `translateY(${liftY}px) rotate(${rot}deg)`,
        transition: isCutting.value ? 'none' : 'transform 0.28s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
      };
    });

    // Spring back smoothly to 0% (类似游戏那样可以撕回去、松手自然弹回复原)
    const springBackToZero = () => {
      if (springAnimId) cancelAnimationFrame(springAnimId);
      const startP = cutProgress.value;
      if (startP <= 0) return;

      const duration = Math.max(160, (startP / 100) * 280);
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const rawT = Math.min(1, elapsed / duration);
        const easeOut = 1 - Math.pow(1 - rawT, 3);
        const currentP = startP * (1 - easeOut);
        cutProgress.value = Math.max(0, currentP);

        if (rawT < 1) {
          springAnimId = requestAnimationFrame(step);
        } else {
          cutProgress.value = 0;
          springAnimId = null;
        }
      };

      springAnimId = requestAnimationFrame(step);
    };

    // Natural physics-based rip animation (duration ~880ms with authentic tearing resistance curve)
    const animateCutToCompletion = (fromProgress = null) => {
      if (hasCompletedTear) return;
      hasCompletedTear = true;
      isCutting.value = true;
      audio.initOnFirstGesture();

      if (cutAnimId) cancelAnimationFrame(cutAnimId);
      if (springAnimId) cancelAnimationFrame(springAnimId);

      const startP = fromProgress !== null ? fromProgress : cutProgress.value;
      const targetP = 100;
      const remainingDist = Math.max(15, targetP - startP);
      
      // Full rip: 880ms. Partial drag completion scales proportionally (min 400ms for visual delight)
      const duration = Math.max(400, (remainingDist / 100) * 880);
      const startTime = performance.now();
      let lastAudioTick = 0;

      const step = (now) => {
        const elapsed = now - startTime;
        const rawT = Math.min(1, elapsed / duration);

        // Natural tactile tearing curve: initial resistance (0-25%), accelerating zip (25-85%), crisp detachment (85-100%)
        let easeT;
        if (rawT < 0.28) {
          // Initial cut penetration: slightly slower
          easeT = (rawT / 0.28) * 0.18;
        } else if (rawT < 0.82) {
          // Steady ripping glide across pack
          const midT = (rawT - 0.28) / (0.82 - 0.28);
          easeT = 0.18 + midT * 0.68;
        } else {
          // Final swift snap through outer edge
          const endT = (rawT - 0.82) / (1 - 0.82);
          easeT = 0.86 + Math.pow(endT, 1.4) * 0.14;
        }

        const currentP = startP + (targetP - startP) * easeT;
        cutProgress.value = Math.min(100, currentP);

        // Modulate continuous physical foil tearing audio
        if (now - lastAudioTick > 55) {
          lastAudioTick = now;
          audio.playSliceScratchSound(currentP / 100);
        }

        // Emit sparks along the laser blade head
        if (sliceTrack.value) {
          const rect = sliceTrack.value.getBoundingClientRect();
          const sparkX = rect.left + (rect.width * Math.min(100, currentP)) / 100;
          const sparkY = rect.top + rect.height / 2;
          particleEngine.emitSparks(sparkX, sparkY);
        }

        if (rawT < 1) {
          cutAnimId = requestAnimationFrame(step);
        } else {
          cutAnimId = null;
          completeCut();
        }
      };

      cutAnimId = requestAnimationFrame(step);
    };

    const startCut = (e) => {
      if (state.value !== 'IDLE' || isTorn.value || hasCompletedTear) return;
      if (springAnimId) {
        cancelAnimationFrame(springAnimId);
        springAnimId = null;
      }
      isCutting.value = true;
      dragStartX = e.clientX;
      dragStartTime = Date.now();
      audio.initOnFirstGesture();

      if (e.currentTarget && e.currentTarget.setPointerCapture && e.pointerId !== undefined) {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch (err) {}
      }
      updateCutPosition(e.clientX, e.clientY);
    };

    const onCutMove = (e) => {
      if (!isCutting.value || state.value !== 'IDLE' || hasCompletedTear) return;
      updateCutPosition(e.clientX, e.clientY);
    };

    const updateCutPosition = (clientX, clientY) => {
      if (!sliceTrack.value || hasCompletedTear) return;
      const rect = sliceTrack.value.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      
      // BIDIRECTIONAL: can tear forward (> 0) and tear backward (< current)
      const rawProgress = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
      const delta = rawProgress - cutProgress.value;
      cutProgress.value = rawProgress;

      if (Math.abs(delta) > 2.0) {
        audio.playSliceScratchSound(rawProgress / 100);
        if (delta > 0) {
          particleEngine.emitSparks(clientX, clientY);
        }
      }

      // If user manually drags all the way across (>= 90%), snap complete!
      if (cutProgress.value >= 90) {
        animateCutToCompletion(cutProgress.value);
      }
    };

    const onTrackClick = (e) => {
      if (state.value !== 'IDLE' || isTorn.value || hasCompletedTear) return;
      // Single click triggers graceful 880ms rip
      animateCutToCompletion(0);
    };

    const endCut = (e) => {
      if (!isCutting.value) return;
      isCutting.value = false;
      if (state.value !== 'IDLE' || hasCompletedTear) return;

      const elapsed = Date.now() - dragStartTime;
      const dist = e ? Math.abs(e.clientX - dragStartX) : 0;

      // Quick tap or click without drag (< 220ms): auto-rip across over 880ms
      if (elapsed < 220 && dist < 12) {
        animateCutToCompletion(0);
      } else if (cutProgress.value >= 82) {
        // Almost finished: snap finish the rest
        animateCutToCompletion(cutProgress.value);
      } else {
        // Let go mid-way: SPRING BACK TO 0! (像游戏那样可以撕回去)
        springBackToZero();
      }
    };

    const completeCut = () => {
      if (state.value !== 'IDLE') return;
      isCutting.value = false;
      cutProgress.value = 100;

      if (candidatePool.value.length === 0) {
        alert('All candidates drawn! Resetting roster.');
        resetCurrentMode();
        return;
      }

      const randIdx = Math.floor(Math.random() * candidatePool.value.length);
      currentWinner.value = candidatePool.value.splice(randIdx, 1)[0];
      syncAllModesRoster();
      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');

      state.value = 'TEARING';
      isShaking.value = true;
      isTorn.value = true;
      audio.playSliceCompleteSound();

      setTimeout(() => {
        isShaking.value = false;
        state.value = 'SLIDING';
        cardPosition.value = 'card-sliding';
        audio.playSlideSound();

        setTimeout(() => {
          state.value = 'FLIPPING';
          cardPosition.value = 'card-revealed-pos';
          isFlipped.value = true;
          audio.playFlipSound();

          setTimeout(() => {
            state.value = 'REVEALED';
            audio.playFanfare();
            particleEngine.burstConfetti();
          }, 750);

        }, 600);

      }, 400);
    };

    const autoCutWithSpace = () => {
      if (state.value !== 'IDLE' || isTorn.value || hasCompletedTear) return;
      audio.initOnFirstGesture();
      cutProgress.value = 0;
      animateCutToCompletion(0);
    };

    const nextDraw = () => {
      if (state.value !== 'REVEALED') return;
      hasCompletedTear = false;
      if (cutAnimId) {
        cancelAnimationFrame(cutAnimId);
        cutAnimId = null;
      }
      if (springAnimId) {
        cancelAnimationFrame(springAnimId);
        springAnimId = null;
      }
      state.value = 'IDLE';
      isTorn.value = false;
      isShaking.value = false;
      isFlipped.value = false;
      cardPosition.value = 'card-in-pack';
      currentWinner.value = null;
      cutProgress.value = 0;
      isCutting.value = false;
    };

    // =================================================================
    // MODE 2: GALA SLOT REEL (NATURAL PHYSICAL DECELERATION)
    // =================================================================
    // States: 'IDLE' | 'SPINNING' | 'DECELERATING' | 'LOCKED' | 'REVEALED'
    const reelState = ref('IDLE');
    const currentScrollY = ref(0);
    const displayVelocity = ref(0);
    const targetWinnerIndex = ref(-1);
    const reelWinner = ref(null);
    const ROW_HEIGHT = 110; // Exactly 110px per row
    let reelAnimId = null;

    const isReelSpinning = computed(() => {
      return reelState.value === 'SPINNING' || reelState.value === 'DECELERATING';
    });

    const physicsPhaseDescription = computed(() => {
      switch (reelState.value) {
        case 'IDLE': return 'READY';
        case 'SPINNING': return 'SPINNING';
        case 'DECELERATING': return 'DECELERATING';
        case 'LOCKED': return 'WINNER LOCKED';
        case 'REVEALED': return 'WINNER CONFIRMED';
        default: return 'READY';
      }
    });

    // START NATURAL GALA SLOT REEL SPIN
    const startReelSpin = () => {
      if (reelState.value !== 'IDLE' && reelState.value !== 'REVEALED') return;
      if (candidatePool.value.length === 0) {
        alert('All candidates drawn! Resetting demo roster.');
        resetCurrentMode();
        return;
      }

      audio.initOnFirstGesture();

      // Reset scroll position immediately for clean fresh spin
      currentScrollY.value = 0;

      // 1. Pick REAL Winner from candidatePool
      const realIdx = Math.floor(Math.random() * candidatePool.value.length);
      const winner = candidatePool.value.splice(realIdx, 1)[0];
      reelWinner.value = winner;
      syncAllModesRoster();
      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');

      // 2. Assemble a track of candidate rows using dynamic pool (winner centered at targetIdx)
      const pool = candidatePool.value.length > 0 ? candidatePool.value : DEFAULT_EMPLOYEES;
      const targetIdx = 36 + Math.floor(Math.random() * 8);
      targetWinnerIndex.value = targetIdx;

      const track = [];
      for (let i = 0; i < targetIdx; i++) {
        track.push({ ...pool[i % pool.length] });
      }
      track.push({ ...winner }); // Winner at targetIdx
      for (let j = 1; j <= 8; j++) {
        track.push({ ...pool[(targetIdx + j) % pool.length] });
      }

      reelTrackItems.value = track;

      // Final target scroll distance: exactly centers the winner row
      const y_final = (targetIdx - 1) * ROW_HEIGHT; // 2750px
      const totalDuration = 6500; // 6.5s natural smooth decay
      const power = 3.4;
      const startTime = performance.now();
      let lastClickedRow = -1;

      reelState.value = 'SPINNING';
      if (reelAnimId) cancelAnimationFrame(reelAnimId);

      const animStep = (now) => {
        const elapsed = now - startTime;

        if (elapsed >= totalDuration) {
          // Clean, decisive arrival directly on the winner
          currentScrollY.value = y_final;
          displayVelocity.value = 0;
          reelState.value = 'LOCKED';

          audio.playLatchSnap();

          // 0.4s Dramatic Tension Pause -> Explode Celebration!
          setTimeout(() => {
            reelState.value = 'REVEALED';
            audio.playFanfare();
            particleEngine.burstConfetti();
          }, 400);

          return;
        }

        // Pure smooth physical power ease-out (velocity strictly decays to 0)
        const s = elapsed / totalDuration;
        const y = y_final * (1 - Math.pow(1 - s, power));
        const v = (y_final * power / (totalDuration / 1000)) * Math.pow(1 - s, power - 1);

        if (s < 0.55) {
          reelState.value = 'SPINNING';
        } else {
          reelState.value = 'DECELERATING';
        }

        // Tick sound synchronization: play tick on each 110px row boundary
        const currentRow = Math.floor(y / ROW_HEIGHT);
        if (currentRow !== lastClickedRow) {
          lastClickedRow = currentRow;
          audio.playReelClick(v);
        }

        currentScrollY.value = y;
        displayVelocity.value = Math.max(0, v);

        reelAnimId = requestAnimationFrame(animStep);
      };

      reelAnimId = requestAnimationFrame(animStep);
    };

    // =================================================================
    // =================================================================
    // MODE 3: BESPOKE GALA FORTUNE WHEEL (IMPERIAL GOLD & NAVY PALETTE)
    // =================================================================
    // States: 'IDLE' | 'SPINNING' | 'DECELERATING' | 'LOCKED' | 'REVEALED'
    const wheelState = ref('IDLE');
    const wheelRotation = ref(0);
    const pointerFlutterAngle = ref(0);
    const wheelWinner = ref(null);
    const currentIndicatorCandidate = ref(null);
    let wheelAnimId = null;

    const sectorCount = computed(() => wheelCandidates.value.length || 1);
    const sectorAngle = computed(() => 360 / sectorCount.value);

    // Bespoke Imperial Gold & Deep Navy luxury gala palette
    const sectorColors = [
      '#0f172a', '#d4af37', '#1e293b', '#b45309',
      '#1e1b4b', '#f59e0b', '#172554', '#ca8a04',
      '#022c22', '#d97706', '#1e293b', '#eab308'
    ];

    const getSectorColor = (idx) => sectorColors[idx % sectorColors.length];

    const isWheelSpinning = computed(() => {
      return wheelState.value === 'SPINNING' || wheelState.value === 'DECELERATING';
    });

    // PURE PHYSICAL ROTATION (Wheel of Names Model)
    const startWheelSpin = () => {
      if (wheelState.value === 'SPINNING' || wheelState.value === 'DECELERATING' || wheelState.value === 'LOCKED') return;
      if (wheelCandidates.value.length === 0) {
        alert('All candidates drawn! Resetting demo roster.');
        wheelCandidates.value = [...DEFAULT_EMPLOYEES];
        return;
      }

      audio.initOnFirstGesture();

      // Pick winner index
      const numSectors = wheelCandidates.value.length;
      const anglePerSec = 360 / numSectors;
      const targetSectorIdx = Math.floor(Math.random() * numSectors);
      const winner = wheelCandidates.value[targetSectorIdx];
      wheelWinner.value = winner;

      // Pure continuous landing position across the sector (0.005 to 0.995)
      // Produces natural millimeter-level boundary suspense whenever Math.random() is near 0 or 1
      const sectorPositionRatio = 0.008 + Math.random() * 0.984;
      const targetAngle = (targetSectorIdx + sectorPositionRatio) * anglePerSec;

      // Pointer is at 3 o'clock (0 deg / 360 deg)
      const desiredMod360 = (360 - (targetAngle % 360)) % 360;

      const startAngle = wheelRotation.value;
      const currentMod360 = (startAngle % 360 + 360) % 360;
      let forwardDelta = desiredMod360 - currentMod360;
      if (forwardDelta <= 0) forwardDelta += 360;

      // 7 to 9 full spins for a long, thrilling blur
      const numFullSpins = 7 + Math.floor(Math.random() * 3);
      const totalDeltaRotation = 360 * numFullSpins + forwardDelta;
      const finalWheelRotation = startAngle + totalDeltaRotation;

      // Duration: 7.5s to 8.4s with smooth cubic/quartic ease-out tail
      const totalDuration = 7600 + Math.random() * 800;
      const power = 3.9; // Authentic heavy-wheel friction: fast start, long creeping tail
      const startTime = performance.now();
      let lastSectorIdx = -1;

      wheelState.value = 'SPINNING';
      if (wheelAnimId) cancelAnimationFrame(wheelAnimId);

      const wheelStep = (now) => {
        const elapsed = now - startTime;

        if (elapsed >= totalDuration) {
          wheelRotation.value = finalWheelRotation;
          pointerFlutterAngle.value = 0;
          wheelState.value = 'LOCKED';
          audio.playPegSnap();

          setTimeout(() => {
            wheelState.value = 'REVEALED';
            audio.playFanfare();
            particleEngine.burstConfetti();
          }, 350);

          return;
        }

        const s = Math.min(1, elapsed / totalDuration);
        const currentRot = startAngle + totalDeltaRotation * (1 - Math.pow(1 - s, power));
        const rotSpeed = (totalDeltaRotation * power / (totalDuration / 1000)) * Math.pow(1 - s, power - 1);
        wheelRotation.value = currentRot;

        if (s < 0.60) {
          wheelState.value = 'SPINNING';
        } else {
          wheelState.value = 'DECELERATING';
        }

        // Pointer at 3 o'clock (0 deg): track current sector and trigger micro-flutter & clicks
        const angleAt3OClock = (360 - (currentRot % 360)) % 360;
        const currentSectorIdx = Math.floor(angleAt3OClock / anglePerSec);
        const safeIdx = (currentSectorIdx + numSectors) % numSectors;
        currentIndicatorCandidate.value = wheelCandidates.value[safeIdx];

        // Sector boundary crossing detection
        if (currentSectorIdx !== lastSectorIdx) {
          lastSectorIdx = currentSectorIdx;
          audio.playNeedleTick(rotSpeed);
          // Micro-flutter on 3 o'clock pointer
          pointerFlutterAngle.value = (rotSpeed > 80) ? (Math.random() > 0.5 ? 2.5 : -2.5) : -3.5;
        }

        // Pointer spring back to 0
        pointerFlutterAngle.value *= 0.78;

        wheelAnimId = requestAnimationFrame(wheelStep);
      };

      wheelAnimId = requestAnimationFrame(wheelStep);
    };

    // Remove Winner from Wheel (dynamic sector resizing)
    const removeWinnerFromWheel = () => {
      if (!wheelWinner.value) return;
      const poolIdx = candidatePool.value.findIndex(c => c.id === wheelWinner.value.id);
      if (poolIdx !== -1) {
        candidatePool.value.splice(poolIdx, 1);
      }
      syncAllModesRoster();
      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');
      wheelState.value = 'IDLE';
      wheelWinner.value = null;
    };

    const closeWheelModal = () => {
      wheelState.value = 'IDLE';
    };

    // =================================================================
    // MODE 4: CELESTIAL FIREWORK BURST (MALAYSIAN GALA EDITION)
    // =================================================================
    const fireworkState = ref('IDLE'); // 'IDLE' | 'IGNITING' | 'ASCENDING' | 'APEX' | 'BURSTING' | 'REVEALED'
    const fireworkWinner = ref(null);

    const isFireworkActive = computed(() => {
      return fireworkState.value === 'IGNITING' || fireworkState.value === 'ASCENDING' || fireworkState.value === 'APEX' || fireworkState.value === 'BURSTING';
    });

    const startFireworkLaunch = () => {
      if (isFireworkActive.value) return;

      if (fireworkEngine) {
        fireworkEngine.ensureCanvas();
      }

      // If already revealed, smoothly reset to ground battery before launching next shell
      if (fireworkState.value === 'REVEALED') {
        fireworkState.value = 'IDLE';
        if (fireworkEngine) fireworkEngine.clear();
        setTimeout(() => {
          startFireworkLaunch();
        }, 320);
        return;
      }

      if (fireworkCandidates.value.length === 0) {
        alert('All candidates drawn! Restoring demo roster.');
        fireworkCandidates.value = [...candidatePool.value];
        return;
      }

      if (audio) audio.initOnFirstGesture();

      // Pick winner
      const winnerIdx = Math.floor(Math.random() * fireworkCandidates.value.length);
      const winner = fireworkCandidates.value[winnerIdx];
      fireworkWinner.value = winner;

      // Phase 1: Quickmatch Fuse Sizzle (0.4s)
      fireworkState.value = 'IGNITING';
      if (audio) audio.playFuseIgnite(0.4);

      setTimeout(() => {
        // Phase 2: High-Velocity Mortar Lift & Rocket Ascent (1.3s)
        fireworkState.value = 'ASCENDING';
        const durationMs = 1300;

        // Exact physical coordinates from the ceremonial mortar tube mouth
        const rim = document.getElementById('mortar-launch-rim');
        let startX = window.innerWidth / 2;
        let startY = window.innerHeight - 110;
        if (rim) {
          const r = rim.getBoundingClientRect();
          startX = r.left + r.width / 2;
          startY = r.top + 4;
        }

        const targetX = window.innerWidth / 2;
        const targetY = window.innerHeight * 0.32;

        // Synchronous audio: explosive bottom lift punch + acoustic screamer ascent
        if (audio) {
          audio.playMortarLift();
          audio.playRocketAscent(durationMs / 1000);
        }

        if (fireworkEngine) {
          fireworkEngine.launchRocket(
            startX,
            startY,
            targetX,
            targetY,
            durationMs,
            (apexX, apexY) => {
              // Phase 3: Apex Suspense (0.5s Dead Silence)
              fireworkState.value = 'APEX';

              setTimeout(() => {
                // Phase 4: Supernova Detonation (Multi-Colored Pyro Blast & 3D Particle Text Morphing)
                fireworkState.value = 'BURSTING';
                if (audio) audio.playMortarBlast();
                if (fireworkEngine) {
                  fireworkEngine.createExplosion(
                    apexX, 
                    apexY, 
                    winner.name,
                    () => {
                      // On Morph Start (~0.45s into explosion: particles swarm toward letters)
                      if (audio) audio.playSwarmMorph();
                    },
                    () => {
                      // On 3D Particle Text Locked (~1.35s: letters glowing in night sky)
                      fireworkState.value = 'REVEALED';
                      if (audio) audio.playStarlightChime();
                    }
                  );
                }
              }, 500); // 0.5s suspense stillness at apex
            }
          );
        }
      }, 400); // 0.4s fuse ignition delay
    };

    const removeWinnerFromFirework = () => {
      if (!fireworkWinner.value) return;
      const poolIdx = candidatePool.value.findIndex(c => c.id === fireworkWinner.value.id);
      if (poolIdx !== -1) candidatePool.value.splice(poolIdx, 1);
      syncAllModesRoster();
      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');
      fireworkState.value = 'IDLE';
      fireworkWinner.value = null;
      if (fireworkEngine) fireworkEngine.clear();
    };

    const closeFireworkModal = () => {
      fireworkState.value = 'IDLE';
      if (fireworkEngine) fireworkEngine.clear();
    };

    // Reset Current Mode Stage State
    const resetCurrentMode = (resetPool = false) => {
      // Pack reset
      hasCompletedTear = false;
      if (cutAnimId) {
        cancelAnimationFrame(cutAnimId);
        cutAnimId = null;
      }
      if (springAnimId) {
        cancelAnimationFrame(springAnimId);
        springAnimId = null;
      }
      state.value = 'IDLE';
      isTorn.value = false;
      isShaking.value = false;
      isFlipped.value = false;
      cardPosition.value = 'card-in-pack';
      currentWinner.value = null;
      cutProgress.value = 0;
      isCutting.value = false;

      // Reel reset
      if (reelAnimId) cancelAnimationFrame(reelAnimId);
      reelState.value = 'IDLE';
      currentScrollY.value = 0;
      displayVelocity.value = 0;
      reelWinner.value = null;
      targetWinnerIndex.value = -1;
      reelTrackItems.value = [...candidatePool.value];

      // Wheel reset
      if (wheelAnimId) cancelAnimationFrame(wheelAnimId);
      wheelState.value = 'IDLE';
      wheelRotation.value = 0;
      pointerFlutterAngle.value = 0;
      wheelWinner.value = null;
      currentIndicatorCandidate.value = null;

      // Firework reset
      fireworkState.value = 'IDLE';
      fireworkWinner.value = null;
      if (fireworkEngine) fireworkEngine.clear();

      if (resetPool) {
        candidatePool.value = [...DEFAULT_EMPLOYEES];
        syncAllModesRoster();
        bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');
      }
    };

    const toggleMute = () => {
      isMuted.value = !isMuted.value;
      if (audio) {
        audio.setMute(isMuted.value);
      }
    };

    // Spacebar Listener
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (currentMode.value === 'pack') {
          if (state.value === 'IDLE') {
            autoCutWithSpace();
          } else if (state.value === 'REVEALED') {
            nextDraw();
          }
        } else if (currentMode.value === 'reel') {
          if (reelState.value === 'IDLE' || reelState.value === 'REVEALED') {
            startReelSpin();
          }
        } else if (currentMode.value === 'wheel') {
          if (wheelState.value === 'IDLE' || wheelState.value === 'REVEALED') {
            startWheelSpin();
          }
        } else if (currentMode.value === 'firework') {
          if (fireworkState.value === 'IDLE' || fireworkState.value === 'REVEALED') {
            startFireworkLaunch();
          }
        }
      } else if (e.code === 'KeyM') {
        toggleMute();
      } else if (e.code === 'KeyR') {
        resetCurrentMode();
      }
    };

    onMounted(() => {
      audio = new ProceduralAudioEngine();
      particleEngine = new ParticleEngine('confetti-canvas');
      fireworkEngine = new CelestialFireworkEngine('firework-canvas');
      window.addEventListener('keydown', handleKeyDown);

      const unlockAudio = () => {
        if (audio) audio.initOnFirstGesture();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('click', unlockAudio);
      window.addEventListener('keydown', unlockAudio);
    });

    return {
      currentMode,
      isMuted,
      remainingCount,
      currentAward,
      getInitials,
      switchMode,
      toggleMute,
      resetCurrentMode,

      // Mode 1 (Pack)
      state,
      isTorn,
      isShaking,
      isFlipped,
      isCutting,
      cutProgress,
      sliceTrack,
      cardPositionClass,
      stateClass,
      currentWinner,
      winnerInitials,
      capDynamicStyle,
      startCut,
      onCutMove,
      onTrackClick,
      endCut,
      autoCutWithSpace,
      nextDraw,

      // Mode 2 (Residual Inertia Reel)
      reelState,
      physicsPhase: reelState,
      currentScrollY,
      displayVelocity,
      reelTrackItems,
      targetWinnerIndex,
      reelWinner,
      isReelSpinning,
      physicsPhaseDescription,
      startReelSpin,
      startPhysicalSpin: startReelSpin,

      // Mode 3 (Fortune Wheel - Pure Physics)
      wheelState,
      wheelRotation,
      pointerFlutterAngle,
      wheelWinner,
      wheelCandidates,
      sectorCount,
      sectorAngle,
      getSectorColor,
      isWheelSpinning,
      currentIndicatorCandidate,
      startWheelSpin,
      removeWinnerFromWheel,
      closeWheelModal,

      // Mode 4 (Celestial Firework Burst)
      fireworkState,
      fireworkWinner,
      fireworkCandidates,
      isFireworkActive,
      startFireworkLaunch,
      removeWinnerFromFirework,
      closeFireworkModal,

      // Roster & Photo Manager
      isRosterOpen,
      bulkNamesText,
      openRosterDrawer,
      closeRosterDrawer,
      syncBulkNames,
      syncFromCards,
      shuffleRoster,
      sortRoster,
      removeCandidateAt,
      restoreDefaultRoster,
      triggerPhotoUploadForIndex,
      onPhotoSelected
    };
  }
});

app.mount('#app');
