function lazyLoadFlyers() {
  const FLYER_LIST = document.querySelectorAll('div[data-flyer-src]');

  [...FLYER_LIST].forEach(div => {
    const src = div.dataset.flyerSrc;
    const img = document.createElement('img');

    img.classList.add('img-fluid', 'img--border-light');
    div.classList.add('mx-5', 'mb-3');
    img.src = src;
    div.append(img);
  });
}

export default lazyLoadFlyers;