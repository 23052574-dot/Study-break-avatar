# Tools used — Study-Break Reset

**Product & Build Assistant:** Claude / AI Coding Assistant — used to scope user problems, design the coach-specialized product flows, engineer the realistic 2D character rendering system, and implement the persistent device/IP identity tracking engine.

**Realistic 2D Animated Avatar & Kinetics Engine:**
- **High-Fidelity SVG Character Engine (`js/avatar2d.js` & `css/avatar2d.css`):** Custom realistic vector character illustrations for **Coach Maya**, **Coach Alex**, and **Coach Priya** with multi-layer radial skin gradients, anatomical contours, realistic facial shading, and styled athletic apparel.
- **Realistic Eye Blinking & Meditative States:** Automated randomized eyelid blinking cycles and serene closed-eye state during breathing guidance.
- **Voice-Synced Mouth Movement:** Real-time lip and jaw articulation synced to the Web Speech API lifecycle.
- **Organic Torso Breathing Kinetics:** Dual-layer ribcage and clavicle expansion on Inhale, gentle suspension on Hold, and relaxing descent on Exhale with ambient halo glow.
- **2D Animated Stretch Figures (`js/stretches.js`):** 12 customized exercise illustrations across all 3 coaches with animated kinetic motion paths.

**Persistent Device & IP Identity System (`js/identity.js`):**
- **High-Entropy Device ID (`deviceId`):** Cryptographic UUID with canvas and hardware fingerprint fallback persisted across browser sessions in `localStorage`.
- **IP Address Telemetry:** Async client IP lookup via `api.ipify.org` with local subnet hashing fallback.
- **Accurate Returning User Tracking:** Prevents name collision; preserves user streak counts accurately even if the user changes or enters different nicknames.
- **Metrics Deduplication:** Computes authentic unique participant counts and genuine repeat-usage percentages on the analytics dashboard.

**Coach-Specialized Routines & Voice Profiles:**
- **Coach Maya (Mindfulness & Stress Relief):** Soft meditative cadence (0.90x rate, 1.05 pitch) with 4 mindfulness & neck/spine decompression stretches.
- **Coach Alex (Desk Ergonomics & Posture):** Confident ergonomic coach tone (0.97x rate, 0.94 pitch) with 4 posture & carpal tunnel relief stretches.
- **Coach Priya (Energy, Focus & Eye Strain):** Uplifting cadence (1.02x rate, 1.08 pitch) with 4 eye-strain acupressure & brain-oxygenation exercises.

**Procedural Web Audio Engine (`js/speech.js`):**
- **Tibetan Singing Bowl Chimes:** Synthesized harmonic resonance on breathing phase transitions.
- **Crystal Bell Chords:** Synthesized triad on exercise completions.

**Backend / Data Storage:** Firebase Firestore (free tier) indexed by `deviceId`, with in-memory and local storage fallback.
**Hosting:** Zero-build static HTML/CSS/JS deployable via Netlify Drop or GitHub Pages.
**Fonts:** Google Fonts (Spectral, IBM Plex Sans).
