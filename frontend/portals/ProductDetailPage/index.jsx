import React from 'react';
import PropTypes from 'prop-types';
import PDPSlider from '../../components/PDPSlider';
import getConfig from '../../helpers/getConfig';

const { productPage } = getConfig();

/**
 * Renders PDPSlider if type is condigured and position matches the productPage configuration.
 *
 * @param {Object} props Props.
 * @param {string} name Portal position.
 * @returns {JSX}
 */
const ProductDetailPage = ({ name }) => {
  // No relation type configured.
  if (!productPage.type) {
    return null;
  }
  // Portal position is different than configured.
  if (name !== productPage.position) {
    return null;
  }

  return <PDPSlider />;
};

ProductDetailPage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ProductDetailPage;
