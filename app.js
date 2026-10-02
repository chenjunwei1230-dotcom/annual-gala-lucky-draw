/**
 * ==========================================================================
 * ANNUAL GALA CELESTIAL FIREWORK LUCKY DRAW — STANDALONE EDITION
 * Vue 3, Web Audio Procedural Sound Synthesizer & 60 FPS Pyrotechnic Canvas
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

  // Phase 1: Quickmatch fuse burning sound
  playFuseIgnite(duration = 0.4) {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.3 ? 0.9 : 0.15);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.Q.setValueAtTime(3.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.05);
    gain.gain.linearRampToValueAtTime(0.32, now + duration - 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  }

  // Phase 2A: Deep sub-bass mortar barrel bottom punch
  playMortarLift() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.35);

    gain.gain.setValueAtTime(0.85, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Phase 2B: High-velocity screaming rocket tail (Soaring Ascent Whistle)
  playRocketAscent(duration = 2.6) {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(920, now + duration);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.linearRampToValueAtTime(0.38, now + duration * 0.75);
    gain.gain.linearRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  // Phase 4: Supernova Mortar Detonation Shockwave
  playMortarBlast() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Sub-bass detonation boom
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(95, now);
    subOsc.frequency.exponentialRampToValueAtTime(28, now + 0.85);

    subGain.gain.setValueAtTime(0.95, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.1);

    // Incandescent powder shockwave crack
    const dur = 0.65;
    const bufferSize = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.85;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(220, now + dur);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.65, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + dur);
  }

  // Phase 4B: Secondary Pyrotechnic Crackle / Dragon Eggs Pops
  playCrackle() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const dur = 0.38;
    const bufferSize = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.86 ? 0.95 : 0.03);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2600, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.42, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + dur);
  }

  // Phase 5: Celebratory victory starlight fanfare
  playStarlightChime() {
    if (this.isMuted) return;
    this.initOnFirstGesture();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    freqs.forEach((f, idx) => {
      const now = ctx.currentTime + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.4);
    });
  }
}

// ================= CELESTIAL FIREWORK PHYSICS ENGINE (GALA HEAVY ARTILLERY EDITION) =================
// Professional Dual-Canvas High-Performance Pyrotechnic System
// - Dual-Canvas Light-Painting trails (silky long-exposure without array loops)
// - Zero-GC Object Pooling (StarPool + SparkPool) for 60 FPS on low-spec hardware
// - Massive Heavy Artillery Gala Scale (Outer Peony + Inner Pistil + Kamuro Willow Waterfall)

const GALA_FIREWORK_COLORS = [
  '#ffd700', // Imperial Sodium Gold (Kamuro Willow)
  '#ff1744', // Strontium Crimson Ruby
  '#00e5ff', // Electric Copper Cyan
  '#d500f9', // Royal Potassium Violet / Magenta
  '#00e676', // Barium Emerald Green
  '#ff9100', // Calcium Solar Amber
  '#ffffff', // Titanium Brilliant White
  '#818cf8'  // Starlight Laser Blue
];

const GALA_MASTER_THEMES = [
  {
    name: 'Imperial Kamuro & Diamond Pistil (金柳锦冠 + 钻石白金内芯)',
    outer: '#ffd700',
    pistil: '#ffffff',
    sparks: '#ffd700',
    sky: 'rgba(255, 215, 0, 0.18)',
    hasCrackle: true
  },
  {
    name: 'Crimson Ruby & Emerald Core (红宝石皇冠 + 翡翠绿心)',
    outer: '#ff1744',
    pistil: '#00e676',
    sparks: '#ff9100',
    sky: 'rgba(255, 23, 68, 0.18)',
    hasCrackle: true
  },
  {
    name: 'Electric Cyan & Solar Amber (青空霓虹 + 耀阳琥珀)',
    outer: '#00e5ff',
    pistil: '#ff9100',
    sparks: '#00e5ff',
    sky: 'rgba(0, 229, 255, 0.17)',
    hasCrackle: true
  },
  {
    name: 'Royal Magenta & Starlight Gold (皇家紫晶 + 璨金内蕊)',
    outer: '#d500f9',
    pistil: '#ffd700',
    sparks: '#ffffff',
    sky: 'rgba(213, 0, 249, 0.17)',
    hasCrackle: true
  },
  {
    name: 'Supernova Tricolor Gala (三色盛宴特大礼花)',
    outer: '#ff1744',
    pistil: '#00e5ff',
    sparks: '#ffd700',
    sky: 'rgba(255, 215, 0, 0.20)',
    hasCrackle: true
  }
];

class CelestialFireworkEngine {
  constructor(mainCanvasId = 'firework-canvas', trailsCanvasId = 'firework-trails-canvas') {
    this.mainCanvasId = mainCanvasId;
    this.trailsCanvasId = trailsCanvasId;
    this.mainCanvas = null;
    this.mainCtx = null;
    this.trailsCanvas = null;
    this.trailsCtx = null;

    // Astronomy background stars
    this.backgroundStars = [];
    
    // Active simulation entities
    this.stars = [];
    this.sparks = [];
    this.burstFlashes = [];
    this.rocket = null;
    this.apexSpark = null;
    
    // Sky lighting
    this.skyColor = null;
    this.skyAlpha = 0;
    
    // Screen physics
    this.screenShake = 0;
    this.cameraSpeed = 0;
    this.launchMuzzleX = 0;
    this.launchMuzzleY = 0;
    this.explosionState = null;
    this.lastBackgroundBurst = 0;
    this.animId = null;

    // Memory object pools (Zero garbage collection churn)
    this.starPool = [];
    this.sparkPool = [];

    this.ensureCanvas();
    this.startLoop();
    window.addEventListener('resize', () => {
      this.resize();
      this.initBackgroundStars();
    });
  }

  obtainStar() {
    if (this.starPool.length > 0) {
      return this.starPool.pop();
    }
    return {
      x: 0, y: 0, prevX: 0, prevY: 0,
      vx: 0, vy: 0,
      color: '#ffd700',
      size: 3,
      life: 1000,
      maxLife: 1000,
      drag: 0.98,
      gravity: 0.18,
      sparkFreq: 30,
      sparkTimer: 0,
      sparkColor: '#ffd700',
      sparkSpeed: 1.5,
      isCrackle: false,
      hasCrackled: false
    };
  }

  releaseStar(star) {
    if (this.starPool.length < 1500) {
      this.starPool.push(star);
    }
  }

  obtainSpark() {
    if (this.sparkPool.length > 0) {
      return this.sparkPool.pop();
    }
    return {
      x: 0, y: 0, prevX: 0, prevY: 0,
      vx: 0, vy: 0,
      color: '#ffd700',
      life: 500,
      maxLife: 500,
      drag: 0.90,
      gravity: 0.15
    };
  }

  releaseSpark(spark) {
    if (this.sparkPool.length < 3000) {
      this.sparkPool.push(spark);
    }
  }

  ensureCanvas() {
    this.mainCanvas = document.getElementById(this.mainCanvasId);
    this.trailsCanvas = document.getElementById(this.trailsCanvasId);
    if (this.mainCanvas) this.mainCtx = this.mainCanvas.getContext('2d');
    if (this.trailsCanvas) this.trailsCtx = this.trailsCanvas.getContext('2d');

    if (this.mainCanvas && this.mainCtx) {
      this.resize();
      if (this.backgroundStars.length === 0) {
        this.initBackgroundStars();
      }
      this.startLoop();
      return true;
    }
    return false;
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (this.mainCanvas && (this.mainCanvas.width !== w || this.mainCanvas.height !== h)) {
      this.mainCanvas.width = w;
      this.mainCanvas.height = h;
    }
    if (this.trailsCanvas && (this.trailsCanvas.width !== w || this.trailsCanvas.height !== h)) {
      this.trailsCanvas.width = w;
      this.trailsCanvas.height = h;
      if (this.trailsCtx) {
        this.trailsCtx.fillStyle = '#07080b';
        this.trailsCtx.fillRect(0, 0, w, h);
      }
    }
  }

  clear() {
    this.ensureCanvas();
    for (let i = 0; i < this.stars.length; i++) {
      this.starPool.push(this.stars[i]);
    }
    this.stars.length = 0;
    for (let i = 0; i < this.sparks.length; i++) {
      this.sparkPool.push(this.sparks[i]);
    }
    this.sparks.length = 0;
    this.burstFlashes.length = 0;
    this.rocket = null;
    this.apexSpark = null;
    this.skyAlpha = 0;
    this.screenShake = 0;
    this.cameraSpeed = 0;
    this.explosionState = null;
    if (this.mainCtx && this.mainCanvas) {
      this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    }
    if (this.trailsCtx && this.trailsCanvas) {
      this.trailsCtx.fillStyle = '#07080b';
      this.trailsCtx.fillRect(0, 0, this.trailsCanvas.width, this.trailsCanvas.height);
    }
  }

  startLoop() {
    if (!this.animId) {
      this.loop();
    }
  }

  initBackgroundStars() {
    this.backgroundStars = [];
    const count = 160;
    const w = window.innerWidth || 1920;
    const h = window.innerHeight || 1080;
    for (let i = 0; i < count; i++) {
      this.backgroundStars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
        isMajor: i < 14
      });
    }
  }

  triggerSkyGlow(skyColor) {
    this.skyColor = skyColor;
    this.skyAlpha = 1.0;
  }

  // Launch Rocket with heavy soaring trail (2.60s ascent)
  launchRocket(startX, startY, targetX, targetY, durationMs, onApex, onExplode) {
    this.ensureCanvas();
    this.launchMuzzleX = startX;
    this.launchMuzzleY = startY;

    this.rocket = {
      x: startX,
      y: startY,
      prevX: startX,
      prevY: startY,
      startX,
      startY,
      targetX,
      targetY,
      startTime: performance.now(),
      duration: durationMs,
      onApex,
      onExplode,
      apexTriggered: false
    };

    this.screenShake = 14.0;

    // Mortar muzzle initial lift propellant sparks
    for (let i = 0; i < 110; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.44;
      const speed = Math.random() * 26 + 12;
      const sp = this.obtainSpark();
      sp.x = startX + (Math.random() - 0.5) * 16;
      sp.y = startY + (Math.random() - 0.5) * 4;
      sp.prevX = sp.x;
      sp.prevY = sp.y;
      sp.vx = Math.cos(angle) * speed;
      sp.vy = Math.sin(angle) * speed;
      sp.color = Math.random() > 0.35 ? '#ffd700' : '#ffffff';
      sp.life = Math.random() * 600 + 400;
      sp.maxLife = sp.life;
      sp.drag = 0.92;
      sp.gravity = 0.26;
      this.sparks.push(sp);
    }

    if (!this.animId) this.loop();
  }

  // Create Mega Gala Artillery Explosion (大花火盛开 - 震撼大型礼花弹)
  createExplosion(x, y, nameText, onMorphStart, onLocked) {
    this.ensureCanvas();
    this.apexSpark = null;
    this.rocket = null;

    const theme = GALA_MASTER_THEMES[Math.floor(Math.random() * GALA_MASTER_THEMES.length)];
    this.triggerSkyGlow(theme.sky);

    // Powerful Detonation Shockwave Flash (BurstFlash) & Heavy Screen Punch
    this.screenShake = 22.0;
    this.burstFlashes.push({
      x,
      y,
      radius: 40,
      maxRadius: Math.min(window.innerWidth || 1920, window.innerHeight || 1080) * 0.60,
      speed: 32,
      alpha: 1.0,
      color: theme.outer
    });

    const now = performance.now();
    this.explosionState = {
      startTime: now,
      onLocked,
      lockedTriggered: false
    };

    // 1. Grand Outer Peony Ring (360 High-Velocity Incandescent Stars - Massive 600~800px spread)
    const outerCount = 360;
    for (let i = 0; i < outerCount; i++) {
      const angle = (i / outerCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
      // High initial explosive impulse (15 ~ 23 px/frame)
      const baseSpeed = Math.random() * 8 + 15.5;
      const star = this.obtainStar();
      star.x = x;
      star.y = y;
      star.prevX = x;
      star.prevY = y;
      star.vx = Math.cos(angle) * baseSpeed;
      star.vy = Math.sin(angle) * baseSpeed;
      star.color = theme.outer;
      star.size = Math.random() * 1.6 + 3.2; // Bold 3.2~4.8px trail streak
      star.life = Math.random() * 500 + 1300; // 1.3 ~ 1.8s burn
      star.maxLife = star.life;
      star.drag = 0.982; // Retains expansion momentum to fill screen
      star.gravity = 0.16;
      star.sparkFreq = 26; // Dense sparkling tail
      star.sparkTimer = 0;
      star.sparkColor = theme.sparks;
      star.sparkSpeed = 1.7;
      star.isCrackle = theme.hasCrackle && Math.random() < 0.45;
      star.hasCrackled = false;
      this.stars.push(star);
    }

    // 2. High-Density Inner Pistil (双重花芯 - 130 Stars with Contrasting Bright Color)
    const pistilCount = 130;
    for (let i = 0; i < pistilCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.0 + 7.5; // ~50% outer velocity creates brilliant inner flower
      const star = this.obtainStar();
      star.x = x;
      star.y = y;
      star.prevX = x;
      star.prevY = y;
      star.vx = Math.cos(angle) * speed;
      star.vy = Math.sin(angle) * speed;
      star.color = theme.pistil;
      star.size = Math.random() * 1.2 + 2.5;
      star.life = Math.random() * 350 + 900;
      star.maxLife = star.life;
      star.drag = 0.976;
      star.gravity = 0.14;
      star.sparkFreq = 36;
      star.sparkTimer = 0;
      star.sparkColor = '#ffffff';
      star.sparkSpeed = 1.0;
      star.isCrackle = false;
      star.hasCrackled = false;
      this.stars.push(star);
    }

    // 3. Kamuro Willow Golden Silk Waterfall (金柳垂丝瀑布 - 85 Heavy Streamers Cascading Downwards)
    const willowCount = 85;
    for (let i = 0; i < willowCount; i++) {
      const angle = (Math.random() - 0.5) * Math.PI * 1.6 - Math.PI / 2;
      const speed = Math.random() * 10 + 12;
      const star = this.obtainStar();
      star.x = x;
      star.y = y;
      star.prevX = x;
      star.prevY = y;
      star.vx = Math.cos(angle) * speed;
      star.vy = Math.sin(angle) * speed;
      star.color = '#ffd700'; // Pure Golden Kamuro
      star.size = 3.8;
      star.life = Math.random() * 700 + 1800; // Ultra long hanging life
      star.maxLife = star.life;
      star.drag = 0.989; // Retains momentum
      star.gravity = 0.23; // Cascades like a golden silk waterfall
      star.sparkFreq = 16; // Dense spark emitter
      star.sparkTimer = 0;
      star.sparkColor = '#ffd700';
      star.sparkSpeed = 1.3;
      star.isCrackle = false;
      star.hasCrackled = false;
      this.stars.push(star);
    }
  }

  // Secondary Flanking Shell for Multi-Winner Batch Celebrations
  spawnBackgroundBurst(customX, customY) {
    if (!this.mainCanvas) return;
    const w = this.mainCanvas.width;
    const h = this.mainCanvas.height;
    
    let x = customX;
    let y = customY;
    if (x === undefined) {
      const side = Math.random() > 0.5;
      x = side ? w * (0.18 + Math.random() * 0.16) : w * (0.66 + Math.random() * 0.18);
      y = h * (0.22 + Math.random() * 0.24);
    }

    const theme = GALA_MASTER_THEMES[Math.floor(Math.random() * GALA_MASTER_THEMES.length)];

    // Small shockwave
    this.burstFlashes.push({
      x,
      y,
      radius: 20,
      maxRadius: 180,
      speed: 18,
      alpha: 0.75,
      color: theme.outer
    });

    const starCount = 140;
    for (let i = 0; i < starCount; i++) {
      const angle = (i / starCount) * Math.PI * 2;
      const speed = Math.random() * 6.5 + 8.5;
      const star = this.obtainStar();
      star.x = x;
      star.y = y;
      star.prevX = x;
      star.prevY = y;
      star.vx = Math.cos(angle) * speed;
      star.vy = Math.sin(angle) * speed;
      star.color = theme.outer;
      star.size = 2.6;
      star.life = Math.random() * 350 + 850;
      star.maxLife = star.life;
      star.drag = 0.978;
      star.gravity = 0.16;
      star.sparkFreq = 34;
      star.sparkTimer = 0;
      star.sparkColor = theme.sparks;
      star.sparkSpeed = 1.2;
      star.isCrackle = theme.hasCrackle && Math.random() < 0.4;
      star.hasCrackled = false;
      this.stars.push(star);
    }
  }

  // Master Pyrotechnic Frame Loop
  loop() {
    if (!this.mainCtx) {
      this.animId = requestAnimationFrame(() => this.loop());
      return;
    }

    const now = performance.now();
    const w = this.mainCanvas.width;
    const h = this.mainCanvas.height;

    // 1. Trails Canvas: Light-Painting Long-Exposure Fade with alpha clearing (preserves transparent background)
    if (this.trailsCtx) {
      this.trailsCtx.globalCompositeOperation = 'destination-out';
      this.trailsCtx.fillStyle = 'rgba(0, 0, 0, 0.16)';
      this.trailsCtx.fillRect(0, 0, w, h);
      this.trailsCtx.globalCompositeOperation = 'lighter';
    }

    // 2. Main Canvas: Instant White-Hot Heads & Atmospheric Wash
    this.mainCtx.clearRect(0, 0, w, h);
    this.mainCtx.save();

    // Screen Shake
    if (this.screenShake > 0.1) {
      const sx = (Math.random() - 0.5) * this.screenShake;
      const sy = (Math.random() - 0.5) * this.screenShake;
      this.mainCtx.translate(sx, sy);
      this.screenShake *= 0.88;
    }

    // Sky Ambient Illumination (colorSky)
    if (this.skyAlpha > 0.01 && this.skyColor) {
      const skyGrad = this.mainCtx.createRadialGradient(w / 2, h * 0.32, 20, w / 2, h * 0.32, w * 0.65);
      skyGrad.addColorStop(0, this.skyColor);
      skyGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      this.mainCtx.save();
      this.mainCtx.globalAlpha = this.skyAlpha;
      this.mainCtx.fillStyle = skyGrad;
      this.mainCtx.fillRect(0, 0, w, h);
      this.mainCtx.restore();
      this.skyAlpha *= 0.94;
    }

    // Background Astronomical Starfield
    for (let i = 0; i < this.backgroundStars.length; i++) {
      const bs = this.backgroundStars[i];
      const twinkle = Math.sin(now * bs.twinkleSpeed + bs.phase);
      const alpha = Math.max(0.12, bs.alpha + twinkle * 0.28);
      this.mainCtx.fillStyle = bs.isMajor ? `rgba(255, 235, 180, ${alpha * 1.2})` : `rgba(210, 225, 255, ${alpha})`;
      this.mainCtx.beginPath();
      this.mainCtx.arc(bs.x, bs.y, bs.size, 0, Math.PI * 2);
      this.mainCtx.fill();
    }

    // Shockwave Burst Flashes
    for (let i = this.burstFlashes.length - 1; i >= 0; i--) {
      const bf = this.burstFlashes[i];
      bf.radius += bf.speed;
      bf.alpha *= 0.85;

      const flashGrad = this.mainCtx.createRadialGradient(bf.x, bf.y, 0, bf.x, bf.y, bf.radius);
      flashGrad.addColorStop(0, `rgba(255, 255, 255, ${bf.alpha * 0.95})`);
      flashGrad.addColorStop(0.25, `rgba(255, 240, 180, ${bf.alpha * 0.45})`);
      flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      this.mainCtx.fillStyle = flashGrad;
      this.mainCtx.fillRect(bf.x - bf.radius, bf.y - bf.radius, bf.radius * 2, bf.radius * 2);

      if (bf.alpha <= 0.02 || bf.radius >= bf.maxRadius) {
        this.burstFlashes.splice(i, 1);
      }
    }

    // 3. Rocket Ascent Physics (2.60s Soaring Plumb Line)
    if (this.rocket) {
      const elapsed = now - this.rocket.startTime;
      const progress = Math.min(1, elapsed / this.rocket.duration);
      // Realistic deceleration curve as rocket battles gravity to apex
      const ease = Math.sin((progress * Math.PI) / 2);

      this.rocket.prevX = this.rocket.x;
      this.rocket.prevY = this.rocket.y;
      this.rocket.x = this.rocket.startX + (this.rocket.targetX - this.rocket.startX) * ease;
      this.rocket.y = this.rocket.startY + (this.rocket.targetY - this.rocket.startY) * ease;

      // Rocket light-trail ribbon on trails canvas
      if (this.trailsCtx) {
        this.trailsCtx.strokeStyle = '#ffd700';
        this.trailsCtx.lineWidth = 4.0;
        this.trailsCtx.beginPath();
        this.trailsCtx.moveTo(this.rocket.x, this.rocket.y);
        this.trailsCtx.lineTo(this.rocket.prevX, this.rocket.prevY);
        this.trailsCtx.stroke();
      }

      // Drop fiery golden rocket sparks along the ascent line
      for (let s = 0; s < 4; s++) {
        const sp = this.obtainSpark();
        sp.x = this.rocket.x + (Math.random() - 0.5) * 5;
        sp.y = this.rocket.y + Math.random() * 6;
        sp.prevX = sp.x;
        sp.prevY = sp.y;
        sp.vx = (Math.random() - 0.5) * 2.2;
        sp.vy = Math.random() * 4.5 + 2.2;
        sp.color = Math.random() > 0.3 ? '#ff9100' : '#ffd700';
        sp.life = Math.random() * 320 + 200;
        sp.maxLife = sp.life;
        sp.drag = 0.94;
        sp.gravity = 0.20;
        this.sparks.push(sp);
      }

      // Draw incandescent rocket head on main canvas
      const headGlow = this.mainCtx.createRadialGradient(
        this.rocket.x, this.rocket.y, 2,
        this.rocket.x, this.rocket.y, 38
      );
      headGlow.addColorStop(0, '#ffffff');
      headGlow.addColorStop(0.3, 'rgba(255, 215, 0, 0.85)');
      headGlow.addColorStop(1, 'rgba(255, 145, 0, 0)');
      this.mainCtx.fillStyle = headGlow;
      this.mainCtx.beginPath();
      this.mainCtx.arc(this.rocket.x, this.rocket.y, 38, 0, Math.PI * 2);
      this.mainCtx.fill();

      this.mainCtx.fillStyle = '#ffffff';
      this.mainCtx.fillRect(this.rocket.x - 3, this.rocket.y - 3, 6, 6);

      if (progress >= 1 && !this.rocket.apexTriggered) {
        this.rocket.apexTriggered = true;
        const rx = this.rocket.targetX;
        const ry = this.rocket.targetY;
        const cb = this.rocket.onApex;
        this.rocket = null;
        this.apexSpark = { x: rx, y: ry, pulse: 0 };
        if (typeof cb === 'function') cb(rx, ry);
      }
    }

    // Apex Suspense Glow (0.15s)
    if (this.apexSpark) {
      this.apexSpark.pulse += 0.14;
      const scale = 1 + Math.sin(this.apexSpark.pulse) * 0.35;
      this.mainCtx.save();
      this.mainCtx.fillStyle = 'rgba(255, 240, 200, 0.9)';
      this.mainCtx.beginPath();
      this.mainCtx.arc(this.apexSpark.x, this.apexSpark.y, 5.5 * scale, 0, Math.PI * 2);
      this.mainCtx.fill();
      this.mainCtx.fillStyle = '#ffffff';
      this.mainCtx.fillRect(this.apexSpark.x - 2, this.apexSpark.y - 2, 4, 4);
      this.mainCtx.restore();
    }

    // 4. Explosion Lifecycle Coordinator (1.35s bloom reveal)
    if (this.explosionState) {
      const expElapsed = now - this.explosionState.startTime;

      if (expElapsed >= 1350 && !this.explosionState.lockedTriggered) {
        this.explosionState.lockedTriggered = true;
        if (typeof this.explosionState.onLocked === 'function') {
          this.explosionState.onLocked();
        }
      }

      if (this.explosionState.lockedTriggered && now - this.lastBackgroundBurst > 1200) {
        this.lastBackgroundBurst = now;
        this.spawnBackgroundBurst();
      }
    }

    // 5. Update Stars (Air Drag & Gravity Physics + Spark Shedding)
    const dt = 16.6;
    let crackleTriggered = false;

    // Group active stars by color code for batched single-pass rendering
    const starColorGroups = {};
    GALA_FIREWORK_COLORS.forEach(c => starColorGroups[c] = []);

    for (let i = this.stars.length - 1; i >= 0; i--) {
      const star = this.stars[i];
      star.life -= dt;

      if (star.life <= 0) {
        this.stars.splice(i, 1);
        this.releaseStar(star);
        continue;
      }

      star.prevX = star.x;
      star.prevY = star.y;
      star.x += star.vx;
      star.y += star.vy;
      star.vx *= star.drag;
      star.vy *= star.drag;
      star.vy += star.gravity;

      // Continuous Kamuro Spark Shedding
      if (star.sparkFreq > 0 && this.sparks.length < 1500) {
        star.sparkTimer += dt;
        if (star.sparkTimer >= star.sparkFreq) {
          star.sparkTimer = 0;
          const sp = this.obtainSpark();
          sp.x = star.x;
          sp.y = star.y;
          sp.prevX = star.prevX;
          sp.prevY = star.prevY;
          const spAngle = Math.random() * Math.PI * 2;
          const spSpeed = Math.random() * star.sparkSpeed;
          sp.vx = star.vx * 0.35 + Math.cos(spAngle) * spSpeed;
          sp.vy = star.vy * 0.35 + Math.sin(spAngle) * spSpeed;
          sp.color = star.sparkColor;
          sp.life = Math.random() * 450 + 400;
          sp.maxLife = sp.life;
          sp.drag = 0.90; // High drag forms glowing trailing dust
          sp.gravity = 0.14;
          this.sparks.push(sp);
        }
      }

      // Crackle / Dragon Eggs Effect at end of life
      if (star.isCrackle && !star.hasCrackled && star.life < star.maxLife * 0.3) {
        star.hasCrackled = true;
        crackleTriggered = true;
        if (this.sparks.length < 1300) {
          for (let k = 0; k < 6; k++) {
            const cAngle = Math.random() * Math.PI * 2;
            const cSpeed = Math.random() * 4.2 + 1.8;
            const sp = this.obtainSpark();
            sp.x = star.x;
            sp.y = star.y;
            sp.prevX = star.x;
            sp.prevY = star.y;
            sp.vx = Math.cos(cAngle) * cSpeed;
            sp.vy = Math.sin(cAngle) * cSpeed;
            sp.color = Math.random() > 0.5 ? '#ffffff' : '#ffd700';
            sp.life = Math.random() * 280 + 160;
            sp.maxLife = sp.life;
            sp.drag = 0.89;
            sp.gravity = 0.08;
            this.sparks.push(sp);
          }
        }
      }

      if (!starColorGroups[star.color]) {
        starColorGroups[star.color] = [];
      }
      starColorGroups[star.color].push(star);
    }

    if (crackleTriggered && window.__galaAudio) {
      window.__galaAudio.playCrackle();
    }

    // 6. Update Sparks (The Falling Golden Willow Stardust)
    const sparkColorGroups = {};
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const sp = this.sparks[i];
      sp.life -= dt;

      if (sp.life <= 0) {
        this.sparks.splice(i, 1);
        this.releaseSpark(sp);
        continue;
      }

      sp.prevX = sp.x;
      sp.prevY = sp.y;
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vx *= sp.drag;
      sp.vy *= sp.drag;
      sp.vy += sp.gravity;

      if (!sparkColorGroups[sp.color]) {
        sparkColorGroups[sp.color] = [];
      }
      sparkColorGroups[sp.color].push(sp);
    }

    // 7. Render Trails on Trails Canvas (Batched by Color -> Zero CPU Stutter)
    if (this.trailsCtx) {
      // Draw Stars (Thick incandescent ribbons)
      for (const color in starColorGroups) {
        const group = starColorGroups[color];
        if (group.length === 0) continue;

        this.trailsCtx.strokeStyle = color;
        this.trailsCtx.lineWidth = 3.8;
        this.trailsCtx.beginPath();
        for (let i = 0; i < group.length; i++) {
          const s = group[i];
          this.trailsCtx.moveTo(s.x, s.y);
          this.trailsCtx.lineTo(s.prevX, s.prevY);
        }
        this.trailsCtx.stroke();
      }

      // Draw Sparks (Kamuro Willow Silk Droplets)
      for (const color in sparkColorGroups) {
        const group = sparkColorGroups[color];
        if (group.length === 0) continue;

        this.trailsCtx.strokeStyle = color;
        this.trailsCtx.lineWidth = 1.8;
        this.trailsCtx.beginPath();
        for (let i = 0; i < group.length; i++) {
          const sp = group[i];
          this.trailsCtx.moveTo(sp.x, sp.y);
          this.trailsCtx.lineTo(sp.prevX, sp.prevY);
        }
        this.trailsCtx.stroke();
      }
    }

    // 8. Render White-Hot Star Heads on Main Canvas (Incandescent Tip Streaks)
    this.mainCtx.strokeStyle = '#ffffff';
    this.mainCtx.lineWidth = 2.0;
    this.mainCtx.beginPath();
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      this.mainCtx.moveTo(s.x, s.y);
      this.mainCtx.lineTo(s.prevX, s.prevY);
    }
    this.mainCtx.stroke();

    this.mainCtx.restore();
    this.animId = requestAnimationFrame(() => this.loop());
  }
}


// ================= ROYAL GOLD GALA CONFETTI ENGINE =================
class RoyalGoldConfettiEngine {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.canvas = null;
    this.ctx = null;
    this.pieces = [];
    this.animId = null;
    this.isActive = false;
    this.ensureCanvas();
    window.addEventListener('resize', () => this.resize());
  }

  ensureCanvas() {
    if (!this.canvas || !this.ctx || !document.contains(this.canvas)) {
      this.canvas = document.getElementById(this.canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      if (this.canvas) this.resize();
    }
    return !!(this.canvas && this.ctx);
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 150) {
    if (!this.ensureCanvas()) return;
    this.pieces = [];
    this.isActive = true;

    const CONFETTI_COLORS = [
      '#ffffff', '#f8fafc', '#e2e8f0', '#cbd5e1', // Pure Diamond White & Platinum Silver
      '#38bdf8', '#7dd3fc',                         // Electric Concert Stage Cyan
      '#818cf8', '#a5b4fc', '#c084fc',             // Laser Violet & Holographic Prism
      '#ffffff', '#f1f5f9'                         // Brilliant High-Gloss White
    ];

    const w = this.canvas.width;
    const h = this.canvas.height;

    for (let i = 0; i < count; i++) {
      const isRibbon = Math.random() > 0.35;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 15 + 7;

      this.pieces.push({
        x: w / 2 + (Math.random() - 0.5) * 120,
        y: h * 0.30 + (Math.random() - 0.5) * 80,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 7 + 4),
        gravity: 0.11 + Math.random() * 0.07,
        drag: 0.94 + Math.random() * 0.02,
        w: isRibbon ? Math.random() * 10 + 8 : Math.random() * 6 + 4,
        h: isRibbon ? Math.random() * 18 + 10 : Math.random() * 6 + 4,
        tilt: Math.random() * Math.PI,
        tiltSpeed: Math.random() * 0.12 + 0.04,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        opacity: 1.0,
        decay: Math.random() * 0.002 + 0.001,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
        isRibbon
      });
    }

    if (!this.animId) {
      this.loop();
    }
  }

  clear() {
    this.pieces = [];
    this.isActive = false;
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
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

    ctx.clearRect(0, 0, w, h);

    if (this.pieces.length === 0) {
      this.animId = null;
      this.isActive = false;
      return;
    }

    for (let i = this.pieces.length - 1; i >= 0; i--) {
      const p = this.pieces[i];
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * 1.5;
      p.y += p.vy;
      p.tilt += p.tiltSpeed;
      p.rotation += p.rotationSpeed;

      // Slowly fade when near bottom
      if (p.y > h * 0.72) {
        p.opacity -= 0.015;
      }

      if (p.y > h + 40 || p.opacity <= 0.01) {
        this.pieces.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.tilt), 1); // 3D tumbling paper flip
      ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
      ctx.fillStyle = p.color;

      if (p.isRibbon) {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        // Highlight edge for metallic glint
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w * 0.35, p.h);
      } else {
        // Diamond sequin
        ctx.beginPath();
        ctx.moveTo(0, -p.h / 2);
        ctx.lineTo(p.w / 2, 0);
        ctx.lineTo(0, p.h / 2);
        ctx.lineTo(-p.w / 2, 0);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }

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

const DEFAULT_AWARDS = [
  { id: 'grand', title: 'Grand Prize', prizeName: 'MacBook Pro 16" M4 Max', quota: 1, tierBadge: '★ SSR LEGENDARY ★' },
  { id: 'first', title: '1st Prize', prizeName: 'iPhone 16 Pro Max 512GB', quota: 2, tierBadge: '★ SR EXCLUSIVE ★' },
  { id: 'second', title: '2nd Prize', prizeName: 'iPad Pro 13" + Apple Pencil', quota: 5, tierBadge: '★ S LUXURY ★' },
  { id: 'third', title: '3rd Prize', prizeName: 'Sony WH-1000XM5 Wireless Headphones', quota: 10, tierBadge: '★ PREMIUM SELECTION ★' },
  { id: 'lucky', title: 'Lucky Prize', prizeName: 'Gala Deluxe Hamper / $100 Voucher', quota: 20, tierBadge: '★ LUCKY WINNER ★' }
];

const DEFAULT_TICKET_CONFIG = {
  brandTitle: 'ANNUAL GALA VIP PASS',
  admissionEyebrow: 'OFFICIAL WINNER ADMISSION',
  stubTitle: 'OFFICIAL CLAIM STUB',
  venue: 'CELESTIAL HALL',
  eventDate: '2026.09.29',
  securityStamp: 'VERIFIED',
  securityBadge: '★ AUTHENTICATED ★'
};

// ================= VUE 3 APPLICATION MOUNT =================
const { createApp, ref, computed, watch, onMounted } = Vue;

const app = createApp({
  setup() {
    const isMuted = ref(false);
    const isFullscreen = ref(false);

    // Candidates Pool & Winners History State
    const candidatePool = ref([...DEFAULT_EMPLOYEES]);
    const winnersHistory = ref([]);

    // ================= TOAST NOTIFICATION SYSTEM =================
    const toastMessage = ref('');
    const toastType = ref('info'); // 'info' | 'success' | 'warning'
    let toastTimer = null;

    const showToast = (msg, type = 'info') => {
      toastMessage.value = msg;
      toastType.value = type;
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastMessage.value = '';
      }, 3200);
    };

    // ================= PRIZE TIERS & AWARD STATE =================
    const savedAwards = localStorage.getItem('gala_awards_config');
    const awards = ref(savedAwards ? JSON.parse(savedAwards) : JSON.parse(JSON.stringify(DEFAULT_AWARDS)));
    const currentAwardId = ref('first'); // Default to 1st Prize
    const isAwardModalOpen = ref(false);
    const activeSettingsTab = ref('tiers'); // 'tiers' | 'ticket'

    watch(awards, (newVal) => {
      localStorage.setItem('gala_awards_config', JSON.stringify(newVal));
    }, { deep: true });

    // ================= VIP GOLDEN TICKET CUSTOMIZATION =================
    const savedTicketConfig = localStorage.getItem('gala_ticket_config');
    const ticketConfig = ref(savedTicketConfig ? JSON.parse(savedTicketConfig) : { ...DEFAULT_TICKET_CONFIG });

    watch(ticketConfig, (newVal) => {
      localStorage.setItem('gala_ticket_config', JSON.stringify(newVal));
    }, { deep: true });

    const resetTicketConfig = () => {
      ticketConfig.value = { ...DEFAULT_TICKET_CONFIG };
      showToast('Reset golden ticket titles to default.', 'info');
    };

    const currentAward = computed(() => {
      return awards.value.find(a => a.id === currentAwardId.value) || awards.value[0] || {
        id: 'custom',
        title: 'Special Award',
        prizeName: 'Mystery Gala Prize',
        quota: 1,
        tierBadge: '★ LUCKY WINNER ★'
      };
    });

    const isAwardFilled = (awardId) => {
      const target = awards.value.find(a => a.id === awardId);
      if (!target) return false;
      return getAwardWinnersCount(awardId) >= target.quota;
    };

    const getAwardWinnersCount = (awardId) => {
      return winnersHistory.value.filter(w => w.awardId === awardId).length;
    };

    const openAwardModal = () => {
      isAwardModalOpen.value = true;
    };

    const closeAwardModal = () => {
      isAwardModalOpen.value = false;
    };

    const selectAward = (id) => {
      currentAwardId.value = id;
      const target = awards.value.find(a => a.id === id);
      if (target) {
        showToast(`Switched to: ${target.title} (${target.prizeName}, Quota: ${target.quota})`, 'info');
      }
    };

    const addNewAward = () => {
      const newId = 'award-' + Date.now();
      awards.value.push({
        id: newId,
        title: `Tier ${awards.value.length + 1}`,
        prizeName: 'Exciting Prize',
        quota: 3,
        tierBadge: '★ SPECIAL AWARD ★'
      });
      currentAwardId.value = newId;
      showToast('Added new prize tier. Customize title and quota on the card.', 'success');
    };

    const removeAward = (id) => {
      if (awards.value.length <= 1) {
        showToast('Please maintain at least one prize tier.', 'warning');
        return;
      }
      const idx = awards.value.findIndex(a => a.id === id);
      if (idx !== -1) {
        awards.value.splice(idx, 1);
        if (currentAwardId.value === id) {
          currentAwardId.value = awards.value[0].id;
        }
        showToast('Prize tier removed.', 'info');
      }
    };

    // ================= BATCH DRAW MULTI-WINNER STATE & QUOTA CONSTRAINTS =================
    const drawCount = ref(1);

    // Remaining quota for currently selected award
    const remainingAwardQuota = computed(() => {
      const won = getAwardWinnersCount(currentAward.value.id);
      return Math.max(0, currentAward.value.quota - won);
    });

    // Maximum allowed draw count for current award tier (strictly <= remaining quota)
    const maxDrawCountAllowed = computed(() => {
      const rem = remainingAwardQuota.value;
      const poolLen = candidatePool.value.length;
      if (rem <= 0) return 1;
      return Math.max(1, Math.min(rem, poolLen));
    });

    // Auto-clamp drawCount whenever current award or remaining quota changes
    watch(maxDrawCountAllowed, (newMax) => {
      if (drawCount.value > newMax) {
        drawCount.value = Math.max(1, newMax);
      }
    }, { immediate: true });

    const setDrawCount = (count) => {
      const maxAllowed = maxDrawCountAllowed.value;
      if (count > maxAllowed) {
        showToast(`Cannot select ${count} winners: [${currentAward.value.title}] only allows up to ${maxAllowed} winner${maxAllowed > 1 ? 's' : ''} (Quota: ${currentAward.value.quota})`, 'warning');
        drawCount.value = maxAllowed;
        return;
      }
      drawCount.value = Math.max(1, count);
    };

    const clampDrawCount = () => {
      const maxAllowed = maxDrawCountAllowed.value;
      if (!drawCount.value || drawCount.value < 1) {
        drawCount.value = 1;
      } else if (drawCount.value > maxAllowed) {
        showToast(`Draw count clamped to [${currentAward.value.title}] maximum allowed: ${maxAllowed}`, 'warning');
        drawCount.value = maxAllowed;
      }
    };

    const setDrawCountToRemainingQuota = () => {
      const rem = remainingAwardQuota.value;
      if (rem <= 0) {
        showToast(`[${currentAward.value.title}] quota is already full (${currentAward.value.quota}/${currentAward.value.quota}).`, 'info');
        drawCount.value = 1;
        return;
      }
      const maxAllowed = Math.min(rem, Math.max(1, candidatePool.value.length));
      drawCount.value = maxAllowed;
      showToast(`Draw count set to remaining quota: ${maxAllowed} winner${maxAllowed > 1 ? 's' : ''}`, 'info');
    };

    const toggleWinnerKeep = (idx) => {
      if (fireworkWinners.value[idx]) {
        fireworkWinners.value[idx].keepInPool = !fireworkWinners.value[idx].keepInPool;
        const w = fireworkWinners.value[idx];
        if (w.keepInPool) {
          showToast(`Will preserve [${w.name}] in candidate pool`, 'info');
        } else {
          showToast(`Will remove [${w.name}] from candidate pool`, 'info');
        }
      }
    };

    // ================= WINNERS HISTORY DRAWER =================
    const isWinnersDrawerOpen = ref(false);

    const openWinnersDrawer = () => {
      isWinnersDrawerOpen.value = true;
    };

    const closeWinnersDrawer = () => {
      isWinnersDrawerOpen.value = false;
    };

    // Excel Export for Winners
    const exportWinnersToExcel = () => {
      if (winnersHistory.value.length === 0) {
        showToast('No winners recorded yet to export.', 'warning');
        return;
      }

      if (!window.XLSX) {
        showToast('Excel engine is still initializing, please try again.', 'warning');
        return;
      }

      try {
        const exportData = winnersHistory.value.map((w, idx) => ({
          'No': winnersHistory.value.length - idx,
          'Prize Tier': w.awardTitle,
          'Prize Name': w.prizeName,
          'Winner Name': w.name,
          'Department': w.department,
          'Attendee ID': w.id,
          'Pass Serial': w.ticketSerial,
          'Draw Time': w.timestamp,
          'Pool Status': w.removedFromPool ? 'Removed from Pool' : 'Kept in Pool'
        }));

        const worksheet = window.XLSX.utils.json_to_sheet(exportData);
        const workbook = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(workbook, worksheet, 'Winners');

        const now = new Date();
        const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
        window.XLSX.writeFile(workbook, `Gala_Lucky_Draw_Winners_${dateStr}.xlsx`);
        showToast('Official winners roster exported to Excel successfully!', 'success');
      } catch (err) {
        console.error('Export Excel Error:', err);
        showToast('Failed to export Excel file. Please try again.', 'warning');
      }
    };

    const copyWinnersText = () => {
      if (winnersHistory.value.length === 0) {
        showToast('No winners recorded yet to copy.', 'warning');
        return;
      }

      const lines = winnersHistory.value.map((w, idx) => {
        return `${winnersHistory.value.length - idx}. [${w.awardTitle} - ${w.prizeName}] ${w.name} (${w.department} · ${w.ticketSerial}) - ${w.timestamp}`;
      });

      const fullText = `=== ANNUAL GALA 2026 OFFICIAL WINNERS ROSTER ===\n` + lines.join('\n');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullText).then(() => {
          showToast('Winners list copied to clipboard successfully!', 'success');
        }).catch(() => {
          showToast('Clipboard access denied, please select and copy manually.', 'warning');
        });
      } else {
        showToast('Clipboard not supported in this browser.', 'warning');
      }
    };

    const clearWinnersHistory = () => {
      if (winnersHistory.value.length === 0) return;
      if (confirm('Are you sure you want to clear all official winners records? This action cannot be undone.')) {
        winnersHistory.value = [];
        showToast('All winners records have been cleared.', 'info');
      }
    };

    const returnWinnerToPool = (wIdx) => {
      const winner = winnersHistory.value[wIdx];
      if (!winner) return;

      if (winner.removedFromPool) {
        const exists = candidatePool.value.some(c => c.name === winner.name && c.id === winner.id);
        if (!exists) {
          candidatePool.value.unshift({
            id: winner.id,
            name: winner.name,
            department: winner.department,
            avatar: winner.avatar || ''
          });
          bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');
        }
      }

      winnersHistory.value.splice(wIdx, 1);
      showToast(`Revoked win for [${winner.name}] and returned to candidate pool!`, 'success');
    };

    let audio = null;
    let fireworkEngine = null;
    let confettiEngine = null;

    const remainingCount = computed(() => candidatePool.value.length);

    // ================= ROSTER & EXCEL IMPORT MANAGER STATE =================
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
      showToast(`Candidate roster updated. Total: ${newPool.length} attendees.`, 'info');
    };

    const syncFromCards = () => {
      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');
    };

    const shuffleRoster = () => {
      const arr = [...candidatePool.value];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      candidatePool.value = arr;
      bulkNamesText.value = arr.map(e => e.name).join('\n');
      showToast('Candidate roster shuffled randomly!', 'success');
    };

    const sortRoster = () => {
      const arr = [...candidatePool.value];
      arr.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
      candidatePool.value = arr;
      bulkNamesText.value = arr.map(e => e.name).join('\n');
      showToast('Candidate roster sorted alphabetically (A-Z)!', 'info');
    };

    const removeCandidateAt = (idx) => {
      if (candidatePool.value.length <= 1) {
        showToast('Please maintain at least 1 candidate in the pool.', 'warning');
        return;
      }
      const removed = candidatePool.value.splice(idx, 1);
      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');
      if (removed.length > 0) {
        showToast(`Removed: ${removed[0].name}`, 'info');
      }
    };

    const clearRoster = () => {
      if (confirm('Are you sure you want to clear the candidate roster? You can import an Excel or CSV file afterwards.')) {
        candidatePool.value = [];
        bulkNamesText.value = '';
        showToast('Candidate roster cleared. Please click [Import Excel / CSV] to load attendees.', 'info');
      }
    };

    // Excel / CSV File Import via Local SheetJS
    const triggerExcelImport = () => {
      const fileInput = document.getElementById('excel-file-input');
      if (fileInput) {
        fileInput.value = '';
        fileInput.click();
      }
    };

    const onExcelSelected = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      if (!window.XLSX) {
        showToast('Excel tool is not ready. Please refresh the page and try again.', 'warning');
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const data = new Uint8Array(evt.target.result);
          const workbook = window.XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const rawRows = window.XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          if (!rawRows || rawRows.length === 0) {
            showToast('No readable rows found in the selected Excel file.', 'warning');
            return;
          }

          // Smart Column Detection
          const firstRowStr = (rawRows[0] || []).map(cell => String(cell || '').trim().toLowerCase());
          const hasHeaderKeywords = firstRowStr.some(s => /name|attendee|member|person|姓名|名字/i.test(s));

          let startIndex = 0;
          let nameCol = 0;
          let deptCol = -1;
          let idCol = -1;

          if (hasHeaderKeywords) {
            startIndex = 1;
            firstRowStr.forEach((col, idx) => {
              if (/name|attendee|member|person|姓名|名字/i.test(col)) nameCol = idx;
              else if (/dept|department|team|division|sector|部门/i.test(col)) deptCol = idx;
              else if (/id|code|ticket|serial|工号|编号/i.test(col)) idCol = idx;
            });
          }

          const importedList = [];
          for (let r = startIndex; r < rawRows.length; r++) {
            const row = rawRows[r];
            if (!row || row.length === 0) continue;
            const nameVal = row[nameCol] !== undefined ? String(row[nameCol]).trim() : '';
            if (!nameVal) continue;

            const deptVal = deptCol >= 0 && row[deptCol] !== undefined ? String(row[deptCol]).trim() : 'Corporate Talent';
            const idVal = idCol >= 0 && row[idCol] !== undefined ? String(row[idCol]).trim() : `EMP-${1000 + importedList.length + 1}`;

            importedList.push({
              id: idVal,
              name: nameVal,
              department: deptVal,
              avatar: ''
            });
          }

          if (importedList.length === 0) {
            showToast('Could not extract valid names from the file. Please check column headers.', 'warning');
            return;
          }

          candidatePool.value = importedList;
          bulkNamesText.value = importedList.map(e => e.name).join('\n');
          showToast(`🎉 Successfully imported ${importedList.length} candidates from Excel!`, 'success');
        } catch (err) {
          console.error('Excel Import Error:', err);
          showToast('Failed to parse Excel file. Please verify file format (.xlsx, .xls, .csv).', 'warning');
        }
      };
      reader.readAsArrayBuffer(file);
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
        e.target.value = '';
        showToast('Custom photo uploaded successfully!', 'success');
      };
      reader.readAsDataURL(file);
    };

    const getInitials = (name) => {
      if (!name) return 'VIP';
      const clean = name.trim();
      if (/^[\u4e00-\u9fa5]+$/.test(clean)) {
        return clean.length >= 2 ? clean.slice(-2) : clean;
      }
      const parts = clean.split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return clean.slice(0, 2).toUpperCase();
    };

    // ================= CELESTIAL FIREWORK STATE & LOGIC =================
    const fireworkState = ref('IDLE'); // 'IDLE' | 'IGNITING' | 'ASCENDING' | 'APEX' | 'BURSTING' | 'REVEALED'
    const fireworkWinners = ref([]);
    const fireworkWinner = computed(() => fireworkWinners.value[0] || null);

    const isFireworkActive = computed(() => {
      return fireworkState.value === 'IGNITING' || fireworkState.value === 'ASCENDING' || fireworkState.value === 'APEX' || fireworkState.value === 'BURSTING';
    });

    const startFireworkLaunch = () => {
      if (isFireworkActive.value) return;

      if (fireworkEngine) {
        fireworkEngine.ensureCanvas();
      }

      if (fireworkState.value === 'REVEALED') {
        confirmAndDrawNext();
        return;
      }

      if (candidatePool.value.length === 0) {
        showToast('The candidate pool is empty! Please import an Excel file or add names.', 'warning');
        return;
      }

      // Check quota status and strictly enforce tier limits
      const remQuota = remainingAwardQuota.value;
      if (remQuota <= 0) {
        showToast(`Cannot launch: [${currentAward.value.title}] quota is already full (${currentAward.value.quota}/${currentAward.value.quota}). Please select another prize tier.`, 'warning');
        return;
      }

      // Determine batch count (strictly clamped to tier remaining quota)
      let count = Math.max(1, Math.min(drawCount.value, remQuota, candidatePool.value.length));
      if (drawCount.value > remQuota) {
        drawCount.value = count;
        showToast(`Draw count clamped to [${currentAward.value.title}] remaining quota (${count} slots)`, 'warning');
      }

      // Pick distinct random winners
      const poolCopy = [...candidatePool.value];
      const picked = [];
      for (let i = 0; i < count; i++) {
        const randIdx = Math.floor(Math.random() * poolCopy.length);
        const item = poolCopy.splice(randIdx, 1)[0];
        picked.push({ ...item, keepInPool: false });
      }
      fireworkWinners.value = picked;

      if (audio) audio.initOnFirstGesture();

      // Phase 1: Fast Quickmatch Fuse Sizzle (0.15s)
      fireworkState.value = 'IGNITING';
      if (audio) audio.playFuseIgnite(0.18);

      setTimeout(() => {
        // Phase 2: High-Velocity Mortar Lift & Soaring Rocket Ascent (2.60s soaring climb)
        fireworkState.value = 'ASCENDING';
        const durationMs = 2600;

        const rim = document.getElementById('mortar-launch-rim');
        const startX = window.innerWidth / 2;
        let startY = window.innerHeight - 110;
        if (rim) {
          const r = rim.getBoundingClientRect();
          startY = r.top + 4;
        }

        const targetX = window.innerWidth / 2;
        const targetY = window.innerHeight * 0.32;

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
              // Phase 3: Apex Suspense (0.15s)
              fireworkState.value = 'APEX';

              setTimeout(() => {
                // Phase 4: Supernova Detonation (1.35s bloom to reveal winners)
                fireworkState.value = 'BURSTING';
                if (audio) audio.playMortarBlast();
                if (fireworkEngine) {
                  // If multi-winner batch, add celebratory background bursts
                  if (count > 1) {
                    setTimeout(() => fireworkEngine.spawnBackgroundBurst(), 220);
                    setTimeout(() => fireworkEngine.spawnBackgroundBurst(), 580);
                    setTimeout(() => fireworkEngine.spawnBackgroundBurst(), 950);
                  }

                  fireworkEngine.createExplosion(
                    apexX, 
                    apexY, 
                    picked[0].name,
                    null,
                    () => {
                      // On Explosion Blooming (~1.35s: Reveal Winners in night sky)
                      fireworkState.value = 'REVEALED';
                      if (audio) audio.playStarlightChime();
                      if (confettiEngine) confettiEngine.burst(count > 1 ? 220 : 160);
                    }
                  );
                }
              }, 150); // 150ms apex suspense pause
            }
          );
        }
      }, 150); // 150ms quickmatch fuse ignition delay
    };

    // ================= WHEEL OF SPIN STYLE ACTIONS (SINGLE & BATCH) =================
    // 1. Confirm & Remove All Winners from Pool
    const confirmAndRemoveWinners = () => {
      if (fireworkWinners.value.length === 0) return;
      const award = currentAward.value;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      fireworkWinners.value.forEach(w => {
        const shouldRemove = !w.keepInPool;
        const serial = `TKT-2026-${w.id ? (w.id.replace(/\D/g, '') || '8820') : '8820'}`;
        winnersHistory.value.unshift({
          name: w.name,
          department: w.department || 'Corporate Talent',
          id: w.id || 'EMP-0000',
          ticketSerial: serial,
          avatar: w.avatar || '',
          awardId: award.id,
          awardTitle: award.title,
          prizeName: award.prizeName,
          timestamp: timeStr,
          removedFromPool: shouldRemove
        });

        if (shouldRemove) {
          const poolIdx = candidatePool.value.findIndex(c => c.id === w.id && c.name === w.name);
          if (poolIdx !== -1) candidatePool.value.splice(poolIdx, 1);
        }
      });

      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');
      showToast(`Confirmed ${fireworkWinners.value.length} winners and removed from candidate pool.`, 'success');

      fireworkState.value = 'IDLE';
      fireworkWinners.value = [];
      if (fireworkEngine) fireworkEngine.clear();
      if (confettiEngine) confettiEngine.clear();
    };

    // 2. Keep All Winners in Pool (allow drawing again)
    const keepWinnersInPool = () => {
      if (fireworkWinners.value.length === 0) return;
      const award = currentAward.value;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      fireworkWinners.value.forEach(w => {
        const serial = `TKT-2026-${w.id ? (w.id.replace(/\D/g, '') || '8820') : '8820'}`;
        winnersHistory.value.unshift({
          name: w.name,
          department: w.department || 'Corporate Talent',
          id: w.id || 'EMP-0000',
          ticketSerial: serial,
          avatar: w.avatar || '',
          awardId: award.id,
          awardTitle: award.title,
          prizeName: award.prizeName,
          timestamp: timeStr,
          removedFromPool: false
        });
      });

      showToast(`Recorded ${fireworkWinners.value.length} winners; preserved in candidate pool.`, 'info');

      fireworkState.value = 'IDLE';
      fireworkWinners.value = [];
      if (fireworkEngine) fireworkEngine.clear();
      if (confettiEngine) confettiEngine.clear();
    };

    // 3. Confirm, Remove & Immediately Draw Next Batch
    const confirmAndDrawNext = () => {
      if (fireworkWinners.value.length === 0) return;
      const award = currentAward.value;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      fireworkWinners.value.forEach(w => {
        const shouldRemove = !w.keepInPool;
        const serial = `TKT-2026-${w.id ? (w.id.replace(/\D/g, '') || '8820') : '8820'}`;
        winnersHistory.value.unshift({
          name: w.name,
          department: w.department || 'Corporate Talent',
          id: w.id || 'EMP-0000',
          ticketSerial: serial,
          avatar: w.avatar || '',
          awardId: award.id,
          awardTitle: award.title,
          prizeName: award.prizeName,
          timestamp: timeStr,
          removedFromPool: shouldRemove
        });

        if (shouldRemove) {
          const poolIdx = candidatePool.value.findIndex(c => c.id === w.id && c.name === w.name);
          if (poolIdx !== -1) candidatePool.value.splice(poolIdx, 1);
        }
      });

      bulkNamesText.value = candidatePool.value.map(e => e.name).join('\n');

      fireworkState.value = 'IDLE';
      fireworkWinners.value = [];
      if (fireworkEngine) fireworkEngine.clear();
      if (confettiEngine) confettiEngine.clear();

      if (candidatePool.value.length === 0) {
        showToast('All candidates drawn! Ticket pool is now empty.', 'warning');
        return;
      }

      // Check quota status
      if (isAwardFilled(currentAward.value.id)) {
        showToast(`[${currentAward.value.title}] quota is now filled!`, 'warning');
      }

      // Fast next draw trigger
      setTimeout(() => {
        startFireworkLaunch();
      }, 260);
    };

    const removeWinnerFromFirework = () => {
      confirmAndRemoveWinners();
    };

    const closeFireworkModal = () => {
      fireworkState.value = 'IDLE';
      fireworkWinners.value = [];
      if (fireworkEngine) fireworkEngine.clear();
      if (confettiEngine) confettiEngine.clear();
    };

    const resetStage = (resetPool = false) => {
      fireworkState.value = 'IDLE';
      fireworkWinners.value = [];
      if (fireworkEngine) fireworkEngine.clear();
      if (confettiEngine) confettiEngine.clear();
    };

    const toggleMute = () => {
      isMuted.value = !isMuted.value;
      if (audio) {
        audio.setMute(isMuted.value);
      }
    };

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          isFullscreen.value = true;
        }).catch(err => {
          console.warn('Fullscreen request:', err);
        });
      } else {
        document.exitFullscreen().then(() => {
          isFullscreen.value = false;
        }).catch(err => {});
      }
    };

    document.addEventListener('fullscreenchange', () => {
      isFullscreen.value = !!document.fullscreenElement;
      if (fireworkEngine) {
        fireworkEngine.resize();
      }
      if (confettiEngine) {
        confettiEngine.resize();
      }
    });

    // Spacebar & Keyboard Shortcuts
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (fireworkState.value === 'IDLE') {
          startFireworkLaunch();
        } else if (fireworkState.value === 'REVEALED') {
          confirmAndDrawNext();
        }
      } else if (e.code === 'KeyM') {
        toggleMute();
      } else if (e.code === 'KeyF') {
        toggleFullscreen();
      } else if (e.code === 'KeyR') {
        resetStage(false);
      }
    };

    onMounted(() => {
      audio = new ProceduralAudioEngine();
      window.__galaAudio = audio;
      fireworkEngine = new CelestialFireworkEngine('firework-canvas', 'firework-trails-canvas');
      fireworkEngine.startLoop();
      confettiEngine = new RoyalGoldConfettiEngine('confetti-canvas');
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
      isMuted,
      isFullscreen,
      remainingCount,
      getInitials,
      toggleMute,
      toggleFullscreen,
      resetStage,

      // Firework
      fireworkState,
      fireworkWinners,
      fireworkWinner,
      isFireworkActive,
      startFireworkLaunch,
      removeWinnerFromFirework,
      closeFireworkModal,

      // Batch Draw
      drawCount,
      remainingAwardQuota,
      maxDrawCountAllowed,
      setDrawCount,
      clampDrawCount,
      setDrawCountToRemainingQuota,
      toggleWinnerKeep,

      // Wheel of Spin Choices
      confirmAndDrawNext,
      confirmAndRemoveWinners,
      keepWinnersInPool,

      // Award Tiers & Ticket Customization
      awards,
      currentAwardId,
      currentAward,
      isAwardFilled,
      getAwardWinnersCount,
      isAwardModalOpen,
      openAwardModal,
      closeAwardModal,
      selectAward,
      addNewAward,
      removeAward,
      activeSettingsTab,
      ticketConfig,
      resetTicketConfig,

      // Winners History
      winnersHistory,
      isWinnersDrawerOpen,
      openWinnersDrawer,
      closeWinnersDrawer,
      exportWinnersToExcel,
      copyWinnersText,
      clearWinnersHistory,
      returnWinnerToPool,

      // Candidate Roster Drawer
      isRosterOpen,
      bulkNamesText,
      candidatePool,
      openRosterDrawer,
      closeRosterDrawer,
      syncBulkNames,
      syncFromCards,
      shuffleRoster,
      sortRoster,
      removeCandidateAt,
      clearRoster,
      triggerExcelImport,
      onExcelSelected,
      triggerPhotoUploadForIndex,
      onPhotoSelected,

      // Toast Notifications
      toastMessage,
      toastType,
      showToast
    };
  }
});

app.mount('#app');
