/**
 * Screen 0: Welcome Screen Controller
 * Handles persistent device identity, name pre-filling, 2D coach selection, and start flow.
 */
(function() {
  function safeName(raw) {
    return (raw || '').trim().slice(0, 30) || 'friend';
  }

  window.WelcomeScreen = {
    init: async function() {
      const nameInput = document.getElementById('name-input');
      const startBtn = document.getElementById('start-btn');
      const demoBanner = document.getElementById('demo-banner');

      if (window.DB.getBackendType() === 'memory' && demoBanner) {
        demoBanner.classList.remove('hidden');
      }

      // Pre-fill name if previously used on this device
      const savedName = window.Identity.getSavedName();
      if (savedName && nameInput) {
        nameInput.value = savedName;
      }

      // Check existing user profile on this device
      const deviceId = window.Identity.getDeviceId();
      const existingUser = await window.DB.getUser(deviceId);
      if (existingUser && existingUser.name && !nameInput.value) {
        nameInput.value = existingUser.name;
      }

      // Render 2D Coach Selection Grid
      this.renderCoachGrid();

      // Render Mood Picker
      window.MoodPicker.render('mood-before-row', (val) => {
        window.AppState.moodBefore = val;
        this.checkStartEnabled();
      });

      nameInput.addEventListener('input', () => this.checkStartEnabled());
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !startBtn.disabled) startBtn.click();
      });

      this.checkStartEnabled();

      startBtn.addEventListener('click', async () => {
        const rawName = nameInput.value.trim();
        const currentName = safeName(rawName);
        window.AppState.currentName = currentName;
        window.Identity.setSavedName(currentName);

        const currentDeviceId = window.Identity.getDeviceId();
        const clientIp = await window.Identity.getIp();
        const deviceInfo = window.Identity.getDeviceInfo();

        window.AppState.deviceId = currentDeviceId;
        window.AppState.sessionId = Date.now() + '_' + currentDeviceId.slice(0, 12);
        window.AppState.skipped = [];

        let user = await window.DB.getUser(currentDeviceId);
        if (!user) {
          user = {
            deviceId: currentDeviceId,
            name: currentName,
            ip: clientIp,
            sessions: 0,
            firstVisit: Date.now(),
            lastVisit: Date.now(),
            deviceInfo: deviceInfo
          };
        } else {
          user.name = currentName;
          user.ip = clientIp;
          user.lastVisit = Date.now();
        }
        await window.DB.setUser(currentDeviceId, user);

        await window.DB.setLog(window.AppState.sessionId, {
          sessionId: window.AppState.sessionId,
          deviceId: currentDeviceId,
          name: currentName,
          ip: clientIp,
          startedAt: Date.now(),
          moodBefore: window.AppState.moodBefore,
          avatarId: window.AppState.selectedAvatar,
          status: 'started'
        });

        window.SpeechEngine.setAvatar(window.AppState.selectedAvatar);
        window.AppRouter.show('breathing');
        window.BreathingScreen.start();
      });
    },

    renderCoachGrid: function() {
      const grid = document.getElementById('coach-grid');
      if (!grid) return;

      grid.innerHTML = '';
      const avatars = window.APP_CONFIG.avatars;

      Object.values(avatars).forEach(coach => {
        const card = document.createElement('div');
        card.className = 'coach-card' + (coach.id === window.AppState.selectedAvatar ? ' selected' : '');
        card.dataset.coach = coach.id;

        const thumb = document.createElement('div');
        thumb.className = 'avatar-container small';
        window.Avatar2D.render(thumb, coach.id, true);

        const badge = document.createElement('span');
        badge.className = 'coach-badge';
        badge.textContent = coach.badge;

        const nameSpan = document.createElement('span');
        nameSpan.className = 'coach-name';
        nameSpan.textContent = coach.name;

        const roleDesc = document.createElement('span');
        roleDesc.className = 'coach-role-desc';
        roleDesc.textContent = coach.role;

        card.appendChild(thumb);
        card.appendChild(badge);
        card.appendChild(nameSpan);
        card.appendChild(roleDesc);

        card.addEventListener('click', () => {
          grid.querySelectorAll('.coach-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          window.AppState.selectedAvatar = coach.id;
          window.SpeechEngine.setAvatar(coach.id);
          this.updateCoachPreview(coach);
        });

        grid.appendChild(card);
      });

      const initialCoach = avatars[window.AppState.selectedAvatar] || avatars.maya;
      this.updateCoachPreview(initialCoach);
    },


    updateCoachPreview: function(_coach) {
      // preview box removed
    },


    checkStartEnabled: function() {
      const nameInput = document.getElementById('name-input');
      const startBtn = document.getElementById('start-btn');
      if (nameInput && startBtn) {
        startBtn.disabled = !(nameInput.value.trim().length > 0 && window.AppState.moodBefore !== null);
      }
    },

    reset: function() {
      const nameInput = document.getElementById('name-input');
      if (window.AppState.currentName && nameInput) {
        nameInput.value = window.AppState.currentName;
      }
      window.AppState.moodBefore = null;
      window.MoodPicker.reset('mood-before-row');
      this.checkStartEnabled();
    }
  };
})();
