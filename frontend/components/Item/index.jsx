import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '@shopgate/engage/core';
import { Card } from '@shopgate/engage/components';
import { ProductCard as ProductCardBase } from '@shopgate/engage/product';
import PlaceholderCard from './components/PlaceholderCard';
import getStyles from '../../styles/slider';
import getConfig from '../../helpers/getConfig';

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
  const { hideRatingStars } = getConfig();
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  let ProductCard = ProductCardBase;

  // Show a placeholder if product is not yet available.
  if (!product) {
    ProductCard = PlaceholderCard;
  }

  return (
    <div className={styles.defaultSliderItem}>
      <Card className={styles.defaultSliderCard}>
        {/** Add context with current product. Image component and image badges using it */}
        <ProductContext.Provider
          value={{
            productId: product ? product.id : null,
          }}
        >
          <ProductCard
            product={product}
            hideName={!showName}
            hidePrice={!showPrice}
            titleRows={titleRows}
            hideRating={hideRatingStars}
          />
        </ProductContext.Provider>
      </Card>
    </div>
  );
};

Item.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
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
