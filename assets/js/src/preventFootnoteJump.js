// Custom JS to prevent footnote links (on the Partners page)
// from being obscured by our fixed navigation bar.
const footnoteLink = document.getElementById('footnote-ref');
const backLink = document.querySelector('a[href="#footnote-ref"]');

function clickHandler(e) {
  e.preventDefault(); // Prevent scrolling and prevent hash-link from altering page history

  const targetedEl = document.querySelector(e.target.getAttribute('href'));
  const rect = targetedEl.getBoundingClientRect();
  
  // Smoothly scroll into the middle of the page
  window.scrollTo({
    top: Math.round(rect.top) - Math.round(Math.round(rect.height) / 2),
    left: 0,
    behavior: 'smooth',
  });

  // Add (and then remove) class that highlights the targeted element visually
  targetedEl.classList.add('footnote__focused');
  window.setTimeout(() => {
    targetedEl.classList.remove('footnote__focused');
  }, 3500)
}

function preventFootnoteJump() {
  footnoteLink.addEventListener('click', clickHandler);
  backLink.addEventListener('click', clickHandler);
}

export default preventFootnoteJump;
