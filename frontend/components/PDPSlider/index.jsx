import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
import getConfig from '../../helpers/getConfig';
import { makeConnectProductWithRelations } from '../connectors';

const { productPage } = getConfig();

/**
 * PDPSlider component.
 * @returns {JSX}
 */
const PDPSlider = ({ productId }) => {
  if (!productId) {
    return null;
  }

  return (
    <Slider
      headline={productPage.headline}
      type={productPage.type}
      productId={productId}
      showPrice={productPage.showPrice || false}
      showName={productPage.showName || false}
      titleRows={productPage.nameLines || 2}
    />
  );
};

PDPSlider.propTypes = {
  productId: PropTypes.string,
};

PDPSlider.defaultProps = {
  productId: null,
};

export default makeConnectProductWithRelations(productPage.type)(memo(PDPSlider));
