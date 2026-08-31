/**
 * Progress Rail Component
 * Updates the top progress segments as the user moves through break stages.
 */
(function() {
  const STAGE_MAP = {
    welcome: 0,
    breathing: 1,
    stretch: 2,
    reflect: 3,
    closing: 3
  };

  window.ProgressRail = {
    update: function(screenName) {
      const rail = document.getElementById('rail');
      if (!rail) return;

      rail.classList.toggle('hidden', screenName === 'stats');

      const stage = STAGE_MAP[screenName];
      if (stage === undefined) return;

      document.querySelectorAll('#rail .seg').forEach(seg => {
        const segStage = parseInt(seg.dataset.stage, 10);
        seg.classList.toggle('done', segStage < stage);
        seg.classList.toggle('active', segStage === stage);
      });
    }
  };
})();
