import '../../scss/main.scss';

window.addEventListener('load', async () => {
  // The same main JS modules build both the JobBoardWidget (on the homepage) and the JobBoard (/job-board/ page)
  if (document.getElementById('JobBoard')) {
    // Load Bootstrap 5 pagination CSS which is not included in our theme.
    import('../../scss/bootstrap-pagination.scss');
    // Our theme loads the BS5 Modal JS if modal markup is present when the page loads.
    // Our custom JS builds the modals into the page so we need to manually import BS5
    //  modal JS to make them work.
    const { default: _Modal } = await import('bootstrap/js/dist/modal');

    import('./createJobBoard')
      .then(({ default: createJobBoard }) => createJobBoard());
  }
  
  if (document.querySelector('button[data-bs-target="#videoModal"]')) {
    import('./loadVideoOnModalOpen').then(({ default: loadVideoOnModalOpen }) => loadVideoOnModalOpen());
  }
  
  if (document.getElementById('widgetHeightForm')) {
    import('./watchWidgetHeightForm').then(({ default: watchWidgetHeightForm }) => watchWidgetHeightForm());
  }

  if (document.getElementById('footnote')) {
    import('./preventFootnoteJump').then(({ default: preventFootnoteJump }) => preventFootnoteJump());
  }
});
