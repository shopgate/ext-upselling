import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
import { makeConnectProductWithRelations } from '../connectors';

/**
 * PDPSlider component.
 * @returns {JSX}
 */
const PDPSlider = ({ productId, config }) => {
  if (!productId) {
    return null;
  }

  if (config.length === 0) {
    return null
  }

  return (
    <Slider
      headline={config.headline}
      type={config.type}
      productId={productId}
      showPrice={config.showPrice || false}
      showName={config.showName || false}
      titleRows={config.nameLines || 2}
      property={config.property}
    />
  );
};

PDPSlider.propTypes = {
  productId: PropTypes.string,
  config: PropTypes.shape({})
};

PDPSlider.defaultProps = {
  productId: null,
  config: {}
};

export default makeConnectProductWithRelations()(memo(PDPSlider));
