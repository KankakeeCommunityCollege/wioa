import '../../scss/main.scss';

window.addEventListener('load', async () => {
  if (document.getElementById('JobBoard')) {
    const { default: cb } = await import('./createJobBoard');

    return cb();
  }
  if (document.querySelector('button[data-target="#videoModal"]')) {
    const { default: cb } = await import('./loadVideoOnModalOpen');

    return cb();
  }
  if (document.getElementById('iframeLink')) {
    const { default: iframeLink } = await import('./iframeLink');

    return iframeLink();
  }
});