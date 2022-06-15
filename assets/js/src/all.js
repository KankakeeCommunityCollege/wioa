import '../../scss/main.scss';

const path = window.location.pathname;

window.addEventListener('load', () => {
  if (document.getElementById('postJobOpeningModal')) {
    // This module needs to be imported (and executed) prior to `./createJobBoard.js`:
    // This is to ensure the "Post a Job Opening" modal will open, even if the createJobBoard JS has not finished.
    import('./loadJotFormOnModalOpen').then(({ default: loadJotFormOnModalOpen }) => loadJotFormOnModalOpen());
  }
  // The same main JS modules build both the JobBoardWidget (on the homepage) and the JobBoard (/job-board/ page)
  if (document.getElementById('JobBoard') || document.getElementById('JobBoardWidget')) {
    // Assign the PARENT element depending on which element is present in the page
    const PARENT = document.getElementById('JobBoard') || document.getElementById('JobBoardWidget');

    import('./createJobBoard').then(({ default: createJobBoard }) => createJobBoard(PARENT));
  }
  if (document.querySelector('button[data-target="#videoModal"]')) {
    import('./loadVideoOnModalOpen').then(({ default: loadVideoOnModalOpen }) => loadVideoOnModalOpen());
  }
  if (document.getElementById('iframeLink')) {
    import('./iframeLink').then(({ default: iframeLink }) => iframeLink());
  }
});