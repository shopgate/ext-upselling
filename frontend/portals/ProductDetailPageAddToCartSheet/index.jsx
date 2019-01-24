import React, { Component } from 'react';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { routeWillEnter$ } from '@shopgate/pwa-common/streams';
import { ITEM_PATTERN } from '@shopgate/pwa-common-commerce/product/constants';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import PDPSheet from '../../components/PDPSheet';

/**
 * Maintains the correct productId state for the extension.
 */
class ProductDetailPageAddToCartSheet extends Component {
  /**
   * Extracts data for new state from route.
   * @param {Object} route Route object.
   * @returns {Object}
   */
  static getStateFromRoute(route) {
    if (!route || !route.pattern) {
      return {
        productId: null,
      };
    }

    const currentPageIsPDP = route.pattern === ITEM_PATTERN;
    if (!currentPageIsPDP) {
      return { productId: null };
    }
    return { productId: hex2bin(route.params.productId) };
  }

  /**
   * Constructs and prepares initial state.
   * @inheritDoc
   */
  constructor(props) {
    super(props);
    this.state = this.constructor.getStateFromRoute(getCurrentRoute());

    routeWillEnter$.subscribe(({ action }) => this.handleRouteUpdate(action.route));
    // In case of reloading page on item, call it also on init.
  }

  /**
   * Handles route change.
   * @param {Object} route Route object.
   */
  handleRouteUpdate(route) {
    this.setState(this.constructor.getStateFromRoute(route));
  }

  /**
   * @inheritDoc
   */
  render() {
    return <PDPSheet productId={this.state.productId} />;
  }
}

export default ProductDetailPageAddToCartSheet;
