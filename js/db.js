/**
 * Data Storage & Persistence Adapter
 * Supports Firebase Firestore, Claude preview storage, and In-Memory fallback.
 * Indexes users by unique persistent Device ID and captures IP & telemetry for genuine returning-user metrics.
 */
(function() {
  let backend = 'memory';
  let db = null;
  const memoryDB = { users: {}, logs: {} };

  function initBackend() {
    try {
      const fbConfig = window.APP_CONFIG && window.APP_CONFIG.firebase;
      if (fbConfig && fbConfig.apiKey && fbConfig.apiKey !== 'YOUR_API_KEY' && window.firebase) {
        firebase.initializeApp(fbConfig);
        db = firebase.firestore();
        backend = 'firebase';
        return;
      }
    } catch (e) {
      console.warn('Firebase init fallback to memory/storage.', e);
    }

    if (typeof window.storage !== 'undefined') {
      backend = 'claude';
      return;
    }
    backend = 'memory';
  }

  initBackend();

  window.DB = {
    getBackendType: function() {
      return backend;
    },

    getUser: async function(deviceId) {
      try {
        if (!deviceId) return null;
        if (backend === 'firebase') {
          const doc = await db.collection('users').doc(deviceId).get();
          return doc.exists ? doc.data() : null;
        } else if (backend === 'claude') {
          const r = await window.storage.get('user:' + deviceId, true);
          return r ? JSON.parse(r.value) : null;
        } else {
          return memoryDB.users[deviceId] || null;
        }
      } catch (e) {
        console.error('DB.getUser failed', e);
        return null;
      }
    },

    setUser: async function(deviceId, data) {
      try {
        if (!deviceId) return;
        if (backend === 'firebase') {
          await db.collection('users').doc(deviceId).set(data, { merge: true });
        } else if (backend === 'claude') {
          await window.storage.set('user:' + deviceId, JSON.stringify(data), true);
        } else {
          memoryDB.users[deviceId] = Object.assign({}, memoryDB.users[deviceId] || {}, data);
        }
      } catch (e) {
        console.error('DB.setUser failed', e);
      }
    },

    listUsers: async function() {
      try {
        if (backend === 'firebase') {
          const snap = await db.collection('users').get();
          return snap.docs.map(d => d.data());
        } else if (backend === 'claude') {
          const list = await window.storage.list('user:', true);
          if (!list || !list.keys) return [];
          const out = [];
          for (const k of list.keys) {
            try {
              const r = await window.storage.get(k, true);
              if (r) out.push(JSON.parse(r.value));
            } catch (err) {}
          }
          return out;
        } else {
          return Object.values(memoryDB.users);
        }
      } catch (e) {
        console.error('DB.listUsers failed', e);
        return [];
      }
    },

    setLog: async function(id, data) {
      try {
        if (backend === 'firebase') {
          await db.collection('logs').doc(id).set(data, { merge: true });
        } else if (backend === 'claude') {
          await window.storage.set('log:' + id, JSON.stringify(data), true);
        } else {
          memoryDB.logs[id] = Object.assign({}, memoryDB.logs[id] || {}, data);
        }
      } catch (e) {
        console.error('DB.setLog failed', e);
      }
    },

    listLogs: async function() {
      try {
        if (backend === 'firebase') {
          const snap = await db.collection('logs').get();
          return snap.docs.map(d => d.data());
        } else if (backend === 'claude') {
          const list = await window.storage.list('log:', true);
          if (!list || !list.keys) return [];
          const out = [];
          for (const k of list.keys) {
            try {
              const r = await window.storage.get(k, true);
              if (r) out.push(JSON.parse(r.value));
            } catch (err) {}
          }
          return out;
        } else {
          return Object.values(memoryDB.logs);
        }
      } catch (e) {
        console.error('DB.listLogs failed', e);
        return [];
      }
    }
  };
})();
