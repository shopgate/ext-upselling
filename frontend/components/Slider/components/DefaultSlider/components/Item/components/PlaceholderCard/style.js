import { css } from 'glamor';
import isiOSTheme from '../../../../../../../../helpers/isiOSTheme';

/**
 * Glow animation.
 */
const placeholderCycle = css.keyframes('placeholder-cycle', {
  '0%': {
    backgroundPosition: '-240% 0',
  },
  '100%': {
    backgroundPosition: '240% 0',
  },
});

/**
 * Main wrapper.
 */
const wrapper = css({
  height: 'auto',
  position: 'relative',
  // Glow animation
  ':after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.35) 29%,rgba(255,255,255,0.35) 30%,rgba(255,255,255,0.35) 48%,rgba(255,255,255,0.35) 52%,rgba(255,255,255,0.35) 70%,rgba(255,255,255,0) 100%)',
    backgroundSize: '60% 100%',
    backgroundRepeat: 'no-repeat',
    animation: `${placeholderCycle} 1s infinite`,
    transform: 'translate3d(0,0,0)',
  },
}).toString();

/**
 * Image placeholder.
 */
const image = css({
  display: 'block',
  width: '100%',
  background: 'rgba(197,197,197,0.2)',
}).toString();

/**
 * Template rows helper.
 * @param {number} titleRows Title rows.
 * @param {boolean} hideName Hide name.
 * @returns {string}
 */
const getParagraphRemplateRows = (titleRows, hideName) => {
  if (hideName) {
    return '0';
  }

  return `repeat(${titleRows}, 1fr)`;
};

/**
 * Paragraph margin bottom helper.
 * @param {boolean} hideName Hide name.
 * @param {boolean} hidePrice Hide price.
 * @returns {string}
 */
const getParagraphMarginBottom = (hideName, hidePrice) => {
  const isIOS = isiOSTheme();
  if (hideName && hidePrice) {
    return '0';
  }

  if (hideName) {
    return isIOS ? '1.8em' : 'calc(1.75em - 1px)';
  }

  if (hidePrice) {
    return '0';
  }

  return isIOS ? '1.8em' : '1.75em';
};

/**
 * Paragraph css factory.
 * @param {number} titleRows Expected title rows.
 * @param {boolean} hideName Hide name.
 * @param {boolean} hidePrice Hide price.
 * @returns {string}
 */
const paragraph = (titleRows, hideName, hidePrice) => css({
  display: 'grid',
  background: 'linear-gradient(to bottom, rgba(197,197,197,0) 0%,rgba(197,197,197,0) 20%,rgba(197,197,197,0.4) 20.1%,rgba(197,197,197,0.4) 50%,rgba(197,197,197,0.4) 80%,rgba(197,197,197,0) 80.1%,rgba(197,197,197,0) 100%) repeat',
  backgroundSize: `100% ${100 / titleRows}%`,
  gridTemplateRows: getParagraphRemplateRows(titleRows, hideName),
  marginBottom: getParagraphMarginBottom(hideName, hidePrice), // Price line height
  color: 'transparent',
  fontSize: isiOSTheme() ? 14 : 'inherit',
}).toString();

export default {
  wrapper,
  image,
  paragraph,
};
