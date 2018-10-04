import React from 'react';
import Slider from '@shopgate/pwa-common/components/Slider';
import Card from '@shopgate/pwa-ui-shared/Card';
import isiOSTheme from '../../../../../../helpers/isiOSTheme';
import IOSProductCard from './components/ios11/ProductCard';
import GMDProductCard from './components/gmd/ProductCard';
import getStyles from '../../../../../../styles/slider';

const styles = getStyles();

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
  )
};

export default Item;
