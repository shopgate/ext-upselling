import React from 'react';
import PropTypes from 'prop-types';
import { Swiper } from '@shopgate/engage/components';
import { useWidgetSettings } from '@shopgate/engage/core';
import {
  ProductListTypeProvider,
  ProductListEntryProvider,
} from '@shopgate/engage/product';
import Item from '../../../Item';
import getStyles from '../../../../styles/slider';

const styles = getStyles();
const WIDGET_ID = '@shopgate/engage/product/ProductSlider';

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
  const widgetSettings = useWidgetSettings(WIDGET_ID) || {};
  const { slidesPerView = 2.3 } = widgetSettings;

  return (
    <ProductListTypeProvider type="productSlider" subType="upselling">
      <Swiper
        slidesPerView={slidesPerView}
        classNames={
          { container: styles.defaultSliderContainer }
        }
      >
      {
        productIds.map((id) => {
          const product = products[id] || undefined;
          const key = product ? `product-${id}` : `placeholder-${id}`;
          return (
            <Swiper.Item key={key}>
              <ProductListEntryProvider productId={id}>
                <Item
                  product={product}
                  showPrice={showPrice}
                  showName={showName}
                  titleRows={titleRows}
                />
              </ProductListEntryProvider>
            </Swiper.Item>
          );
        })
      }
      </Swiper>
    </ProductListTypeProvider>
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
