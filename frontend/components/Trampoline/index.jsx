import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from './connector';

/**
 * TrampolinePage to redirect from one product to another product.
 * This is needed because we need for now always a page in between two product pages.
 */
class TrampolinePage extends Component {
  /**
   * Creates a trampoline url.
   * @param {string} pathname Pathname (without or without leading slash)
   * @returns {string}
   */
  static getTrampolineUrl(pathname) {
    if (pathname.startsWith('/')) {
      // eslint-disable-next-line no-param-reassign
      pathname = pathname.slice(1);
    }
    return `${this.TRAMPOLINE_PATH}/${pathname}`;
  }

  /**
   * Trampoline path
   * @returns {string}
   */
  static get TRAMPOLINE_PATH() {
    return '/trampoline';
  }

  static propTypes = {
    redirect: PropTypes.func.isRequired,
    redirectTo: PropTypes.string.isRequired,
  };

  /**
   * Redirect the user immediately
   * @param {Object} props Props
   */
  constructor(props) {
    super(props);
    props.redirect(props.redirectTo);
  }

  /**
   * Renders.
   * @returns {JSX}
   */
  render() {
    return null;
  }
}

export default connect(TrampolinePage);
