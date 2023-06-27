function lazyLoadFlyers() {
  const FLYER_LIST = document.querySelectorAll('div[data-flyer-src]');

  [...FLYER_LIST].forEach(div => {
    const src = div.dataset.flyerSrc;
    const img = document.createElement('img');
    const a = div.querySelector('a'); // div's child is an <a> and the <a>'s child is the image to lazy load

    img.classList.add('img-fluid', 'img--border-light');
    div.classList.add('mx-5', 'mb-3');
    img.src = src;
    img.onload = e => {
      a.innerHTML = ''; // Removes loader placeholder graphic
      a.append(img);
    }
  });
}

export default lazyLoadFlyers;
