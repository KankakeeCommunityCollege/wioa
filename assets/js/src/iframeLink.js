/**
 * 
 * 
 *  Custom JS to scroll the JotFrom into view after clicking the "Go to application" button.
 *    Module only loads on the training-grant-application page
 * 
 */
import checkForPrefersReduceMotion from "./checkForPrefersReducedMotion";

const BUTTON = document.getElementById('iframeLink');
const scrollIntoViewOptions = { block: 'center' };

function iframeLink() {
  checkForPrefersReduceMotion(); // Checks for the prefers reduced motion media query and sets a localStorage key

  BUTTON.addEventListener('click', e => {
    e.preventDefault();
    const path = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    const target = e.target.href.replace(path, '');
    const frame = document.querySelector(target);
    const behavior = window.localStorage.getItem('userPrefersReducedMotion') == 'true' ?
      'auto' : window.localStorage.getItem('userPrefersReducedMotion') == 'false' ?
      'smooth' : 'auto';

    scrollIntoViewOptions.behavior = behavior;
    frame.scrollIntoView(scrollIntoViewOptions);
    frame.focus();
  });
}

export default iframeLink;