/**
*  @function filterFunction filters out job posts that are older than 30 days old.
 * @param {Array} arr Is an array that happens represents 1 row from the Google Sheet.
 *                    Since we are using the `Array.prototype.filter()` method,
 *                    we do not need to do any iteration — each row will be processed.
 * @returns A value that coerces to `true` to keep jobs not older than 30 days posted,
 * or returns a value that coerces to `false` if the 
 */
function filterFunction(arr) {
  const now = new Date;
  const posted = new Date(arr[0]);
  const expired = new Date(posted.setDate(posted.getDate() + 30));

  return now.getTime() > expired.getTime() ? 0 : 1;
}
/**
 * 
 * @param {Object} response is the returned response object from a Google Sheets API v4 `spreadsheets.values.get()` call
 * @returns Returns an array that holds an array for each row in the Google Sheet that receives the request to post a job.
 */
function filterJobBoardData(response) {
  const DATA = response.result.values.slice(1);
  const filteredData = DATA.filter(filterFunction);

  return filteredData
}

export default filterJobBoardData;