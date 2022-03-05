const PARENT = document.getElementById('JobBoard');

function createRows(data) {
  let html = '';
  /**
   * 
   * 
   * @TODO remove unused variables when done with module dev
   * 
   */
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
    return html += `<tr><td>${title}</td><td>${coName}</td><td>${loc}</td><td><button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#jobModal${i}">More&nbsp;details...</button></td></tr>`;
  });
  return html;
}

function createTable(data, createJobModals) {
  let html = `<div class="col-lg-8 offset-lg-2">
  <table class="table table-sm table-striped table-hover">
    <thead>
      <tr>
        <th>Job Title:</th>
        <th>Company</th>
        <th>Location</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      ${createRows(data)}
    </tbody>
  </table>
</div>
${createJobModals(data)}`;

  return html;
}

function buildJobBoard(data) {
  Promise.resolve()
    .then(() => {
      return import('./createJobModals').then(({ default: createJobModals }) => {
        const html = createTable(data, createJobModals);

        PARENT.innerHTML = '';
        return PARENT.innerHTML = `<div class="row">${html}</div>`;
      })
    })
}

export default buildJobBoard;