/**
 * Stats View & Analytics Dashboard Component
 * Computes authentic metrics based on unique device IDs and IP telemetry.
 */
(function() {
  function capitalize(s) {
    if (!s) return 'Friend';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  window.StatsView = {
    render: async function() {
      const loadingEl = document.getElementById('stats-loading');
      const contentEl = document.getElementById('stats-content');

      if (loadingEl) loadingEl.classList.remove('hidden');
      if (contentEl) contentEl.classList.add('hidden');

      const users = await window.DB.listUsers();
      const logs = await window.DB.listLogs();

      // Deduplicate unique devices & IPs
      const uniqueDevices = new Set();
      const uniqueIps = new Set();

      users.forEach(u => {
        if (u.deviceId) uniqueDevices.add(u.deviceId);
        if (u.ip && u.ip !== 'unknown') uniqueIps.add(u.ip);
      });

      logs.forEach(l => {
        if (l.deviceId) uniqueDevices.add(l.deviceId);
        if (l.ip && l.ip !== 'unknown') uniqueIps.add(l.ip);
      });

      const participants = Math.max(uniqueDevices.size, users.length);
      const completedLogs = logs.filter(l => l.status === 'completed');
      const completionRate = logs.length > 0 ? Math.round((completedLogs.length / logs.length) * 100) : 0;

      // Returning users by device session count or log frequency per device
      const returningDevices = users.filter(u => (u.sessions || 0) > 1).length;
      const returnRate = participants > 0 ? Math.round((returningDevices / participants) * 100) : 0;

      const thumbsAnswered = completedLogs.filter(l => l.thumbs === 'up' || l.thumbs === 'down');
      const thumbsUp = thumbsAnswered.filter(l => l.thumbs === 'up').length;
      const thumbsRate = thumbsAnswered.length > 0 ? Math.round((thumbsUp / thumbsAnswered.length) * 100) : 0;

      const moodPairs = completedLogs.filter(l => typeof l.moodBefore === 'number' && typeof l.moodAfter === 'number');
      const avgDelta = moodPairs.length > 0
        ? (moodPairs.reduce((sum, l) => sum + (l.moodAfter - l.moodBefore), 0) / moodPairs.length)
        : 0;

      document.getElementById('s-participants').textContent = participants;
      document.getElementById('s-completion').textContent = completionRate + '%';
      document.getElementById('s-returning').textContent = returnRate + '%';
      document.getElementById('s-thumbs').textContent = thumbsRate + '%';
      document.getElementById('s-mood-delta').textContent = (avgDelta >= 0 ? '+' : '') + avgDelta.toFixed(1);

      const feedbackList = document.getElementById('feedback-list');
      feedbackList.innerHTML = '';

      const withFeedback = completedLogs
        .filter(l => l.feedbackText && l.feedbackText.length > 0)
        .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))
        .slice(0, 8);

      if (withFeedback.length === 0) {
        feedbackList.innerHTML = '<div class="feedback-item">No written feedback yet. Complete a break to leave thoughts!</div>';
      } else {
        withFeedback.forEach(l => {
          const div = document.createElement('div');
          div.className = 'feedback-item';
          div.textContent = '"' + l.feedbackText + '"';

          const who = document.createElement('span');
          who.className = 'who';
          const coachLabel = l.avatarId ? ` (guided by ${capitalize(l.avatarId)})` : '';
          who.textContent = `— ${capitalize(l.name)}${coachLabel}${l.thumbs === 'up' ? ' · 👍' : l.thumbs === 'down' ? ' · 👎' : ''}`;

          div.appendChild(who);
          feedbackList.appendChild(div);
        });
      }

      const backendType = window.DB.getBackendType();
      document.getElementById('backend-tag').textContent =
        'Data source: ' + (
          backendType === 'firebase'
            ? `Firebase Firestore (device-fingerprinted across ${uniqueIps.size || 1} IP subnets)`
            : backendType === 'claude'
            ? 'Claude preview storage'
            : 'Local storage / demo mode'
        );

      if (loadingEl) loadingEl.classList.add('hidden');
      if (contentEl) contentEl.classList.remove('hidden');
    }
  };
})();
