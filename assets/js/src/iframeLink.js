/**
 * 
 * 
 *  Custom JS to scroll the JotFrom into view after clicking the "Go to application" button, OR
 *    if the window.location.hash === '#JotFormIFrame-62244641777966' it scrolls the frame into view also.
 *  Module only loads on the training-grant-application page
 * 
 */
const BUTTON = document.getElementById('iframeLink');

/**
 * 
 * @returns {number} the calculated height of the two navigation bars (needed because they are position: fixed;)
 */
function getNavHeight() {
  const { height: height1 } = document.getElementById('mainNav').getBoundingClientRect();
  const { height: height2 } = document.getElementById('globalNav').getBoundingClientRect();
  
  return Math.round(height1) + Math.round(height2);
}

/**
 * 
 * @param {element} element an element to calculate the scroll distance to
 * @returns {object} an Element.scrollTo() options object - the height of 
 *   the fixed nav elements is used to offset the distance scrolled.
 */
function getScrollOptions(element) {
  const { top } = element.getBoundingClientRect();

  return ({
    top: Math.round(top) - getNavHeight(),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  })
}

function iframeLink() {
  BUTTON.addEventListener('click', e => {
    e.preventDefault();
    const path = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    const target = e.target.href.replace(path, '');
    const frame = document.querySelector(target);

    window.scrollTo(getScrollOptions(frame));
  });

  if (window.location.hash === '#JotFormIFrame-62244641777966') {
    const frame = document.querySelector(window.location.hash);

    window.scrollTo(getScrollOptions(frame));
  }
}

export default iframeLink;
