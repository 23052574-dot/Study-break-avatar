/**
 * App Configuration & Constants
 * Defines coach profiles, distinct vocal settings, and routines.
 */
window.APP_CONFIG = {
  firebase: {
    apiKey: "AIzaSyAmDXrp-EdW2znzlga2FvPDJaJZDOtjnss",
    authDomain: "study-break-avatar.firebaseapp.com",
    projectId: "study-break-avatar",
    storageBucket: "study-break-avatar.firebasestorage.app",
    messagingSenderId: "439333804762",
    appId: "1:439333804762:web:3f1534029c3ccba2cda3e3"
  },
  moods: [
    { val: 1, emoji: '😩', label: 'Exhausted' },
    { val: 2, emoji: '😕', label: 'Tense' },
    { val: 3, emoji: '😐', label: 'Neutral' },
    { val: 4, emoji: '🙂', label: 'Refreshed' },
    { val: 5, emoji: '😄', label: 'Energized' }
  ],
  avatars: {
    maya: {
      id: 'maya',
      name: 'Maya',
      role: 'Mindfulness & Stress Relief',
      badge: 'Calm & Flow',
      color: '#5C7A4E',
      clothingColor: 0x5C7A4E,
      skinColor: 0xF7D0B4,
      hairColor: 0x3D281E,
      hairStyle: 'bun',
      voice: {
        rate: 0.90,
        pitch: 1.05,
        names: ['samantha', 'karen', 'victoria', 'google us english', 'zira', 'serena', 'female']
      },
      breathingCadence: { inhale: 4000, hold: 2000, exhale: 4500 },
      description: 'Slow down, release shoulder tightness, and center your thoughts with gentle breathwork.'
    },
    alex: {
      id: 'alex',
      name: 'Alex',
      role: 'Desk Ergonomics & Posture',
      badge: 'Ergonomic Fix',
      color: '#A9702E',
      clothingColor: 0xA9702E,
      skinColor: 0xF3C9A8,
      hairColor: 0x221B17,
      hairStyle: 'crop',
      voice: {
        rate: 0.97,
        pitch: 0.94,
        names: ['daniel', 'alex', 'david', 'george', 'google uk english male', 'male']
      },
      breathingCadence: { inhale: 3500, hold: 1800, exhale: 3800 },
      description: 'Correct screen slouch, unglue your thoracic spine, and relieve wrist typing fatigue.'
    },
    priya: {
      id: 'priya',
      name: 'Priya',
      role: 'Energy, Focus & Eye Reset',
      badge: 'Cognitive Boost',
      color: '#B5563F',
      clothingColor: 0xB5563F,
      skinColor: 0xD89F77,
      hairColor: 0x1A1412,
      hairStyle: 'ponytail',
      voice: {
        rate: 1.02,
        pitch: 1.08,
        names: ['veena', 'priya', 'moira', 'tessa', 'fiona', 'female', 'google english']
      },
      breathingCadence: { inhale: 3200, hold: 1500, exhale: 3500 },
      description: 'Quick invigorating stretches to boost cerebral circulation and erase digital eye strain.'
    }
  },
  defaultAvatar: 'maya'
};
