import '../../scss/main.scss';

window.addEventListener('load', () => {
  if (document.getElementById('JobBoard')) {
    return import('./createJobBoard').then(({default: cb}) => cb())
  }
});