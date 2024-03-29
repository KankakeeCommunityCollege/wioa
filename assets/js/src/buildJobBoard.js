const PARENT = document.getElementById('JobBoard');
const DATA_TABLES_CONFIG = {
  responsive: true, // Activate responsive powers GO!
  'order': [], // Initial column ordering
  'pageLength': 25, // Sets the # of rows displayed
}

function createRows(data) {
  let html = '';

  data.forEach((row, i) => {
    let [
      date, title, website, location, coName, applyHow, , , , , , ,
      , description, requirements, jobType, shift, otherJobType, pay, , , , , , ,
    ] = row;

    date = date.replace(/^(\d{4})-(\d{2})-(\d{2}).+$/, `$2/$3/$1`);
    html += `<tr>
  <td>${title}</td>
  <td>${coName}</td>
  <td>${location}</td>
  <td>${date}</td>
  <td><button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#jobModal${i}">
      More&nbsp;details...</button>
  </td>
  <td>${[website, applyHow, description, requirements, jobType, shift, otherJobType, pay].join(', ')}</td>
</tr>`;
  });
  return html;
}

function createTable(data) {
  let html = '';

  html += `<table id="JobsTable" class="table table-sm table-striped table-hover">
    <thead>
      <tr>
        <th class="all">Job Title:</th>
        <th>Company:</th>
        <th>Location:</th>
        <th>Date Posted:</th>
        <th class="all">Details:</th>
        <th class="never">Searchable column</th>
      </tr>
    </thead>
    <tbody>
      ${createRows(data)}
    </tbody>
  </table>`;

  return html;
}
/**
 * 
 * @param {Array} data - data is an array of arrays representing the data held in the Google Sheet.
 * It has already been filtered for old job posts.
 */
function buildJobBoard(data) {
  Promise.resolve()
    .then(() => {
      // Async step 1.) create a table that holds all job info:
      const html = createTable(data);

      PARENT.innerHTML = ''; // Remove the spinning-loader placeholder before injecting the job-board (loader is present in HTML at pageload)
      return PARENT.innerHTML = `<div id="JobBoardRow" class="row">${html}</div>`;
    }).then(() => {
      // Async step 2.) build the flyer images into the page for employers who submitted a flier document:
      // Do not run `createFlyerImages.js` prior to "Async step 1.)"
      return import('./createFlyerImages').then(({ default: createJobFlyers }) => createJobFlyers(data));
    }).then(() => {
      // Async step 3.) create modals with the full job details.
      return import('./createJobModals').then(({ default: createJobModals }) => createJobModals(data, PARENT));
    }).then(() => {
      // Async step 4.) Do not attempt to access `table#JobsTable`, prior to step 1.)
      // Initiate DataTables
      const TABLE = document.getElementById('JobsTable');

      return $(TABLE).DataTable(DATA_TABLES_CONFIG);
    }).then(() => {
      return document.querySelector('input[aria-controls="JobsTable"]').placeholder = 'Filter jobs...';
    }).then(() => {
      if (!document.querySelector('div[data-flyer-src]'))
        return;
      
      return import('./lazyLoadFlyers').then(({default: lazyLoadFlyers}) => lazyLoadFlyers())
    })
}

export default buildJobBoard;
