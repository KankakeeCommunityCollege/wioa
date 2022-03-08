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
    header.classList.add('card-header');
    body.classList.add('card-body');
    header.innerHTML = `<h5 class="typography__h5">${title}<h5>`;
    a.href = `#jobModal${index}`;
    a.dataset.toggle = 'modal';
    a.type = 'button';

    img.onload = (e) => {
      window.URL.revokeObjectURL(img.src); // Clean up after yourself.
    };
    img.src = window.URL.createObjectURL(blob);
    img.classList.add('img-fluid', 'img--drop-shadow');
    div.classList.add('col-md-6', 'mb-4');
    
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
  data.forEach((row, i) => {
    let [
      date,title,loc,,,flyer,desc,,ftPt,,,,,,coName,,
    ] = row;
    // row[5] is the 6th column which holds the file upload URL for downloading the submitted flyers
    const imageUrl = flyer != '' ? flyer : null;
    // Flyer image is not required in a submissions so we need to check if it exists first
    if (imageUrl != null) { // Do not be afraid of the inequality operator (`!=`) — Stop always using strict inequality (`!==`) — learn the difference, learn what implicit coercion is in JS!
      getImage(imageUrl, i, [title, loc, coName]);
    }
  })
}

export default createFlyerImages;