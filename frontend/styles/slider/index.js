import { css } from 'glamor';
import isiOSTheme from '../../helpers/isiOSTheme';
import iosStyles from './ios';
import gmdStyles from './gmd';

/**
 * Returns styles depending on current theme.
 * @returns {Object}
 */
export default () => {
  const styles = isiOSTheme() ? iosStyles : gmdStyles;

  const result = {};
  Object.keys(styles).forEach(key => {
    result[key] = css(styles[key]).toString()
  });

  return result;
};
