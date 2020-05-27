import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchProductRelations from '@shopgate/pwa-common-commerce/product/actions/fetchProductRelations';
import { routeWillLeave$ } from '@shopgate/pwa-common/streams/router';
import Sheet from '../Sheet';
import { pdpAddToCartSuccess$ } from '../../streams';
import { makeConnectProductWithRelations } from '../connectors';
import getConfig from '../../helpers/getConfig';

const { productPageAddToCart } = getConfig();

/**
 * PDP Upselling sheet.
 * Shows up on pdpAddToCartSuccess$.
 */
class PDPSheet extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    productId: PropTypes.string,
  };

  static defaultProps = {
    productId: null,
  };

  /**
   * Gets max items per line from config or falls back to 3 is config is invalid or missing.
   * @returns {number}
   */
  static get maxItemsPerLine() {
    if (
      productPageAddToCart.maxItemsPerLine >= 1
      && productPageAddToCart.maxItemsPerLine <= 3
    ) {
      return productPageAddToCart.maxItemsPerLine;
    }

    return 3;
  }

  /**
   * Constructor.
   * @inheritDoc
   */
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      disabled: !(productPageAddToCart.type && productPageAddToCart.headline),
    };
  }

  /**
   * Fetches the products on component did mount.
   * @inheritDoc
   */
  componentDidMount() {
    if (this.state.disabled) {
      return;
    }
    pdpAddToCartSuccess$.subscribe(this.handleOpen);
    routeWillLeave$.subscribe(this.handleClose);
    this.fetchProductData();
  }

  /**
   * @inheritDoc
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.disabled) {
      return false;
    }
    if (this.props.productId !== nextProps.productId) {
      return true;
    }

    return this.state.isOpen !== nextState.isOpen;
  }

  /**
   * @inheritDoc
   */
  componentDidUpdate(prevProps) {
    if (this.state.disabled) {
      return;
    }
    if (
      !this.props.productId
      || prevProps.productId === this.props.productId
    ) {
      return;
    }
    this.fetchProductData();
  }

  fetchProductData = () => {
    if (!this.props.productId) {
      return;
    }
    this.props.dispatch(fetchProductRelations({
      productId: this.props.productId,
      type: productPageAddToCart.type,
    }));
  };

  /**
   * Handles sheet opening.
   */
  handleOpen = () => {
    if (!this.props.productId) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };

  /**
   * Handles sheet closing.
   */
  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  /**
   * Renders sheet.
   * @returns {JSX}
   */
  render() {
    if (this.state.disabled) {
      return null;
    }

    if (!this.props.productId) {
      return null;
    }
    return (
      <Sheet
        type={productPageAddToCart.type}
        productId={this.props.productId}
        isOpen={this.state.isOpen}
        onClose={this.handleClose}
        headline={productPageAddToCart.headline}
        showName={productPageAddToCart.showName || false}
        showPrice={productPageAddToCart.showPrice || false}
        titleRows={productPageAddToCart.nameLines || 2}
        maxItemsPerLine={this.constructor.maxItemsPerLine}
      />
    );
  }
}

export default makeConnectProductWithRelations(productPageAddToCart.type)(
  PDPSheet
);
