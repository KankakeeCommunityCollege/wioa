import '../../scss/main.scss';

window.addEventListener('load', () => {
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
  if (document.getElementById('widgetHeightForm')) {
    import('./watchWidgetHeightForm').then(({default: watchWidgetHeightForm}) => watchWidgetHeightForm())
  }
});