const MODAL_BUTTON = document.querySelector('button[data-target="#videoModal"]');

function startVideoPlayback(video) {
  const MODAL_CLOSE_BUTTONS = document.querySelectorAll('button[data-dismiss="modal"]');
  
  window.setTimeout(() => {
    video.play();
    MODAL_CLOSE_BUTTONS.forEach(btn => {
      btn.onclick = (e) => video.pause();
    });
  }, 1500)
}

function createVideoElements(src, parent) {
  const video = document.createElement('video');
  const source = document.createElement('source');

  video.controls = true;
  video.classList.add('video__one-stop-intro');
  source.src = src;
  source.type = 'video/mp4';
  video.append(source);
  parent.innerHTML = '';
  parent.append(video);
  startVideoPlayback(video);
  MODAL_BUTTON.removeEventListener('click', loadVideo);
}

function loadVideo(e) {
  const MODAL = document.querySelector(e.target.dataset.target);
  const VIDEO_WRAPPER = MODAL.querySelector('#videoWrapper');
  const VIDEO_SOURCE = VIDEO_WRAPPER.dataset.videoSrc;

  createVideoElements(VIDEO_SOURCE, VIDEO_WRAPPER);
}

function loadVideoOnModalOpen() {
  MODAL_BUTTON.addEventListener('click', loadVideo);
}

export default loadVideoOnModalOpen;