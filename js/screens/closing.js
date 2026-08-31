/**
 * Screen 4: Closing & Streak Screen Controller
 * Concise closing message — one short spoken sentence only.
 */
(function() {
  function capitalize(s) {
    if (!s) return 'Friend';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  window.ClosingScreen = {
    init: function() {
      // Share button
      document.getElementById('share-btn').addEventListener('click', () => {
        const url = window.location.href.split('?')[0];
        navigator.clipboard.writeText(url).then(() => {
          const btn = document.getElementById('share-btn');
          const original = btn.textContent;
          btn.textContent = '✓ Link copied to clipboard!';
          setTimeout(() => btn.textContent = original, 1800);
        }).catch(() => alert(url));
      });

      // Restart link
      document.getElementById('restart-link').addEventListener('click', (e) => {
        e.preventDefault();
        window.SpeechEngine.cancel();
        window.WelcomeScreen.reset();
        window.AppRouter.show('welcome');
      });
    },

    start: async function() {
      const name = window.AppState.currentName;
      const avatarId = window.AppState.selectedAvatar;
      const deviceId = window.AppState.deviceId || window.Identity.getDeviceId();
      const avatarContainer = document.getElementById('closing-avatar-container');

      window.Avatar2D.render(avatarContainer, avatarId);
      window.SpeechEngine.playCompletionChime();

      // Update user streak on device
      let user = await window.DB.getUser(deviceId);
      if (!user) {
        user = {
          deviceId: deviceId,
          name: name,
          ip: window.Identity.getCachedIp(),
          sessions: 0,
          firstVisit: Date.now(),
          lastVisit: Date.now(),
          deviceInfo: window.Identity.getDeviceInfo()
        };
      }
      user.sessions = (user.sessions || 0) + 1;
      user.lastVisit = Date.now();
      await window.DB.setUser(deviceId, user);

      // Local storage streak backup
      window.Identity.incrementLocalStreak();

      document.getElementById('stat-streak').textContent = user.sessions;
      document.getElementById('stat-status').textContent = user.sessions > 1 ? 'Returning' : 'New';

      const headline = document.getElementById('closing-headline');
      const sub = document.getElementById('closing-sub');

      let moodLine = '';
      if (window.AppState.moodBefore !== null && window.AppState.moodAfter !== null) {
        if (window.AppState.moodAfter > window.AppState.moodBefore) {
          moodLine = ' Your mood lifted — great work.';
        } else if (window.AppState.moodAfter === window.AppState.moodBefore) {
          moodLine = ' Steady and centered.';
        }
      }

      if (user.sessions > 1) {
        headline.textContent = `Welcome back, ${capitalize(name)}!`;
        sub.textContent = `${user.sessions} resets logged.${moodLine} Ready to focus.`;
        // Single short spoken line
        window.SpeechEngine.speak(`Nice work, ${capitalize(name)}. You're ready.`);
      } else {
        headline.textContent = `Great reset, ${capitalize(name)}!`;
        sub.textContent = `You'll focus with clearer precision now.${moodLine} Come back whenever you need a recharge.`;
        // Single short spoken line
        window.SpeechEngine.speak(`Nice work. Go get it, ${capitalize(name)}.`);
      }
    }
  };
})();
