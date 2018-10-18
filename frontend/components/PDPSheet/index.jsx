import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import getProductRelationsAction
  from '@shopgate/pwa-common-commerce/product/actions/getProductRelations';
import { routeDidChange$ } from '@shopgate/pwa-common/streams/history';
import Sheet from '../Sheet';
import getConfig from '../../helpers/getConfig';
import { pdpAddToCartSuccess$ } from '../../streams';

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
    routeDidChange$.subscribe(this.handleClose);
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
    this.props.dispatch(getProductRelationsAction({
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
        showName={productPageAddToCart.showName}
        showPrice={productPageAddToCart.showPrice}
        headline={productPageAddToCart.headline}
      />
    );
  }
}
/**
 * Maps currentProductId to productId prop.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  productId: getCurrentBaseProductId(state),
});

export default connect(mapStateToProps)(PDPSheet);
