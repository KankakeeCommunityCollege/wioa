import '../../scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  import(/* webpackChunkName: 'test' */ './test').then(({default: test}) => {
    test();
  });
});