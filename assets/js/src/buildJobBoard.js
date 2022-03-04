const PARENT = document.getElementById('JobBoard');

function createRows(data) {
  let html = '';

  data.forEach(row => {
    console.log(row);
    
  });
  return html;
}

function createTable(data) {
  let html = `<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Job Title:</th>
      <th>Company</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    ${createRows(data)}
  </tbody>
  </table>`;

  return html;
}

function buildJobBoard(data) {
  const html = createTable(data);
  PARENT.innerHTML = '';
  return PARENT.innerHTML = html;
}

export default buildJobBoard;