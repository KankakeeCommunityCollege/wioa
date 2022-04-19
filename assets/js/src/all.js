import '../../scss/main.scss';

window.addEventListener('load', () => {
  Promise.resolve()
    .then(() => {
      if (!document.getElementById('iframeLink'))
        return;
  
      return import('./iframeLink').then(({ default: iframeLink }) => iframeLink());
    }).catch(err => console.error(`Error loading module: ${err.message}`, err))
});