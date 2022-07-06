const MODAL_BUTTON = document.querySelector('[data-target="#postJobOpeningModal"]');
const FORM_WRAPPER = document.getElementById('formWrapper');
const LOADER_WRAPPER = document.getElementById('loaderWrapper');

function clickHandler(e) {
  const formSrc = FORM_WRAPPER.dataset.formSrc; // data-form-src attribute found in the div#formWrapper HTML markup
  const iframe = document.createElement('iframe');

  iframe.src = formSrc;
  iframe.classList.add('iframe--hidden');
  FORM_WRAPPER.insertAdjacentElement('afterbegin', iframe);
  iframe.onload = e => {
    LOADER_WRAPPER.parentNode.removeChild(LOADER_WRAPPER);
    iframe.classList.add('iframe__jotform-form');
    iframe.classList.remove('iframe--hidden');
  }
}

function loadJotFormOnModalOpen() {
  MODAL_BUTTON.addEventListener('click', clickHandler);
}

export default loadJotFormOnModalOpen;