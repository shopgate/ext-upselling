import { css } from 'glamor';

/**
 * Base height helper.
 * @param {number} itemsCount How many items are visible.
 * @returns {string}
 */
const getBaseHeight = (itemsCount) => {
  if (itemsCount === 1) {
    return '200vw';
  }

  return '100vw';
};

/**
 * Sheet.
 * @param {number} itemsCount How many items are visible.
 * @returns {string}
 */
const sheet = itemsCount => css({
  maxHeight: getBaseHeight(itemsCount),
  boxShadow: '0 0 5px rgba(0,0,0,0.5)',
}).toString();

/**
 * Content.
 * @param {number} itemsCount How many items are visible.
 * @returns {string}
 */
const content = itemsCount =>  css({
  maxHeight: `calc(${getBaseHeight(itemsCount)} - 56px - var(--safe-area-inset-top))`,
}).toString();

export default {
  sheet,
  content,
};
