import { css } from 'glamor';
import { isIOSTheme } from '@shopgate/pwa-extension-kit/env/helpers';
import iosStyles from './ios';
import gmdStyles from './gmd';

/**
 * Returns styles depending on current theme.
 * @returns {Object}
 */
export default () => {
  const styles = isIOSTheme() ? iosStyles : gmdStyles;

  const result = {};
  Object.keys(styles).forEach((key) => {
    result[key] = css(styles[key]).toString();
  });

  return result;
};
