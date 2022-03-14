const PARENT = document.getElementById('JobBoard');
const DATA_TABLES_CONFIG = {
  responsive: true, // Activate responsive powers GO!
  paging: false, // Don't paginate. Should all be on one page
  'order': []//, // Initial column ordering
}

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
    date = date.replace(/^(\d{4})-(\d{2})-(\d{2}).+$/, `$2/$3/$1`);
    return html += `<tr>
  <td>${title}</td>
  <td>${coName}</td>
  <td>${loc}</td>
  <td>${date}</td>
  <td><button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#jobModal${i}">
      More&nbsp;details...</button>
  </td>
</tr>`;
  });
  return html;
}

function createTable(data, createJobModals) {
  let html = `<div class="col-xl-10 offset-xl-1 mt-3 mb-4">
  <table id="JobsTable" class="table table-sm table-striped table-hover">
    <thead>
      <tr>
        <th class="all">Job Title:</th>
        <th>Company:</th>
        <th>Location:</th>
        <th>Date Posted:</th>
        <th class="all">Details:</th>
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
        // Async step 1.) create a table that holds all job info:
        const html = createTable(data, createJobModals);

        PARENT.innerHTML = '';
        return PARENT.innerHTML = `<div id="JobBoardRow" class="row">${html}</div>`;
      })
    }).then(() => {
      // Async step 2.) build the flyer images into the page for employers who submitted a flier document:
      // Do not run `createFlyerImages.js` prior to "Async step 1.)"
      return import('./createFlyerImages').then(({default: createJobFlyers}) => createJobFlyers(data))
    }).then(() => {
      // Async step 3.) create modals with the full job details.
      return import('./createJobModals').then(({default: createJobModals}) => createJobModals(data))
    }).then(() => {
      // Async step 4.) Do not attempt to access `table#JobsTable`, prior to step 1.)
      // Initiate DataTables
      const TABLE = document.getElementById('JobsTable');

      return $(TABLE).DataTable(DATA_TABLES_CONFIG);
    })
}

export default buildJobBoard;