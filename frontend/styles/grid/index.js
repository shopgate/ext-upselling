import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors } = themeConfig;

const wrapper = css({
  justifyContent: 'flex-start',
  background: colors.background,
  padding: '0.5em',
}).toString();

/**
 * Returns grid item className.
 * @param {number} itemsPerLine Items per line.
 * @returns {string}
 */
const item = (itemsPerLine) => {
  let width = '33.33%';
  if (itemsPerLine === 1) {
    width = '100%';
  }

  if (itemsPerLine === 2) {
    width = '50%';
  }

  return css({
    width,
  }).toString();
};

export default {
  wrapper,
  item,
};
