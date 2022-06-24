const DATA_TABLES_CONFIG = {
  responsive: true, // Activate responsive powers GO!
  paging: false, // Don't paginate. Should all be on one page
  'order': []//, // Initial column ordering
}

function createRows(data) {
  let html = '';

  data.forEach((row, i) => {
    let [date,title,,location,coName,,,,,,,,,,,,,,,,,,,,,] = row;

    date = date.replace(/^(\d{4})-(\d{2})-(\d{2}).+$/, `$2/$3/$1`);
    html += `<tr>
  <td>${title}</td>
  <td>${coName}</td>
  <td>${location}</td>
  <td>${date}</td>
  <td><button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#jobModal${i}">
      More&nbsp;details...</button>
  </td>
</tr>`;
  });
  return html;
}

function createTable(PARENT, data) {
  let html = '';
  const parentIsWidget = PARENT.id == 'JobBoardWidget' ? true : false;

  if (!parentIsWidget) { // Skip this HTML on the homepage
    html += '<div class="col-xl-10 offset-xl-1 mt-3 mb-4">';
  }

  html += `<table id="JobsTable" class="table table-sm table-striped table-hover">
    ${parentIsWidget ? '<caption>Visit the <a href="./job-board/">job board page</a> for full details</caption>' : ''}
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
  </table>`;
  
  if (!parentIsWidget) { // Skip this HTML on the homepage
    html += '</div>';
  }

  return html;
}
/**
 * 
 * @param {Element} PARENT -s PARENT is the parent-element selected via .getElementById() in the file all.js.
 * The PARENT element will get the job-board's HTML injected into it after all the data has loaded.
 * It is set to `<div id="JobBoardWidget">` on the homepage and `<div id="JobBoard">` on the job-board page.
 * @param {Array} data - data is an array of arrays representing the data held in the Google Sheet.
 * It has already been filtered for old job posts.
 */
function buildJobBoard(PARENT, data) {
  Promise.resolve()
    .then(() => {
      // Async step 1.) create a table that holds all job info:
      const html = createTable(PARENT, data);

      PARENT.innerHTML = ''; // Remove the spinning-loader placeholder before injecting the job-board (loader is present in HTML at pageload)
      return PARENT.innerHTML = `<div id="JobBoardRow" class="row">${html}</div>`;
    }).then(() => {
      // Async step 2.) build the flyer images into the page for employers who submitted a flier document:
      // Do not run `createFlyerImages.js` prior to "Async step 1.)"
      // Skip loading the job post flyer-images on the homepage but run it on the job-board page
      if (PARENT.id === 'JobBoardWidget')
        return;

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