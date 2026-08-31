/**
 * Screen 1: Breathing Exercise Screen Controller
 * Concise spoken cues — coach speaks briefly so the user can breathe in peace.
 */
(function() {
  function capitalize(s) {
    if (!s) return 'Friend';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  window.BreathingScreen = {
    start: function() {
      const avatarStage = document.getElementById('breathing-avatar-stage');
      const avatarContainer = document.getElementById('breathing-avatar-container');
      const coachTag = document.getElementById('breathing-coach-tag');
      const name = window.AppState.currentName;
      const avatarId = window.AppState.selectedAvatar;
      const avatarConfig = window.APP_CONFIG.avatars[avatarId] || window.APP_CONFIG.avatars.maya;

      if (coachTag && avatarConfig) {
        coachTag.textContent = `Coach ${avatarConfig.name}`;
      }

      window.Avatar2D.render(avatarContainer, avatarId);
      window.Avatar2D.setBreathingMode(avatarStage, false);
      window.Avatar2D.setBreathingState(avatarStage, 'idle');

      // Short, warm greeting — single sentence only
      const spokenIntro = avatarId === 'alex'
        ? `Hey ${capitalize(name)}, let's reset together.`
        : avatarId === 'priya'
        ? `Hey ${capitalize(name)}, ready to recharge?`
        : `Hey ${capitalize(name)}, breathe with me.`;

      this.setCaption(`Hey ${capitalize(name)}. Follow along — breathe with me.`);

      window.SpeechEngine.speak(spokenIntro, () => {
        setTimeout(() => this.breathCycle(0, 3), 600);
      });
    },

    setCaption: function(text) {
      const el = document.getElementById('caption-breathing');
      if (el) el.textContent = text;
    },

    breathCycle: function(round, total) {
      const avatarStage = document.getElementById('breathing-avatar-stage');
      const breathLabel = document.getElementById('breath-label');
      const avatarId = window.AppState.selectedAvatar;
      const coachConfig = window.APP_CONFIG.avatars[avatarId] || window.APP_CONFIG.avatars.maya;
      const cadence = coachConfig.breathingCadence || { inhale: 3800, hold: 1800, exhale: 4200 };

      if (round >= total) {
        window.Avatar2D.setBreathingMode(avatarStage, false);
        window.Avatar2D.setBreathingState(avatarStage, 'idle');
        if (breathLabel) breathLabel.innerHTML = '&nbsp;';

        // Short transition cue
        const finishMessage = 'Good. Let\'s move.';
        this.setCaption("Good. Now let's stretch.");

        window.SpeechEngine.speak(finishMessage, () => {
          setTimeout(() => {
            window.AppRouter.show('stretch');
            window.StretchScreen.start();
          }, 350);
        });
        return;
      }

      // 1. Inhale Phase — chime only on round 0, silent on repeat rounds
      window.Avatar2D.setBreathingMode(avatarStage, true);
      window.Avatar2D.setBreathingState(avatarStage, 'inhale');
      if (breathLabel) breathLabel.textContent = 'Breathe in…';
      window.SpeechEngine.playBreathingChime('inhale');

      // Only speak on the very first inhale
      if (round === 0) {
        this.setCaption('In through the nose…');
        window.SpeechEngine.speak('Breathe in.', null);
      } else {
        this.setCaption('In through the nose…');
        // No speech — let the user breathe in silence
      }

      setTimeout(() => {
        // 2. Hold Phase — chime, no speech
        window.Avatar2D.setBreathingState(avatarStage, 'hold');
        if (breathLabel) breathLabel.textContent = 'Hold gently.';
        window.SpeechEngine.playBreathingChime('hold');
        this.setCaption('Hold…');

        setTimeout(() => {
          // 3. Exhale Phase — chime only, one short cue on first exhale
          window.Avatar2D.setBreathingState(avatarStage, 'exhale');
          if (breathLabel) breathLabel.textContent = 'Breathe out…';
          window.SpeechEngine.playBreathingChime('exhale');
          this.setCaption('Out slowly…');

          if (round === 0) {
            window.SpeechEngine.speak('And release.', () => {
              setTimeout(() => this.breathCycle(round + 1, total), 500);
            });
          } else {
            // Exhale in silence — just let the user relax
            setTimeout(() => this.breathCycle(round + 1, total), cadence.exhale + 300);
          }
        }, cadence.hold);
      }, cadence.inhale);
    }
  };
})();
