import React from 'react';
import PDPSlider from '../../components/PDPSlider';
import getConfig from '../../helpers/getConfig';

const { productPage } = getConfig();

const ProductDetailPage = (props) => {
  // No relation type configured.
  if (!productPage.type) {
    return null;
  }
  // Portal position is different than configured.
  if (props.name !== productPage.position) {
    return null;
  }

  return <PDPSlider />
};

export default ProductDetailPage;
