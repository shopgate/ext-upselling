import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@shopgate/pwa-common/components/Slider';
import Item from '../../../../components/Item';
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
  titleRows,
}) => {
  const availableProductsIds = productIds.filter(id => products[id]);
  if (!availableProductsIds.length) {
    return null;
  }

  return (
    <Slider
      slidesPerView={2.3}
      classNames={{
        container: styles.defaultSliderContainer,
      }}
      key={`product-relations-slider-${availableProductsIds.length}`}
    >
      {
        availableProductsIds.map((id) => {
          const product = products[id] || undefined;
          const key = `product-${id}`;
          return (
            <Slider.Item key={key}>
              <Item
                product={product}
                showPrice={showPrice}
                showName={showName}
                titleRows={titleRows}
              />
            </Slider.Item>
          );
        })
      }
    </Slider>
  );
};

DefaultSlider.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string),
  products: PropTypes.shape({}),
  showName: PropTypes.bool,
  showPrice: PropTypes.bool,
  titleRows: PropTypes.number,
};

DefaultSlider.defaultProps = {
  productIds: [],
  products: [],
  showPrice: false,
  showName: false,
  titleRows: 2,
};

export default DefaultSlider;
