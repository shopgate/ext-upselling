import React from 'react';
import PropTypes from 'prop-types';
import Card from '@shopgate/pwa-ui-shared/Card';
import isiOSTheme from '../../helpers/isiOSTheme';
import IOSProductCard from './components/ios11/ProductCard';
import GMDProductCard from './components/gmd/ProductCard';
import PlaceholderCard from './components/PlaceholderCard';
import getStyles from '../../styles/slider';

const styles = getStyles();

/**
 * Slider item component.
 * @param {Object} props Props.
 * @param {Object} props.product Product data.
 * @param {boolean} showName Show name.
 * @param {boolean} showPrice Show price.
 * @param {number} titleRows Max possible title rows.
 * @returns {JSX}
 */
const Item = ({
  product,
  showName,
  showPrice,
  titleRows,
}) => {
  let ProductCard = isiOSTheme() ? IOSProductCard : GMDProductCard;

  // Show a placehoolder if product is not yet available.
  if (!product) {
    ProductCard = PlaceholderCard;
  }

  return (
    <div className={styles.defaultSliderItem}>
      <Card className={styles.defaultSliderCard}>
        <ProductCard
          product={product}
          hideName={!showName}
          hidePrice={!showPrice}
          hideRating
          titleRows={titleRows}
        />
      </Card>
    </div>
  );
};

Item.propTypes = {
  product: PropTypes.shape({}),
  showName: PropTypes.bool,
  showPrice: PropTypes.bool,
  titleRows: PropTypes.number,
};

Item.defaultProps = {
  product: null,
  showName: false,
  showPrice: false,
  titleRows: 2,
};

export default Item;
