import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchProductRelations from '@shopgate/pwa-common-commerce/product/actions/fetchProductRelations';
import { fetchProductsById } from '@shopgate/pwa-common-commerce/product';
import Typography from '@shopgate/engage/components/Typography';
import { ProductSlider } from '@shopgate/engage/product/components';
import { makeStyles } from '@shopgate/engage/styles';
import {
  getProductRelationsFiltered,
  getProductRelationIdsFromProperty,
  getProductsDataFromProperty,
  getRelatedProductsByIdFiltered,
} from '../../selectors';
import { TYPE_PROPERTY } from '../../helpers/constants';
import Item from '../Item';

const PLACEHOLDER_TIMEOUT = 3000;

const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: `${theme.spacing(1)}px 0`,
    marginBottom: theme.spacing(2),
  },
  headline: {
    margin: '12px 16px',
  },
}));

/**
 * Slider component. Takes productId, type and additional props and renders the ProductSlider of
 * the engage library with the related products. Placeholders are shown until the product data is
 * available.
 * @param {Object} props Props.
 * @returns {JSX}
 */
const Slider = ({
  dispatch,
  productId,
  productIds,
  products,
  type,
  headline,
  showName,
  showPrice,
  titleRows,
}) => {
  const { classes, cx } = useStyles();
  const [allowPlaceholders, setAllowPlaceholders] = useState(true);

  useEffect(() => {
    if (type !== TYPE_PROPERTY) {
      dispatch(fetchProductRelations({
        productId,
        type,
      }));
    }

    const timeout = setTimeout(() => setAllowPlaceholders(false), PLACEHOLDER_TIMEOUT);

    return () => clearTimeout(timeout);
    // Only fetch on mount like before. The parent re-mounts the slider when the product changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Products that are related via a product property need to be fetched separately.
    if (type === TYPE_PROPERTY && productIds.length) {
      dispatch(fetchProductsById(productIds));
    }
  }, [dispatch, productIds, type]);

  const availableProductIds = useMemo(() => {
    if (allowPlaceholders) {
      return productIds;
    }

    return productIds.filter(id => products[id]);
  }, [allowPlaceholders, productIds, products]);

  if (!availableProductIds.length) {
    // Should never happen in real life. But if after the timeout there's still not even one
    // product available, hide the whole thing and behave like it never happened.
    return null;
  }

  return (
    <div className={cx(classes.wrapper, 'upselling__slider')}>
      {headline && (
        <Typography
          variant="h2"
          component="h3"
          className={cx(classes.headline, 'headline')}
        >
          {headline}
        </Typography>
      )}
      <ProductSlider
        productIds={availableProductIds}
        scope="upselling"
        item={Item}
        productItemProps={{
          showName,
          showPrice,
          titleRows,
        }}
      />
    </div>
  );
};

Slider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  headline: PropTypes.string,
  products: PropTypes.shape({}),
  showName: PropTypes.bool,
  showPrice: PropTypes.bool,
  titleRows: PropTypes.number,
};

Slider.defaultProps = {
  headline: null,
  products: {},
  showName: false,
  showPrice: false,
  titleRows: null,
};

/**
 * Returns products from redux.
 * @param {Object} state State.
 * @param {Object} props Props.
 * @returns {Object}
 */
const mapStateToProps = (state, props) => {
  const params = {
    productId: props.productId,
    type: props.type,
  };

  if (params.type === TYPE_PROPERTY) {
    return {
      productIds: getProductRelationIdsFromProperty(state, props),
      products: getProductsDataFromProperty(state, props),
    };
  }

  return {
    productIds: getProductRelationsFiltered(params)(state),
    products: getRelatedProductsByIdFiltered(params)(state),
  };
};

export default connect(mapStateToProps)(Slider);
