import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProductRelations } from '@shopgate/engage/product';
import { Grid as GridComponent } from '@shopgate/engage/components';
import { makeStyles } from '@shopgate/engage/styles';
import {
  getProductRelationsFiltered,
  getRelatedProductsByIdFiltered,
} from '../../selectors';
import Item from '../Item';

const REQUEST_TIMEOUT = 2000;

const ITEM_WIDTHS = {
  1: '100%',
  2: '50%',
  3: '33.33%',
};

const useStyles = makeStyles()((theme, { itemsPerLine }) => ({
  wrapper: {
    justifyContent: 'flex-start',
    background: theme.palette.background.default,
  },
  headline: {
    ...theme.typography.h5,
    margin: theme.spacing(2),
  },
  item: {
    width: ITEM_WIDTHS[itemsPerLine] || ITEM_WIDTHS[3],
    padding: theme.spacing(1),
  },
}));

/**
 * Grid component. Takes productId, type and additional props and renders a grid with the related
 * products. Placeholders are shown until the product data is available.
 * @param {Object} props Props.
 * @returns {JSX}
 */
const Grid = ({
  dispatch,
  productId,
  productIds,
  products,
  type,
  headline,
  itemsPerLine,
  showName,
  showPrice,
  titleRows,
}) => {
  const { classes, cx } = useStyles({ itemsPerLine });
  const [destroyPlaceholders, setDestroyPlaceholders] = useState(false);

  useEffect(() => {
    dispatch(fetchProductRelations({
      productId,
      type,
    }));
  }, [dispatch, productId, type]);

  const allProductsAvailable = productIds.every(id => products[id]);

  useEffect(() => {
    if (allProductsAvailable) {
      return undefined;
    }

    // Remove placeholders of products which can't be loaded.
    const timeout = setTimeout(() => setDestroyPlaceholders(true), REQUEST_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [allProductsAvailable]);

  const productIdsToUse = destroyPlaceholders
    ? productIds.filter(id => products[id])
    : productIds;

  if (!productIdsToUse.length) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      {headline && <h3 className={cx(classes.headline, 'headline')}>{headline}</h3>}
      <GridComponent className={classes.wrapper} wrap key={`product-relation-grid-${productIdsToUse.length}`}>
        {productIdsToUse.map((id) => {
          const key = products[id] ? `product-${id}` : `placeholder-${id}`;

          return (
            <GridComponent.Item key={key} className={classes.item}>
              <Item
                productId={id}
                showPrice={showPrice}
                showName={showName}
                titleRows={titleRows}
              />
            </GridComponent.Item>
          );
        })}
      </GridComponent>
    </div>
  );
};

Grid.propTypes = {
  dispatch: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  headline: PropTypes.string,
  itemsPerLine: PropTypes.number,
  products: PropTypes.shape({}),
  showName: PropTypes.bool,
  showPrice: PropTypes.bool,
  titleRows: PropTypes.number,
};

Grid.defaultProps = {
  headline: null,
  itemsPerLine: 3,
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

  return {
    productIds: getProductRelationsFiltered(params)(state),
    products: getRelatedProductsByIdFiltered(params)(state),
  };
};

export default connect(mapStateToProps)(Grid);
