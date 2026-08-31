/**
 * Mood Picker Component
 * Builds emoji-based mood selection rows and manages selection state.
 */
(function() {
  window.MoodPicker = {
    render: function(containerId, onSelect) {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = '';
      const moods = (window.APP_CONFIG && window.APP_CONFIG.moods) || [
        { val: 1, emoji: '😩' },
        { val: 2, emoji: '😕' },
        { val: 3, emoji: '😐' },
        { val: 4, emoji: '🙂' },
        { val: 5, emoji: '😄' }
      ];

      moods.forEach(m => {
        const btn = document.createElement('button');
        btn.className = 'mood-btn';
        btn.type = 'button';
        btn.title = m.label || ('Mood ' + m.val);
        btn.textContent = m.emoji;

        btn.addEventListener('click', () => {
          container.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          if (onSelect) onSelect(m.val);
        });

        container.appendChild(btn);
      });
    },

    reset: function(containerId) {
      const container = document.getElementById(containerId);
      if (container) {
        container.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
      }
    }
  };
})();
