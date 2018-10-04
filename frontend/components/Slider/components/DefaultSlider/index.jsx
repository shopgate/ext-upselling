import React  from 'react';
import Slider from '@shopgate/pwa-common/components/Slider';
import Item from './components/Item';
import getStyles from '../../../../styles/slider';

const styles = getStyles();

const DefaultSlider = ({ products, showPrice, showName }) => {
  return (
    <Slider
      slidesPerView={2.3}
      classNames={{
        container: styles.defaultSliderContainer,
      }}
    >
      {
        products.map((product) => (
          <Item
            product={product}
            key={product.id}
            showPrice={showPrice}
            showName={showName}
          />
      ))
      }
    </Slider>
  )
};

export default DefaultSlider;
