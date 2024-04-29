const widgetIframe = document.getElementById('g_IwnSuccessStories');
const form = document.getElementById('widgetHeightForm');
const disabledList = document.querySelectorAll('.formDisabled'); // Form elements with this class will have their `disabled` attributes removed
const heightPref = form.querySelector('#widgetHeightPref');
const rememberPref = form.querySelector('#rememberPref');
const clearPreferencesButton = form.querySelector('#clearPrefs');
const widgetHeightStorageKey = 'wioaSuccessStoryWidgetHeightPreference';

function submitHandler(e) {
  e.preventDefault();

  widgetIframe.height = heightPref.value;
  if (rememberPref.checked == true) {
    window.localStorage.setItem(widgetHeightStorageKey, heightPref.value);
  }
}

function resetPreferences() {
  window.localStorage.removeItem(widgetHeightStorageKey);
  window.location.reload();
}

function watchWidgetHeightForm() {
  form.addEventListener('submit', submitHandler, false);

  // All form elements are disabled on page-load -- attributes are hard-coded into HTML.
  //  This prevents the user from submitting the form which causes a page reload b/c...
  //  The Success Stories widget takes too long to load:
  //    - The widget loading blocks the main JS thread
  //    - Page will reload if form is submitted prior to main JS bundle running
  //    - Main bundle uses `e.preventDefault()` to stop page reloading.
  disabledList.forEach(item => item.removeAttribute('disabled'));

  if (window.localStorage.getItem(widgetHeightStorageKey)) {
    // Recall settings if they exist
    widgetIframe.height = window.localStorage.getItem(widgetHeightStorageKey);
    heightPref.value = window.localStorage.getItem(widgetHeightStorageKey);
    clearPreferencesButton.removeAttribute('disabled'); // This button isn't included in `disabledList`
  }

  clearPreferencesButton.addEventListener('click', resetPreferences);
}

export default watchWidgetHeightForm;
