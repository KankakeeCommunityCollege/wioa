import '../../scss/main.scss';

window.addEventListener('load', () => {
  if (document.getElementById('postJobOpeningModal')) {
    // This module needs to be imported (and executed) prior to `./createJobBoard.js`:
    // This is to ensure the "Post a Job Opening" modal will open, even if the createJobBoard JS has not finished.
    import('./loadJotFormOnModalOpen').then(({ default: loadJotFormOnModalOpen }) => loadJotFormOnModalOpen());
  }
  if (document.getElementById('JobBoard')) {
    import('./createJobBoard').then(({ default: createJobBoard }) => createJobBoard());
  }
  if (document.querySelector('button[data-target="#videoModal"]')) {
    import('./loadVideoOnModalOpen').then(({ default: loadVideoOnModalOpen }) => loadVideoOnModalOpen());
  }
  if (document.getElementById('iframeLink')) {
    import('./iframeLink').then(({ default: iframeLink }) => iframeLink());
  }
});