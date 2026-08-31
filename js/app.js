/**
 * Application Entry Point, State Store & Screen Router
 */
(function() {
  // Global State Store
  window.AppState = {
    currentName: null,
    sessionId: null,
    selectedAvatar: 'maya',
    moodBefore: null,
    moodAfter: null,
    thumbsVal: null,
    skipped: []
  };

  const SCREENS = ['welcome', 'breathing', 'stretch', 'reflect', 'closing', 'stats'];

  window.AppRouter = {
    show: function(screenName) {
      const current = SCREENS.find(s => {
        const el = document.getElementById('screen-' + s);
        return el && !el.classList.contains('hidden');
      });

      const target = document.getElementById('screen-' + screenName);
      if (!target) return;

      const reveal = () => {
        SCREENS.forEach(s => {
          const el = document.getElementById('screen-' + s);
          if (el) el.classList.toggle('hidden', s !== screenName);
        });
        target.classList.remove('fading');
        window.ProgressRail.update(screenName);
      };

      if (current && current !== screenName) {
        const currentEl = document.getElementById('screen-' + current);
        currentEl.classList.add('fading');
        setTimeout(reveal, 160);
      } else {
        reveal();
      }
    }
  };

  function wireMuteButtons() {
    document.querySelectorAll('.mute-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const soundOn = window.SpeechEngine.toggleSound();
        document.querySelectorAll('.mute-toggle').forEach(b => {
          b.textContent = soundOn ? '🔊 Sound on' : '🔇 Sound off';
        });
      });
    });
  }

  function initApp() {
    // Initialize components and screens
    wireMuteButtons();
    window.WelcomeScreen.init();
    window.ReflectScreen.init();
    window.ClosingScreen.init();

    // Stats back navigation
    const statsBackLink = document.getElementById('stats-back-link');
    if (statsBackLink) {
      statsBackLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.AppRouter.show('welcome');
      });
    }

    // Check query params for deep linking (e.g., stats view)
    const params = new URLSearchParams(window.location.search);
    if (params.get('stats') !== null) {
      window.AppRouter.show('stats');
      window.StatsView.render();
    } else {
      window.AppRouter.show('welcome');
      const nameInput = document.getElementById('name-input');
      if (nameInput) nameInput.focus();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
