function lazyLoadFlyers() {
  const flyerImageList = document.querySelectorAll('div[data-flyer-src]');

  [...flyerImageList].forEach(div => {
    // div has data-attributes which are created in `createJobModals.js`
    const src = div.dataset.flyerSrc;
    const alt = div.dataset.flyerAlt;
    const img = document.createElement('img');
    const a = div.querySelector('a'); // div's child is an <a> and the <a>'s child is the image to lazy load

    img.classList.add('img-fluid', 'img--border-light');
    div.classList.add('mx-5', 'mb-3');
    img.src = src;
    img.alt = alt;
    img.onload = e => {
      a.innerHTML = ''; // Removes loader placeholder graphic
      a.append(img);
    }
  });
}

export default lazyLoadFlyers;
