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
 * @param {boolean} showPrice Show price.
 * @param {boolean} showName Show name.
 * @returns {JSX}
 */
const DefaultSlider = ({ products, showPrice, showName }) => (
  <Slider
    slidesPerView={2.3}
    classNames={{
      container: styles.defaultSliderContainer,
    }}
  >
    {
      products.map(product => (
        <Item
          product={product}
          key={product.id}
          showPrice={showPrice}
          showName={showName}
        />
      ))
    }
  </Slider>
);

DefaultSlider.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
  showName: PropTypes.bool,
  showPrice: PropTypes.bool,
};

DefaultSlider.defaultProps = {
  products: [],
  showPrice: false,
  showName: false,
};

export default DefaultSlider;
