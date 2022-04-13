import '../../scss/main.scss';

window.addEventListener('load', () => {
  if (document.getElementById('JobBoard')) {
    return import('./createJobBoard').then(({default: cb}) => cb())
  }
  if (document.querySelector('button[data-target="#videoModal"]')) {
    return import('./loadVideoOnModalOpen').then(({default: cb}) => cb())
  }
});