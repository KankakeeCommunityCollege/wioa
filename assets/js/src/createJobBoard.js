const API_PARAMS = {
  'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
};

const SHEET_PARAMS = {
  spreadsheetId: '1KXofC8gI2vLEeBRRb7uFzA36wDfMDktipUETV8gkpZg',
  range: 'Post a job opening'
}

function fetchJobs() {
  gapi.client.init(API_PARAMS).then(() => {
    return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS);
  }).then(response => {
    return import('./filterJobBoardData').then(({ default: filterJobBoardData }) => {
      return filterJobBoardData(response);
    }).then(data => {
      const PARENT = fetchJobs.parentEl;

      return import('./buildJobBoard').then(({default: buildJobBoard}) => buildJobBoard(PARENT, data))
    })
  }, err => {
    console.error(`Error in JobBoard: ${err}`, err);
  })
}
/**
 * 
 * @param {Element} PARENT - PARENT is the parent-element selected via .getElementById() in the file all.js.
 * The PARENT element will get the job-board's HTML injected into it after all the data has loaded.
 * It is set to `<div id="JobBoardWidget">` on the homepage and `<div id="JobBoard">` on the job-board page.
 */
function createJobBoard(PARENT) {
  fetchJobs.parentEl = PARENT;
  gapi.load('client', fetchJobs);
}

export default createJobBoard;