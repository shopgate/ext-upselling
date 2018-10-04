import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import Slider from '../Slider';
import getConfig from '../../helpers/getConfig';

const { productPage } = getConfig();

/**
 * PDPSlider component.
 * @param {Object} props Props.
 * @returns {JSX}
 */
const PDPSlider = props => (
  <Slider
    headline={productPage.headline}
    type={productPage.type}
    productId={props.productId}
    showPrice={productPage.showPrice || false}
    showName={productPage.showName || false}
  />
);

PDPSlider.propTypes = {
  productId: PropTypes.string.isRequired,
};

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  productId: getCurrentBaseProductId(state),
});

export default connect(mapStateToProps)(PDPSlider);
