# Annual Gala Lucky Draw Demo PRD (Management Review Edition)

---

## 1. Objective
Create an interactive visual showcase demo for management review supporting **three distinct presentation modes**:
* **Visual style & stage presence**: Luxury Gala aesthetics (Deep Navy, Imperial Gold, 3D lighting, crisp typography).
* **High suspense & excitement flow**: Authentic physics, audio anticipation, and dramatic reveals.
* **Winner reveal & "WOW" factor**: Indisputable clarity, 3D flip card, mechanical reel, and ticker fortune wheel.
* **100% English presentation**: Suitable for executive and multi-regional corporate galas.

---

## 2. Supported Presentation Modes

### 🎴 Mode 1: Foil Pack Rip (Pokémon TCG Pocket Style)
* **Concept**: Sealed Booster Pack with Laser Incision.
* **Interaction**: Swipe across the top guide line from left to right or press `Space` to auto-cut.
* **Animation**: Sparks sizzle, cap splits, card slides out and flips 180° in 3D perspective to reveal the SSR winner with holographic sheen and golden confetti.

### 🎰 Mode 2: Gala Prize Reel (Mechanical Slot Reel)
* **Concept**: Single-axis large-typography mechanical reel with **pure, natural physical deceleration**.
* **Interaction**: Press `Space` or click lever to spin.
* **Animation**: 
  - High-speed sprint ($0\text{s} \sim 3.0\text{s}$) with rapid mechanical detent clicks.
  - Smooth monotonic power deceleration ($3.0\text{s} \sim 6.5\text{s}$) across all candidates.
  - Direct, decisive arrival on winner with mechanical latch snap + celebratory fanfare. Zero artificial false-stop teasing.

### 🎡 Mode 3: Ticker Fortune Wheel (Plectrum Brass Wheel)
* **Concept**: Gala circular fortune wheel with **soft flexible spring plectrum and organic Gaussian landing distribution**.
* **Interaction**: Press `Space` or click center golden hub.
* **Animation**:
  - Variable human spin momentum (5 to 7 full revolutions, $5.8\text{s} \sim 7.6\text{s}$).
  - Slender soft plectrum needle (12 o'clock) with gentle $0^\circ\sim7^\circ$ deflection and crisp, low-drag acoustic ticking.
  - Authentic Gaussian landing distribution ($20\% \sim 80\%$ within winner sector), avoiding peg dead zones while breaking robotic center predictability.
  - Natural resting contact + fanfare and confetti burst.

### 🎆 Mode 4: Celestial Firework Burst (盛典烟花天幕 · 马来西亚节庆高定版)
* **Concept**: Grand pyrotechnic fireworks show with physical camera ascent, apex suspense pause, and supernova Brocade Crown explosion.
* **Interaction**: Press `Space` or click the circular golden `[IGNITE & LAUNCH]` button.
* **Animation & Cinematic Flow**:
  - **Phase 1: Ignition (0.6s)**: Powder fuse spark sizzling with Web Audio bandpass noise.
  - **Phase 2: Rocket Ascent (2.0s)**: Rocket screams towards the stratosphere, trailing flame sparks while the starry night sky rushes downward with vertical motion blur.
  - **Phase 3: Apex Suspense (0.7s)**: Rocket reaches apex, ascent audio completely cuts into absolute zero-G dead silence; a single white-gold spark pulsates in deep space.
  - **Phase 4: Supernova Detonation (1.2s)**: Deep sub-bass mortar explosion shockwave + 380+ incandescent Brocade Crown sparks cascading downward as golden willows under gravity.
  - **Phase 5: Celestial Winner Reveal**: Center starlight halo condenses into the winner's circular photo portrait, name, department, and prize badge, with celebratory starlight chimes and confetti.

---

## 3. Scope & Features
1. **Interactive Mode Switcher**: Header tabs to seamlessly switch between all 4 modes (Foil Pack, Prize Reel, Fortune Wheel, Firework Burst).
2. **Audio Synthesis**: Zero external audio dependencies; Web Audio API produces realistic foil tear, detent clicks, plectrum ticks, latch snaps, fuse hiss, rocket ascent screamers, mortar bass booms, and fanfares.
3. **Roster & Photo Manager**: Wheel of Names bulk paste textarea, Shuffle, Sort A-Z, and custom employee photo uploader.
4. **Audio Controls**: Mute toggle (`M`), reset shortcut (`R`), and candidate pool counter.
5. **One-Click Launcher**: Double-click `start.bat` on Windows desktop to launch and open `http://localhost:3000`.
