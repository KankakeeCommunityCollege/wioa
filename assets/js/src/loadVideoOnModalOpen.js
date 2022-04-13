const MODAL_BUTTON = document.querySelector('button[data-target="#videoModal"]');

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

  window.setTimeout(() => {
    video.play();
  }, 1000)
}

function loadVideo(e) {
  const MODAL = document.querySelector(e.target.dataset.target);
  const VIDEO_WRAPPER = MODAL.querySelector('#videoWrapper');
  const VIDEO_SOURCE = VIDEO_WRAPPER.dataset.videoSrc;

  createVideoElements(VIDEO_SOURCE, VIDEO_WRAPPER);
  MODAL_BUTTON.removeEventListener('click', loadVideo);
}

function loadVideoOnModalOpen() {
  MODAL_BUTTON.addEventListener('click', loadVideo);
}

export default loadVideoOnModalOpen;