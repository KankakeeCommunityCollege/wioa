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

function createVideoSources(video, src) {
  const sourceArray = src.split(',');

  sourceArray.map(src => {
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