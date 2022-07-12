const captureIndividualLinesRegex = /^(.+)$/gm;
// Some Regular Expressions used for formatting the modal content.
const regObj = {
  email: /(\S+@\S+\.\S+)/g,
  strong: /(\*\*([^\*]+)\*\*|__([^_]+)__)/g,
  em: /(\*([^\*]+)\*|_([^_]+)_)/g,
  link: /\[([^\]]+)\]\(([^\)]+)\)/g,
  phone: /(\d{3})(\d{3})(\d{4})/g,
  strikeout: /~([^~]+)~/g,
  url: /[^\("](https?:\/\/\S+)[^\)"]/g,
  replacers: { // Replacers that utilize the backtick & dollar-sign variables of RegExp in JS (`$1`)
    email: `<a href="mailto:$1">$1</a>`,
    strong: `<strong>$2</strong>`,
    em: `<em>$2</em>`,
    link: `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`,
    phone: `<a href="tel:+1$1$2$3">$1-$2-$3</a>`,
    strikeout: `<s>$1</s>`,
    url: `<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`,
  }
}

function stringReplacerFunc(match) {
  let returnString = match;

  for (const prop in regObj) {
    if (Object.hasOwnProperty.call(regObj, prop) && prop != 'replacers') { // We don't need to include replacers in the loop
        const regexp = regObj[prop];
        const replacer = regObj.replacers[prop];
        
        returnString = returnString.replace(regexp, replacer);
    }
  }

  return returnString.replace(/^([-\*]\s(.+)|(.+))$/gm, (match, c1, c2) => {
    return c2 == undefined ? `<p class="mb-2 mt-1">${match}</p>`
      : `<p class="mb-0 ml-3 typography--text-indent"><span class="ml-3">&bull;&nbsp;${c2}</span></p>`;
  });
}

function createFlyerPlaceholder(string) {
  return `<div class="text-center mt-4" data-flyer-src="${string}">
    <img src="/assets/img/loader.min.svg" class="loader loader--animate" alt="Loading...">
  </div>`;
}

function createPayHTML(string) {
  return `<div class="card card-body">
    <p class="mb-0">
      <strong>Pay & benefits:</strong>&nbsp;${string.replace(/^(.+)$/gm, stringReplacerFunc)}
    </p>
  </div>`;
}

function createOptionalJobInfo(phone, email, website, appUrl, fax) {
  let html = '';

  if (phone != '') {
    html += '<strong>Phone:</strong> ' + phone.replace(regObj.phone, regObj.replacers.phone) + '<br>';
  }
  if (email != '') {
    html += `<strong>Email resume to:</strong> <a href="mailto:${email}">${email}</a><br>`;
  }
  if (website != '') {
    html += `<strong>Company website:</strong> <a target="_blank" rel="noopener noreferrer" href="${website}">${website}</a><br>`;
  }
  if (fax != '') {
    html += `<strong>Fax resume to:</strong> ${fax}<br>`;
  }
  if (appUrl != '') {
    html += `<a href="${appUrl}" class="btn btn-primary mt-2" target="_blank" rel="noopener noreferrer">Apply Online</a>`;
  }
  return html;
}

function loopData(data) {
  let html = ''
  
  data.forEach((row, i) => {

    let [
      , title, website, location, coName, applyHow, appUrl, email, phone, fax, , ,
      flyer, description, requirements, jobType, shift, otherJobType, pay, , , , , , ,
    ] = row;
    const optionalJobInfo = createOptionalJobInfo(phone, email, website, appUrl, fax);
    const flyerPlaceholder = flyer != '' ? createFlyerPlaceholder(flyer) : '';

    return html += `<div class="modal fade" id="jobModal${i}" tabindex="-1" aria-labelledby="jobModalLabel${i}" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title typography__h3" id="jobModalLabel${i}">${title}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-lg-3">
          <div class="card card-body">
            <p class="mb-0"><strong>Company name/employer:</strong>&nbsp;${coName}</p>
          </div>
          <div class="card card-body">
            <p class="mb-0"><strong>Location:</strong>&nbsp;${location}</p>
          </div>
          <div class="card card-body">
            <p class="mb-2"><strong>Description:</strong></p>
            <div class="mx-3">
              ${description.replace(captureIndividualLinesRegex, stringReplacerFunc)}
            </div>
          </div>
          <div class="card card-body">
            <p class="mb-2"><strong>Requirements:</strong></p>
            <div class="mx-3">
              ${requirements.replace(captureIndividualLinesRegex, stringReplacerFunc)}</span>
            </div>
          </div>
          <div class="card card-body">
            <p class="mb-0"><strong>Job Type:</strong> ${jobType}</p>
            ${otherJobType != '' ? '<p class="pl-3 mb-0">&bull;&nbsp;' + otherJobType + '</p>' : ''}
          </div>
          <div class="card card-body">
            <p class="mb-0">
              <strong>Shift/schedule:</strong>&nbsp;${shift.replace(regObj.url, regObj.replacers.url)}
            </p>
          </div>
          ${pay == '' ? '' : createPayHTML(pay)}
          <div class="card card-body">
            <p class="mb-0">
              <strong>How to apply:</strong>&nbsp;${applyHow}<br>
              ${optionalJobInfo}
            </p>
          </div>
          ${flyerPlaceholder}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
  });
  return html;
}
/**
 * 
 * @param {Array} data - Array of arrays containing the job board data from Google Sheets API response
 * @param {Element} PARENT - This second argument is the element in which the modal HTML markup gets injected.
 *                           `PARENT` is passed to this module's default function from the module `./buildJobBoard.js`.
 */
function createJobModals(data, PARENT) {
  // NOTE: The only reason I can get away with not sanitizing the form responses and then building them into the page is because
  // JotForm strips all HTML from any form response already.
  // The submissions held within the google sheet are, therefore, already sanitized since they come from JotForm.
  const html = loopData(data);

  PARENT.insertAdjacentHTML('beforeend', html);
}

export default createJobModals;