import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@shopgate/pwa-common/components/Slider';
import Card from '@shopgate/pwa-ui-shared/Card';
import isiOSTheme from '../../../../../../helpers/isiOSTheme';
import IOSProductCard from './components/ios11/ProductCard';
import GMDProductCard from './components/gmd/ProductCard';
import getStyles from '../../../../../../styles/slider';

const styles = getStyles();

/**
 * Slider item component.
 * @param {Object} props Props.
 * @param {Object} props.product Product data.
 * @param {boolean} showName Show name.
 * @param {boolean} showPrice Show price.
 * @returns {JSX}
 */
const Item = ({ product, showName = true, showPrice = true }) => {
  const ProductCard = isiOSTheme() ? IOSProductCard : GMDProductCard;

  return (
    <Slider.Item key={product.id}>
      <Card className={styles.defaultSliderCard}>
        <ProductCard
          product={product}
          hideName={!showName}
          hidePrice={!showPrice}
          hideRating
          titleRows={2}
        />
      </Card>
    </Slider.Item>
  );
};

Item.propTypes = {
  product: PropTypes.shape({}).isRequired,
  showName: PropTypes.bool,
  showPrice: PropTypes.bool,
};

Item.defaultProps = {
  showName: false,
  showPrice: false,
};

export default Item;
