/**
 * Screen 2: Stretch Routine Screen Controller
 * Shows coach-specific animated SVG exercise figures.
 * Coach speaks only a brief cue (the s.cue field) — not the full description — to minimize chatter.
 */
(function() {
  let stretchTimerHandle = null;

  window.StretchScreen = {
    start: function() {
      const coachTag = document.getElementById('stretch-coach-tag');
      const avatarId = window.AppState.selectedAvatar;
      const avatarConfig = window.APP_CONFIG.avatars[avatarId];

      if (coachTag && avatarConfig) {
        coachTag.textContent = `Coach ${avatarConfig.name}`;
      }

      this.currentRoutine = window.getRoutineForCoach(avatarId);
      this.renderDots(-1);
      this.doStretch(0);
    },

    renderDots: function(activeIdx) {
      const wrap = document.getElementById('stretch-dots');
      if (!wrap) return;

      wrap.innerHTML = '';
      const stretches = this.currentRoutine || window.STRETCHES;

      stretches.forEach((s, i) => {
        const d = document.createElement('div');
        d.className = 'dot' + (i === activeIdx ? ' active' : i < activeIdx ? ' done' : '');
        wrap.appendChild(d);
      });
    },

    setCaption: function(text) {
      const el = document.getElementById('caption-stretch');
      if (el) el.textContent = text;
    },

    doStretch: function(idx) {
      const stretches = this.currentRoutine || window.STRETCHES;
      if (idx >= stretches.length) {
        window.SpeechEngine.playCompletionChime();
        window.AppRouter.show('reflect');
        window.ReflectScreen.start();
        return;
      }

      const s = stretches[idx];
      this.renderDots(idx);

      // Render animated SVG figure
      const figureBox = document.getElementById('stretch-figure-box');
      if (figureBox && s.svg) {
        figureBox.innerHTML = s.svg;
      }

      const focusBadge = document.getElementById('stretch-focus-badge');
      if (focusBadge) {
        focusBadge.textContent = s.focus || s.title;
      }

      // Show full descriptive text in the caption but only SPEAK the short cue
      this.setCaption(s.text);
      window.SpeechEngine.speak(s.cue || s.text);

      let remaining = s.seconds;
      const timerEl = document.getElementById('stretch-timer');
      if (timerEl) timerEl.textContent = remaining + 's remaining';

      if (stretchTimerHandle) clearInterval(stretchTimerHandle);
      stretchTimerHandle = setInterval(() => {
        remaining -= 1;
        if (timerEl) timerEl.textContent = Math.max(remaining, 0) + 's remaining';

        if (remaining <= 0) {
          clearInterval(stretchTimerHandle);
          window.SpeechEngine.playCompletionChime();
          this.doStretch(idx + 1);
        }
      }, 1000);

      const skipBtn = document.getElementById('skip-btn');
      if (skipBtn) {
        skipBtn.onclick = () => {
          window.AppState.skipped.push(s.id);
          if (stretchTimerHandle) clearInterval(stretchTimerHandle);
          this.doStretch(idx + 1);
        };
      }
    },

    cancelTimer: function() {
      if (stretchTimerHandle) {
        clearInterval(stretchTimerHandle);
        stretchTimerHandle = null;
      }
    }
  };
})();
