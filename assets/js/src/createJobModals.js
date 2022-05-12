function createOptionalJobInfo(phone, email, website, appUrl, fax, comments) {
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
  if (comments != '') {
    html += `<strong>Comments:</strong> ${comments}<br>`
  }
  if (appUrl != '') {
    html += `<a href="${appUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Apply</a><br>`;
  }
  return html;
}

function loopData(data) {
  let html = ''
  data.forEach((row, i) => {
    let [
      ,
      title,
      website,
      location,
      coName,
      applyHow,
      appUrl,
      email,
      phone,
      fax,
      , ,
      flyer,
      description,
      requirements,
      jobType,
      shift,
      otherJobType,
      pay,
      , , , , ,
      comments,
    ] = row;
    const optionalJobInfo = createOptionalJobInfo(phone, email, website, appUrl, fax, comments);
    const flyerPlaceholder = flyer != '' ? `<div class="text-center" data-flyer-src="${flyer}"></div>` : '';

    applyHow = applyHow.replace(/(Online|In Person \(with Resume\)|Email Resume|Fax Resume|Call)/g, `<br><span class="pl-3">&bull;</span>&nbsp;$1`);
    return html += `<div class="modal fade" id="jobModal${i}" tabindex="-1" aria-labelledby="jobModalLabel${i}" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title typography__h3" id="jobModalLabel${i}">${title} details</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h6 class="typography__h6">${title}</h6>
          <p class="pl-3">
            <strong>Company name/employer:</strong> ${coName}<br>
            <strong>Location:</strong> ${location}<br>
            <strong>Description:</strong> ${description.replace(/^-\s/gm, '<br><span class="pl-3">&bull;</span> ')}<br>
            <strong>Requirements:</strong> ${requirements.replace(/^-\s/gm, '<br><span class="pl-3">&bull;</span> ')}<br>
            <strong>Job Type:</strong> ${jobType}<br> ${otherJobType != '' ? '<span class="pl-3">&bull;</span> ' + otherJobType + '<br>' : ''}
            <strong>Shift/schedule:</strong> ${shift}<br>
            <strong>Pay & benefits:</strong> ${pay.replace(/^-\s/gm, '<br><span class="pl-3">&bull;</span> ')}<br>
            <strong>How to apply:</strong> ${applyHow.replace(/,$/, '')}<br>
            ${optionalJobInfo}
          </p>
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