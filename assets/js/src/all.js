import '../../scss/main.scss';

window.addEventListener('load', () => {
  // The same main JS modules build both the JobBoardWidget (on the homepage) and the JobBoard (/job-board/ page)
  if (document.getElementById('JobBoard')) {

    import('./createJobBoard')
      .then(({ default: createJobBoard }) => createJobBoard());
  }
  
  if (document.querySelector('button[data-target="#videoModal"]')) {
    import('./loadVideoOnModalOpen').then(({ default: loadVideoOnModalOpen }) => loadVideoOnModalOpen());
  }
  
  if (document.getElementById('iframeLink')) {
    import('./iframeLink').then(({ default: iframeLink }) => iframeLink());
  }
  
  if (document.getElementById('widgetHeightForm')) {
    import('./watchWidgetHeightForm').then(({ default: watchWidgetHeightForm }) => watchWidgetHeightForm());
  }

  if (document.getElementById('SearchTermForm')) {
    import('./watchForWebsiteSearch').then(({ default: watchForWebsiteSearch }) => watchForWebsiteSearch());
  }

  if (document.getElementById('footnote')) {
    import('./preventFootnoteJump').then(({ default: preventFootnoteJump }) => preventFootnoteJump());
  }
});
