const displayCalled = new Set();
let destroyCalled = [];
let refreshCalled = [];

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.display
 *
 * @param {string} divId
 */
function display(divId) {
  displayCalled.add(divId);
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_refresh
 *
 * @param {Array|null}  [slots]   - An array of GPT Slot(s) to be refreshed.
 * @param {Object|null} [options] - Configuration associated with this refresh call.
 */
function refresh(slots = null, options = null) {
  refreshCalled.push([slots, options]);
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.destroySlots
 *
 * @param {Array|null} [slots] - An array of GPT Slot(s) to be destroyed.
 */
function destroySlots(slots = null) {
  destroyCalled.push(slots);
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.defineSlot
 *
 * @param {string} adUnitPath
 * @param {Array}  size
 * @param {string} divId
 * @returns {Object}
 */
function defineSlot(adUnitPath, size, divId) {
  return {
    adUnitPath,
    size,
    divId,
    targeting: {},
    addService() {
    },
    setTargeting(key, value) {
      this.targeting[key] = value;
    },
    getTargeting(key) {
      return this.targeting[key] || null;
    },
  };
}

/**
 * @link https://developers.google.com/doubleclick-gpt/reference#googletag.defineOutOfPageSlot
 *
 * @returns {Object}
 */
function defineOutOfPageSlot(...args) {
  return defineSlot(...args);
}

/**
 * Returns the stack of calls to "pubads().destroySlots".
 * Use this in tests to assert that destroySlots was called with the expected arguments.
 *
 * @returns {Array}
 */
function getDestroyCalledStack() {
  return destroyCalled;
}

/**
 * Returns the stack of calls to "pubads().refresh".
 * Use this in tests to assert that refresh was called with the expected arguments.
 *
 * @returns {Array}
 */
function getRefreshCalledStack() {
  return refreshCalled;
}

/**
 * @param {string} divId
 *
 * @returns {boolean}
 */
function wasDisplayCalledForDivId(divId) {
  return displayCalled.has(divId);
}

/**
 * Resets state of mock service.
 */
function reset() {
  destroyCalled = [];
  displayCalled.clear();
  refreshCalled = [];
}

const googletag = {
  display,
  defineSlot,
  defineOutOfPageSlot,
  destroySlots,
  pubads() {
    return { refresh };
  },
};

export {
  googletag as default,
  wasDisplayCalledForDivId,
  getDestroyCalledStack,
  getRefreshCalledStack,
  reset,
};