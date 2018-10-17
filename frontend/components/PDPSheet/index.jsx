import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import getProductRelationsAction
  from '@shopgate/pwa-common-commerce/product/actions/getProductRelations';
import Sheet from '../Sheet';
import getConfig from '../../helpers/getConfig';
import { pdpAddToCartSuccess$ } from '../../streams';

const { productPageAddToCart } = getConfig();

/**
 * PDP Upselling sheet.
 * Shows up on pdpAddToCartSuccess$.
 */
class PDPSheet extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
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

    if (!this.state.disabled) {
      pdpAddToCartSuccess$.subscribe(this.handleOpen);
    }
  }

  /**
   * Fetches the products on component did mount.
   */
  componentDidMount() {
    this.props.dispatch(getProductRelationsAction({
      productId: this.props.productId,
      type: productPageAddToCart.type,
    }));
  }

  /**
   * Cleanup.
   */
  componentWillUnmount() {
    pdpAddToCartSuccess$.unsubscribe(this.handleOpen);
  }

  /**
   * Handles sheet opening.
   */
  handleOpen = () => {
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
const mapStateToProps = (state) => ({
  productId: getCurrentBaseProductId(state),
});

export default connect(mapStateToProps)(PDPSheet);
