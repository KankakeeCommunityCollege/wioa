/**
*  @function filterFunction filters out job posts that are older than 60 days old.
 * @param {Array} arr Is an array that happens represents 1 row from the Google Sheet.
 *                    Since we are using the `Array.prototype.filter()` method,
 *                    we do not need to do any iteration — each row will be processed.
 * @returns A value that coerces to `true` to keep jobs not older than 30 days posted,
 * or returns a value that coerces to `false` if the 
 */
function filterFunction(arr) {
  const now = new Date;
  const posted = new Date(arr[0]);
  // Job posts default to 60 days
  const expired = new Date(posted.setDate(posted.getDate() + 60));

  return now.getTime() > expired.getTime() ? 0 : 1;
}

/**
 * 
 * @param {Object} response is the returned response object from a Google Sheets API v4 `spreadsheets.values.get()` call
 * @returns Returns an array that holds an array for each row in the Google Sheet that receives the request to post a job.
 */
function filterJobBoardData(response) {
  const data = response.result.values.slice(1);

  // Reverse the order of the returned data so that the newest job posts appear first.
  return data.filter(filterFunction).reverse();
}

export default filterJobBoardData;
