# Annual Gala Lucky Draw Demo — Technical Architecture

---

### 1. Prototype Flow

```
User Action (Spacebar / Click / Touch Swipe)
   │
   ├──> Mode 1 (Foil Pack Rip):
   │      Vue State (IDLE -> CUTTING -> TORE -> SLIDING -> FLIPPED -> REVEALED)
   │      3D CSS Flip Stage + Web Audio (Rip/Whoosh/Chime) + Confetti Engine
   │
   ├──> Mode 2 (Gala Prize Reel):
   │      Vue State (IDLE -> SPINNING -> DECELERATING -> LOCKED -> REVEALED)
   │      Natural Deceleration (p=3.4) + Row Boundary Detent Clicks + Latch Snap + Fanfare
   │
   ├──> Mode 3 (Ticker Fortune Wheel):
   │      Vue State (IDLE -> SPINNING -> DECELERATING -> LOCKED -> REVEALED)
   │      Continuous Rotation + Soft Plectrum Deflection + Gaussian Landing + Fanfare
   │
   └──> Mode 4 (Celestial Firework Burst):
          Vue State (IDLE -> IGNITING -> ASCENDING -> APEX -> BURSTING -> REVEALED)
          Vertical Parallax Ascent + 0.7s Apex Silence + Sub-Bass Mortar Blast + Brocade Crown Willows + Celestial Reveal
```

---

### 2. File Organization

```
lucky draw/
├── requirements.md       # PRD for all 3 presentation modes
├── architecture.md       # Technical architecture (This file)
├── task.md               # Feature checklist & milestones
├── index.html            # Gala Stage UI & Vue mount
├── style.css             # Luxury Gala Shaders, Reel 3D Cylindrical Viewport, Wheel & Needle CSS
├── app.js                # Vue 3 App, Audio Synthesizer, Confetti Canvas & Physics Engines
├── server.js             # Lightweight Node.js static HTTP server
└── start.bat             # One-click Windows desktop launcher
```

---

### 3. Core Physics & Mechanics

* **Mode 1 (Foil Pack Rip)**:
  - Linear touch/mouse slice path calculation.
  - 3D CSS perspective transform for pack split and card reveal.
* **Mode 2 (Gala Prize Reel)**:
  - Single-axis deceleration ($y(t) = y_{\text{final}} \cdot (1 - (1 - s)^p)$, $p = 3.4$).
  - Zero boundary crawling; clean stop in the center reticle.
* **Mode 3 (Ticker Fortune Wheel)**:
  - Continuous forward spin from current angle ($\Delta \theta = 360^\circ \times N + \delta$).
  - Soft elastic plectrum deflection ($0^\circ \sim 7^\circ$) active only in final 15% contact zone.
  - Gaussian landing distribution ($20\% \sim 80\%$ sector position ratio).
  - Synthetic Web Audio ticking synced with perimeter brass peg crossings.
