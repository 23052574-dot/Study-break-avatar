/**
 * Unique Device Identity & Network Telemetry Engine
 * Provides persistent cryptographic device UUID, browser fingerprinting, and IP address tracking.
 */
(function() {
  const DEVICE_STORAGE_KEY = 'study_break_device_id_v2';
  const NAME_STORAGE_KEY = 'study_break_last_name_v2';
  const SESSIONS_STORAGE_KEY = 'study_break_local_streak_v2';

  let cachedDeviceId = null;
  let cachedIp = 'unknown';
  let isIpFetched = false;

  // Simple string hash for browser fingerprinting
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }

  // Generate a hardware/browser canvas fingerprint
  function generateCanvasFingerprint() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 160;
      canvas.height = 30;
      const ctx = canvas.getContext('2d');
      if (!ctx) return 'nocanvas';
      ctx.textBaseline = 'top';
      ctx.font = "14px 'Arial'";
      ctx.fillStyle = '#f60';
      ctx.fillRect(10, 5, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('StudyBreak,2026', 2, 8);
      return hashString(canvas.toDataURL());
    } catch (e) {
      return 'nofp';
    }
  }

  // Generate a high-entropy persistent device UUID
  function getOrCreateDeviceId() {
    if (cachedDeviceId) return cachedDeviceId;

    try {
      const stored = localStorage.getItem(DEVICE_STORAGE_KEY);
      if (stored && stored.length > 8) {
        cachedDeviceId = stored;
        return cachedDeviceId;
      }
    } catch (e) {
      // localStorage may be restricted in private/sandboxed iframe
    }

    // Build unique hardware + random fingerprint
    const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'tz';
    const lang = navigator.language || 'en';
    const fpHash = generateCanvasFingerprint();
    const randomHex = Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map(b => b.toString(16).padStart(2, '0')).join('');

    const newId = `dev_${fpHash}_${hashString(screenInfo + tz + lang)}_${randomHex}`;
    cachedDeviceId = newId;

    try {
      localStorage.setItem(DEVICE_STORAGE_KEY, newId);
    } catch (e) {}

    return newId;
  }

  // Fetch Public IP asynchronously with graceful timeout
  async function fetchClientIp() {
    if (isIpFetched) return cachedIp;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2200);

      const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.ip) {
          cachedIp = data.ip;
          isIpFetched = true;
          return cachedIp;
        }
      }
    } catch (e) {
      // Offline, blocked, or timeout - graceful fallback
    }

    // Fallback: device subnet hash identifier
    cachedIp = `local_${hashString(navigator.userAgent + window.screen.width)}`;
    isIpFetched = true;
    return cachedIp;
  }

  // Trigger early IP lookup in the background
  fetchClientIp();

  window.Identity = {
    getDeviceId: function() {
      return getOrCreateDeviceId();
    },

    getIp: async function() {
      return await fetchClientIp();
    },

    getCachedIp: function() {
      return cachedIp;
    },

    getDeviceInfo: function() {
      return {
        screen: `${window.screen.width}x${window.screen.height}`,
        platform: navigator.platform || 'unknown',
        userAgent: navigator.userAgent,
        language: navigator.language || 'en',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown'
      };
    },

    getSavedName: function() {
      try {
        return localStorage.getItem(NAME_STORAGE_KEY) || '';
      } catch (e) {
        return '';
      }
    },

    setSavedName: function(name) {
      try {
        if (name) localStorage.setItem(NAME_STORAGE_KEY, name);
      } catch (e) {}
    },

    getLocalStreak: function() {
      try {
        return parseInt(localStorage.getItem(SESSIONS_STORAGE_KEY) || '0', 10);
      } catch (e) {
        return 0;
      }
    },

    incrementLocalStreak: function() {
      try {
        const current = this.getLocalStreak() + 1;
        localStorage.setItem(SESSIONS_STORAGE_KEY, current.toString());
        return current;
      } catch (e) {
        return 1;
      }
    }
  };
})();
