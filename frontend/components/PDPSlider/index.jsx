import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { withPageProductId } from '@shopgate-ps/pwa-extension-kit/connectors';
import Slider from '../Slider';
import getConfig from '../../helpers/getConfig';

const { productPage } = getConfig();

/**
 * PDPSlider component.
 * @param {Object} props Props.
 */
class PDPSlider extends Component {
  static propTypes = {
    productId: PropTypes.string,
  };

  static defaultProps = {
    productId: null,
  };

  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props);
    this.lastProductId = this.props.productId;
  }
  /**
   * Component should never update once it has productId due to Trampoline/Router issues.
   * @returns {boolean} Always false.
   */
  shouldComponentUpdate() {
    return !this.lastProductId;
  }

  /**
   * @inheritDoc
   */
  render() {
    if (!this.props.productId) {
      return null;
    }
    this.lastProductId = this.props.productId;

    return (
      <Slider
        headline={productPage.headline}
        type={productPage.type}
        productId={this.props.productId}
        showPrice={productPage.showPrice || false}
        showName={productPage.showName || false}
        titleRows={productPage.nameLines || 2}
      />
    );
  }
}

/**
 * Maps state to props.
 * @param {Object} state State.
 * @param {Object} props Props.
 * @returns {Object}
 */
const mapStateToProps = (state, props) => ({
  productId: getBaseProductId(state, props),
});

export default withPageProductId(connect(mapStateToProps)(PDPSlider));
