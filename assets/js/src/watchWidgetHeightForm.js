const WIDGET_IFRAME = document.getElementById('g_IwnSuccessStories');
const FORM = document.getElementById('widgetHeightForm');
const DISABLED_LIST = document.querySelectorAll('.formDisabled'); // Form elements with this class will have their `disabled` attributes removed
const heightPref = FORM.querySelector('#widgetHeightPref');
const rememberPref = FORM.querySelector('#rememberPref');
const CLEAR_PREFERENCES_BUTTON = FORM.querySelector('#clearPrefs');
const widgetHeightStorageKey = 'wioaSuccessStoryWidgetHeightPreference';

function submitHandler(e) {
  e.preventDefault();

  WIDGET_IFRAME.height = heightPref.value;
  if (rememberPref.checked == true) {
    window.localStorage.setItem(widgetHeightStorageKey, heightPref.value);
  }
}

function resetPreferences() {
  window.localStorage.removeItem(widgetHeightStorageKey);
  window.location.reload();
}

function watchWidgetHeightForm() {
  FORM.addEventListener('submit', submitHandler, false);

  // All form elements are disabled on page-load -- attributes are hard-coded into HTML.
  //  This prevents the user from submitting the form which causes a page reload b/c...
  //  The Success Stories widget takes too long to load:
  //    - The widget loading blocks the main JS thread
  //    - Page will reload if form is submitted prior to main JS bundle running
  //    - Main bundle uses `e.preventDefault()` to stop page reloading.
  DISABLED_LIST.forEach(item => item.removeAttribute('disabled'));

  if (window.localStorage.getItem(widgetHeightStorageKey)) {
    // Recall settings if they exist
    WIDGET_IFRAME.height = window.localStorage.getItem(widgetHeightStorageKey);
    heightPref.value = window.localStorage.getItem(widgetHeightStorageKey);
    CLEAR_PREFERENCES_BUTTON.removeAttribute('disabled'); // This button isn't included in `DISABLED_LIST`
  }

  CLEAR_PREFERENCES_BUTTON.addEventListener('click', resetPreferences);
}

export default watchWidgetHeightForm;