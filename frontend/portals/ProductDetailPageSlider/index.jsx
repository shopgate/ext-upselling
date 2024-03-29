import React from 'react';
import PropTypes from 'prop-types';
import PDPSlider from '../../components/PDPSlider';
import getConfig from '../../helpers/getConfig';

const { productPage } = getConfig();
const configs = Array.isArray(productPage) ? productPage : [productPage];

/**
 * Renders PDPSlider if type is condigured and position matches the productPage configuration.
 *
 * @param {Object} props Props.
 * @param {string} name Portal position.
 * @returns {JSX}
 */
const ProductDetailPage = ({ name }) => {
  const sliders = configs.map((config, idx) => {
    // No relation type configured.
    if (!config.type) {
      return null;
    }
    // Portal position is different than configured.
    if (name !== config.position) {
      return null;
    }

    return <PDPSlider key={`key_${idx}_${config.type}`} config={config} />;
  }).filter(Boolean);

  if (sliders.length === 0) {
    return null;
  }

  return <div>{sliders}</div>;
};

ProductDetailPage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ProductDetailPage;
