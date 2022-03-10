function loopData(data) {
  let html = ''
  data.forEach((row, i) => {
    let [
      date,
      title,
      loc,
      applyHow,
      phone,
      flyer,
      desc,
      req,
      ftPt,
      shift,
      pay,
      coAddress,
      comments,
      web,
      coName,
      appUrl,
      email
    ] = row;

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
            <strong>Location:</strong> ${loc}<br>
            <strong>Description:</strong> ${desc.replace(/^-\s/gm, '<br><span class="pl-3">&bull;</span> ')}<br>
            <strong>Requirements:</strong> ${req.replace(/^-\s/gm, '<br><span class="pl-3">&bull;</span> ')}<br>
            <strong>Full or part-time?:</strong> ${ftPt}<br>
            <strong>Shift/schedule:</strong> ${shift}<br>
            <strong>Pay & benefits:</strong> ${pay.replace(/^-\s/gm, '<br><span class="pl-3">&bull;</span> ')}<br>
            <strong>Comments:</strong> ${comments.replace(/^-\s/gm, '<br><span class="pl-3">&bull;</span> ')}<br>
            <strong>How to apply:</strong> ${applyHow.replace(/,$/, '')}<br>
            ${phone != '' ? '<strong>Phone:</strong> ' + phone.replace(/(\d{3})(\d{3})(\d{4})/, `<a href="tel:+1$1$2$3">$1-$2-$3</a>`) : ''}<br>
            ${email != '' ? '<a href="mailto:' + email + '">Email to send resume: ' + email + '</a> ' : ''}<br>
            ${web != '' ? '<strong>Company website:</strong> <a target="_blank" rel="noopener noreferrer" href="' + web + '">' + web + '</a>' : ''}<br>
            ${appUrl != '' ? '<a href="' + appUrl + '" class="btn btn-primary mt-3" target="_blank" rel="noopener noreferrer">Apply</a>' : ''}
          </p>
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

function createJobModals(data) {
  // console.log(data);
  const html = loopData(data);

  return html;
}

export default createJobModals;