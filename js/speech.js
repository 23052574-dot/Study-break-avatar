/**
 * Speech Synthesis & Ambient Web Audio Engine
 * Supports coach-specific voice profiles, 2D lip-sync coordination, and synthesized meditation chimes.
 */
(function() {
  let soundOn = true;
  let voices = [];
  let currentAvatarId = 'maya';
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function loadVoices() {
    voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  }

  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  function pickVoiceForAvatar(avatarId) {
    if (!voices || voices.length === 0) loadVoices();
    const config = window.APP_CONFIG && window.APP_CONFIG.avatars[avatarId || currentAvatarId];
    const preferredNames = config && config.voice ? config.voice.names : ['female', 'samantha'];

    // 1. Check preferred voice names
    for (const name of preferredNames) {
      const found = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()) || v.lang.toLowerCase().includes(name.toLowerCase()));
      if (found) return found;
    }

    // 2. Gender / Tone fallback
    if (avatarId === 'alex') {
      const maleVoice = voices.find(v => /male|david|george|alex|daniel/i.test(v.name) && /en/i.test(v.lang));
      if (maleVoice) return maleVoice;
    } else {
      const femaleVoice = voices.find(v => /female|samantha|zira|karen|victoria/i.test(v.name) && /en/i.test(v.lang));
      if (femaleVoice) return femaleVoice;
    }

    // 3. Any English voice
    return voices.find(v => /en/i.test(v.lang)) || voices[0] || null;
  }

  function updateSpeakingUI(isSpeaking) {
    document.querySelectorAll('.waveform').forEach(w => w.classList.toggle('speaking', isSpeaking));
    if (window.Avatar2D && window.Avatar2D.setSpeaking) {
      window.Avatar2D.setSpeaking(isSpeaking);
    }
  }

  window.SpeechEngine = {
    isSoundOn: function() {
      return soundOn;
    },

    toggleSound: function() {
      soundOn = !soundOn;
      if (!soundOn && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        updateSpeakingUI(false);
      }
      return soundOn;
    },

    setAvatar: function(avatarId) {
      currentAvatarId = avatarId || 'maya';
    },

    cancel: function() {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      updateSpeakingUI(false);
    },

    speak: function(text, onDone) {
      if (!('speechSynthesis' in window) || !soundOn) {
        if (onDone) {
          setTimeout(onDone, Math.max(1400, (text || '').length * 45));
        }
        return;
      }

      window.speechSynthesis.cancel();
      updateSpeakingUI(false);

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = pickVoiceForAvatar(currentAvatarId);
      if (voice) utterance.voice = voice;

      const coachConfig = window.APP_CONFIG && window.APP_CONFIG.avatars[currentAvatarId];
      utterance.rate = (coachConfig && coachConfig.voice && coachConfig.voice.rate) || 0.95;
      utterance.pitch = (coachConfig && coachConfig.voice && coachConfig.voice.pitch) || 1.0;

      utterance.onstart = () => updateSpeakingUI(true);

      const handleDone = () => {
        updateSpeakingUI(false);
        if (onDone) onDone();
      };

      utterance.onend = handleDone;
      utterance.onerror = handleDone;

      window.speechSynthesis.speak(utterance);
    },

    /**
     * Procedural Tibetan Singing Bowl & Meditation Chimes (Web Audio API)
     */
    playBreathingChime: function(type) {
      if (!soundOn) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const baseFreq = type === 'inhale' ? 261.63 : type === 'hold' ? 329.63 : 220.0; // C4, E4, A3

        // Fundamental oscillator
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(baseFreq, now);

        // Harmonic overtone for singing bowl resonance
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(baseFreq * 2.76, now);

        gain1.gain.setValueAtTime(0.001, now);
        gain1.gain.exponentialRampToValueAtTime(0.16, now + 0.12);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        gain2.gain.setValueAtTime(0.001, now);
        gain2.gain.exponentialRampToValueAtTime(0.06, now + 0.08);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(ctx.destination);
        gain2.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 3.3);
        osc2.stop(now + 2.5);
      } catch (e) {
        console.warn('Audio chime synthesis skipped', e);
      }
    },

    playCompletionChime: function() {
      if (!soundOn) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const chord = [523.25, 659.25, 783.99]; // C5, E5, G5

        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0.001, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.08 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 2.0);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 2.1);
        });
      } catch (e) {
        console.warn('Completion chime error', e);
      }
    }
  };
})();
