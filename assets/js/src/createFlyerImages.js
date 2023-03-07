// This Bootstrap 4 row div-element is built into the page in the `buildJobBoard.js` module,
// which also means, this module must happen asynchronously — after `buildJobBoard.js` has built that row into the page!
const PARENT = document.getElementById('JobBoardRow');
// Prefix for compatibility
window.URL = window.URL || window.webkitURL;

function responseHandler(e) {
  if (this.status == 200) {
    const blob = this.response;
    const img = document.createElement('img');
    const div = document.createElement('div');
    const a = document.createElement('a');

    const index = e.currentTarget.currentIndex;
    let [title, loc, coName] = e.currentTarget.jobInfoArr;
    const card = document.createElement('div');
    const header = document.createElement('div');
    const body = document.createElement('div');

    card.classList.add('card');
    header.classList.add('card-header', 'd-flex', 'justify-content-between', 'align-items-center');
    body.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-center');
    header.innerHTML = `<h5 class="typography__h5">${title}<h5> <p class="mb-0 float-right"><strong>${coName}</strong> - ${loc}</p>`;
    a.href = `#jobModal${index}`;
    a.dataset.toggle = 'modal';
    a.type = 'button';

    img.onload = (e) => {
      window.URL.revokeObjectURL(img.src); // Clean up after yourself.
    };
    img.src = window.URL.createObjectURL(blob);
    img.classList.add('img-fluid', 'img--drop-shadow');
    div.classList.add('col-md-6', 'mb-4', 'd-flex');
    
    a.appendChild(img);
    body.appendChild(a);
    card.appendChild(header);
    card.appendChild(body);
    div.appendChild(card);
    PARENT.appendChild(div);
  }
}
  
function getImage(url, i, jobInfoArr) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.responseType = 'blob'; // Use the XHR2 responseType of 'blob' since images files are binary
  xhr.currentIndex = i
  xhr.jobInfoArr = jobInfoArr;
  xhr.addEventListener('load', responseHandler, false);
  xhr.send();
}

function createFlyerImages(data) {
  // console.log(data);
  data.forEach((row, i) => {
    let [,title,,location,coName,,,,,,,,flyer,,,,,,,,,,,,,] = row;
    const imageUrl = flyer != '' ? flyer : null;
    // Flyer image is not required in a submissions so we need to check if it exists first
    if (imageUrl != null) {
      getImage(imageUrl, i, [title, location, coName]);
    }
  })
}

export default createFlyerImages;
