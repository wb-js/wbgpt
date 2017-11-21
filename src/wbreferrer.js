/**
 * @overview
 * Takes the referring domain(hostname only) to the site and passes the
 * hostname to googletag/dfp ad calls.
 *
 * This script should be included AFTER googletag is loaded.
 */

let tokenName;

/**
 * @returns {string} referrer
 */
function getReferrer() {
  let url;
  let referrer;
  let match;

  if (document.referrer) {
    url = document.referrer;

    match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im);

    if (match) {
      referrer = match[1];
    }
  }

  return referrer;
}

/**
 * @returns {string} results
 */
function fromStorage() {
  let results;

  if (window.sessionStorage) {
    results = window.sessionStorage[tokenName] || false;
  }

  return results || '';
}

/**
 * @param {string} value
 */
function toStorage(value) {
  if (window.sessionStorage) {
    window.sessionStorage[tokenName] = value;
  }
  return value;
}

/**
 * @param {string} newTokenName
 */
function setTokenName(newTokenName) {
  tokenName = newTokenName;
  return tokenName;
}

/**
 * @param {string} value
 */
function set(value) {
  return toStorage(value);
}

/**
 * @returns {string}
 */
function generate() {
  const hostSite = window.location.hostname;
  const referrer = getReferrer();

  //  don't set the referrer if is a internal link
  if (referrer && hostSite !== referrer) {
    return set(referrer);
  }
  //  go get value from storage if its there
  return fromStorage();
}

/**
 * @returns {string}
 */
function get() {
  return generate().toString();
}

export {
    get,
    getReferrer,
    setTokenName,
};