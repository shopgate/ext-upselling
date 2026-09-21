import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useThemeComponents } from '@shopgate/engage/core/hooks';
import { getProductDataById } from '@shopgate/engage/product/selectors/product';
import PlaceholderCard from './components/PlaceholderCard';
import getConfig from '../../helpers/getConfig';

/**
 * Renders a single upselling product. It uses the ProductCard provided by the theme, so the card
 * follows the merchant's theme configuration (colors, borders, shadows, name lines). While the
 * product data is not available yet, a placeholder card is rendered instead.
 * @param {Object} props Props.
 * @param {string} props.productId Product id.
 * @param {Object} [props.style] Optional inline styles passed by the ProductSlider.
 * @param {boolean} props.showName Whether the product name is shown.
 * @param {boolean} props.showPrice Whether the product price is shown.
 * @param {number|null} props.titleRows Max rows of the product name. `null` falls back to the
 * value configured within the app settings.
 * @returns {JSX}
 */
const Item = ({
  productId,
  style,
  showName,
  showPrice,
  titleRows,
}) => {
  const { ProductCard } = useThemeComponents();
  const product = useSelector(state => getProductDataById(state, { productId }));
  const { hideRatingStars = false } = getConfig();

  if (!product) {
    return (
      <PlaceholderCard
        style={style}
        titleRows={titleRows}
        hideName={!showName}
        hidePrice={!showPrice}
      />
    );
  }

  return (
    <ProductCard
      productId={productId}
      style={style}
      hideName={!showName}
      hidePrice={!showPrice}
      hideRating={hideRatingStars}
      titleRows={titleRows}
    />
  );
};

Item.propTypes = {
  productId: PropTypes.string.isRequired,
  showName: PropTypes.bool,
  showPrice: PropTypes.bool,
  style: PropTypes.shape(),
  titleRows: PropTypes.number,
};

Item.defaultProps = {
  showName: false,
  showPrice: false,
  style: null,
  titleRows: null,
};

export default Item;
