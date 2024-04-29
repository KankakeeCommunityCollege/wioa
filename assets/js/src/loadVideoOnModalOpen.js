const modalButton = document.querySelector('button[data-bs-target="#videoModal"]');

function startVideoPlayback(video, parent) {
  const modalCloseButtonList = document.querySelectorAll('button[data-bs-dismiss="modal"]');

  modalCloseButtonList.forEach(btn => {
    btn.onclick = _e => video.pause();
  });

  window.setTimeout(() => {
    video.play();
  }, 1500);
}

function createVideoSources(video, src) {
  const sourceArray = src.split(',');

  sourceArray.forEach(src => {
    const source = document.createElement('source');
    
    source.src = src;
    video.append(source);
  });
  return video;
}

function createVideoElements(src, parent) {
  const video = document.createElement('video');

  createVideoSources(video, src);
  video.controls = true;
  video.classList.add('video__one-stop-intro');
  parent.innerHTML = '';
  parent.append(video);
  startVideoPlayback(video, parent);
  modalButton.removeEventListener('click', loadVideo);
}

function loadVideo(e) {
  const modal = document.querySelector(e.target.dataset.bsTarget);
  const videoWrapper = modal.querySelector('#videoWrapper');
  const videoSource = videoWrapper.dataset.videoSrc;

  createVideoElements(videoSource, videoWrapper);
}

function loadVideoOnModalOpen() {
  modalButton.addEventListener('click', loadVideo);
}

export default loadVideoOnModalOpen;
