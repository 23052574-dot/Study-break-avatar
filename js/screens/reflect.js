/**
 * Screen 3: Reflection & Feedback Screen Controller
 */
(function() {
  window.ReflectScreen = {
    init: function() {
      // Setup Mood Picker for Mood After
      window.MoodPicker.render('mood-after-row', (val) => {
        window.AppState.moodAfter = val;
      });

      // Thumbs buttons
      document.querySelectorAll('#thumbs-row .thumb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('#thumbs-row .thumb-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          window.AppState.thumbsVal = btn.dataset.val;
        });
      });

      // Finish Button
      document.getElementById('reflect-continue-btn').addEventListener('click', async () => {
        const feedbackText = (document.getElementById('feedback-text').value || '').trim().slice(0, 200);
        const deviceId = window.AppState.deviceId || window.Identity.getDeviceId();
        const clientIp = window.Identity.getCachedIp();

        await window.DB.setLog(window.AppState.sessionId, {
          sessionId: window.AppState.sessionId,
          deviceId: deviceId,
          name: window.AppState.currentName,
          ip: clientIp,
          status: 'completed',
          completedAt: Date.now(),
          moodBefore: window.AppState.moodBefore,
          moodAfter: window.AppState.moodAfter,
          thumbs: window.AppState.thumbsVal,
          feedbackText: feedbackText,
          skipped: window.AppState.skipped,
          avatarId: window.AppState.selectedAvatar
        });

        window.AppRouter.show('closing');
        await window.ClosingScreen.start();
      });
    },

    start: function() {
      window.AppState.moodAfter = null;
      window.AppState.thumbsVal = null;
      window.MoodPicker.reset('mood-after-row');
      document.querySelectorAll('#thumbs-row .thumb-btn').forEach(b => b.classList.remove('selected'));
      document.getElementById('feedback-text').value = '';

      window.SpeechEngine.speak('Last step. How do you feel now compared to when you started?');
    }
  };
})();
