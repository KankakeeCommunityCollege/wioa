const urlRegExp = /(https?:\/\/\S+)/g;
const urlReplacer = `<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`;

function createOptionalJobInfo(phone, email, website, appUrl, fax) {
  let html = '';

  if (phone != '') {
    html += '<strong>Phone:</strong> ' + phone.replace(/(\d{3})(\d{3})(\d{4})/, `<a href="tel:+1$1$2$3">$1-$2-$3</a>`) + '<br>';
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
    html += `<a href="${appUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Apply</a><br>`;
  }
  return html;
}

function stringReplacerFunc(match) {
  console.log(`Matched: \n${match}`);
  let returnString = match.replace(/(https?:\/\/\S+)/g, `<a targe="_blank" rel="noopener noreferrer" href="$1">$1</a>`);
  
  return `<p class="mb-0">${returnString.replace(/^-\s(.+)$/gm, `<span class="pl-3">&bull;$1</span>`)}</p>`
}

function loopData(data) {
  let html = ''
  data.forEach((row, i) => {
    let [
      , title, website, location, coName, applyHow, appUrl, email, phone, fax, , ,
      flyer, description, requirements, jobType, shift, otherJobType, pay, , , , , , ,
    ] = row;
    const optionalJobInfo = createOptionalJobInfo(phone, email, website, appUrl, fax);
    const flyerPlaceholder = flyer != '' ? `<div class="text-center" data-flyer-src="${flyer}"></div>` : '';

    console.log(otherJobType);
    

    applyHow = applyHow.replace(/(Online|In Person \(with Resume\)|Email Resume|Fax Resume|Call)/g, `<br><span class="pl-3">&bull;</span>&nbsp;$1`);
    return html += `<div class="modal fade" id="jobModal${i}" tabindex="-1" aria-labelledby="jobModalLabel${i}" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title typography__h3" id="jobModalLabel${i}">${title}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card card-body">
            <p class="mb-0"><strong>Company name/employer:</strong>&nbsp;${coName}</p>
          </div>
          <div class="card card-body">
            <p class="mb-0"><strong>Location:</strong>&nbsp;${location}</p>
          </div>
          <div class="card card-body">
            <p class="mb-2"><strong>Description:</strong></p>
            ${description.replace(/^(.+)$/gm, stringReplacerFunc)}
          </div>
          <div class="card card-body">
            <p class="mb-2"><strong>Requirements:</strong></p>
            ${requirements.replace(/^(.+)$/gm, stringReplacerFunc)}</span>
          </div>
          <div class="card card-body">
            <p class="mb-0"><strong>Job Type:</strong> ${jobType}</p>
            ${otherJobType != '' ? '<p class="pl-3 mb-0">&bull;&nbsp;' + otherJobType + '</p>' : ''}
          </div>
          <div class="card card-body">
            <p class="mb-0">
              <strong>Shift/schedule:</strong>&nbsp;${shift.replace(urlRegExp, urlReplacer)}
            </p>
          </div>
          <div class="card card-body">
          <p class="mb-0"><strong>Pay & benefits:</strong></p>
          ${pay.replace(/^(.+)$/gm, stringReplacerFunc)}
          </div>
          <div class="card card-body">
            <strong>How to apply:</strong> ${applyHow.replace(/,$/, '')}<br>
            ${optionalJobInfo}
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
  const html = loopData(data);

  PARENT.insertAdjacentHTML('beforeend', html);
}

export default createJobModals;