import { css } from 'glamor';

/**
 * Base height helper.
 * @param {number} itemsCount How many items are visible.
 * @param {number} maxAllowed Maximum allowed items per line.
 * @returns {string}
 */
const getBaseHeight = (itemsCount, maxAllowed) => {
  if (itemsCount > maxAllowed) {
    switch (maxAllowed) {
      case 1:
        return '150vw';
      case 2:
        return '125vw';
      default:
        return '100vw';
    }
  }
  // Items count less or equal max -> one line, no need to shrink it.
  return '200vw';
};

/**
 * Sheet.
 * @param {number} itemsCount How many items are visible.
 * @param {number} maxAllowed Maximum allowed items per line
 * @returns {string}
 */
const sheet = (itemsCount, maxAllowed) => css({
  maxHeight: getBaseHeight(itemsCount, maxAllowed),
  boxShadow: '0 0 5px rgba(0,0,0,0.5)',
  zIndex: 10,
  marginBottom: 'var(--footer-height)',
}).toString();

/**
 * Content.
 * @param {number} itemsCount How many items are visible.
 * @param {number} maxAllowed Maximum allowed items per line
 * @returns {string}
 */
const content = (itemsCount, maxAllowed) => css({
  maxHeight: `calc(${getBaseHeight(itemsCount, maxAllowed)} - 56px - var(--safe-area-inset-top))`,
}).toString();

export default {
  sheet,
  content,
};
