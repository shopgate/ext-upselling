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

  if (!config) {
    return null;
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
  config: PropTypes.shape({
    headline: PropTypes.string,
    nameLines: PropTypes.number,
    property: PropTypes.string,
    showName: PropTypes.bool,
    showPrice: PropTypes.bool,
    titleRows: PropTypes.number,
    type: PropTypes.string.isRequired,
  }),
  productId: PropTypes.string,
};

PDPSlider.defaultProps = {
  productId: null,
  config: {},
};

export default makeConnectProductWithRelations()(memo(PDPSlider));
