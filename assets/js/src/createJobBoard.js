const API_PARAMS = {
  'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
};

const SHEET_PARAMS = {
  spreadsheetId: '1KXofC8gI2vLEeBRRb7uFzA36wDfMDktipUETV8gkpZg',
  range: 'APPROVED JOB POSTS ONLY'
}

function fetchJobs() {
  gapi.client.init(API_PARAMS).then(() => {
    return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS);
  }).then(response => {
    return import('./filterJobBoardData').then(({ default: filterJobBoardData }) => {
      return filterJobBoardData(response);
    }).then(data => {
      return import('./buildJobBoard').then(({default: buildJobBoard}) => buildJobBoard(data))
    })
  }, err => {
    console.error(`Error in JobBoard: ${err}`, err);
  })
}

function createJobBoard() {
  gapi.load('client', fetchJobs);
}

export default createJobBoard;
