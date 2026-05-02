
  const trigger = document.getElementById('modal-trigger');
  const modal = document.getElementById('video-modal');
  const wrapper = document.getElementById('video-wrapper');

  function openVideo() {
    modal.style.display = 'flex';
    wrapper.innerHTML = `
      <lite-youtube
        videoid="AaqlFU388vQ"
        playlabel="Play GKB TECHNOLOGIES Overview Video"
        style="width: 100%; height: 100%;">
      </lite-youtube>
    `;
  }

  function closeVideo() {
    modal.style.display = 'none';
    wrapper.innerHTML = '';
  }

  if (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openVideo();
    });
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeVideo();
      }
    });
  }
