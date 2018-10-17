import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@shopgate/pwa-common/components/Slider';
import Item from './components/Item';
import getStyles from '../../../../styles/slider';

const styles = getStyles();

/**
 * Renders default Slider.
 * @param {Object} props Props.
 * @param {Array} props.products Products.
 * @param {Array} props.productIds Product ids.
 * @param {boolean} showPrice Show price.
 * @param {boolean} showName Show name.
 * @returns {JSX}
 */
const DefaultSlider = ({
  products,
  productIds,
  showPrice,
  showName,
}) => (
  <Slider
    slidesPerView={2.3}
    classNames={{
      container: styles.defaultSliderContainer,
    }}
  >
    {
      productIds.map((id) => {
        const product = products[id];
        const key = product ? `product-${id}` : `placeholder-${id}`;
        return (
          <Item
            product={product}
            key={key}
            showPrice={showPrice}
            showName={showName}
          />
        );
      })
    }
  </Slider>
);

DefaultSlider.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string),
  products: PropTypes.shape({}),
  showName: PropTypes.bool,
  showPrice: PropTypes.bool,
};

DefaultSlider.defaultProps = {
  productIds: [],
  products: [],
  showPrice: false,
  showName: false,
};

export default DefaultSlider;
