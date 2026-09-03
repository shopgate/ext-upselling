import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SheetComponent from '@shopgate/pwa-ui-shared/Sheet';
import { makeStyles } from '@shopgate/engage/styles';
import Grid from '../Grid';
import { getProductRelationsFiltered } from '../../selectors';

/**
 * Base height helper.
 * @param {number} itemsCount How many items are visible.
 * @param {number} maxAllowed Maximum allowed items per line.
 * @returns {string}
 */
const getBaseHeight = (itemsCount, maxAllowed) => {
  if (itemsCount > maxAllowed) {
    switch (maxAllowed) {
      case 1:
        return '150vw';
      case 2:
        return '125vw';
      default:
        return '100vw';
    }
  }
  // Items count less or equal max -> one line, no need to shrink it.
  return '200vw';
};

const useStyles = makeStyles()((theme, { itemsCount, maxAllowed }) => ({
  sheet: {
    maxHeight: getBaseHeight(itemsCount, maxAllowed),
    boxShadow: `0 0 5px ${theme.alpha(theme.palette.shadow, 0.5)}`,
    zIndex: 10,
    marginBottom: 'var(--footer-height)',
  },
  content: {
    maxHeight: `calc(${getBaseHeight(itemsCount, maxAllowed)} - 56px - var(--safe-area-inset-top))`,
  },
}));

/**
 * Gets items per line.
 * @param {number} count Count.
 * @param {number} max Maximum allowed.
 * @returns {number}
 */
const getItemsPerLine = (count, max) => {
  if (count >= max) {
    return max;
  }

  if (count && count <= 2) {
    return count;
  }

  return 3;
};

/**
 * Sheet with related products with given type and productId.
 * Shows up when isOpen prop is true and when there are actually some items to show.
 * @param {Object} props Props.
 * @returns {JSX}
 */
const Sheet = ({
  headline,
  isOpen,
  maxItemsPerLine,
  onClose,
  productId,
  productsCount,
  showName,
  showPrice,
  titleRows,
  type,
}) => {
  const { classes, cx } = useStyles({
    itemsCount: productsCount,
    maxAllowed: maxItemsPerLine,
  });

  return (
    <SheetComponent
      title={headline}
      className={cx(classes.sheet, 'upselling-pdp-sheet')}
      contentClassName={classes.content}
      isOpen={isOpen && productsCount > 0}
      onClose={onClose}
      backdrop={false}
    >
      <Grid
        productId={productId}
        type={type}
        showName={showName}
        showPrice={showPrice}
        itemsPerLine={getItemsPerLine(productsCount, maxItemsPerLine)}
        titleRows={titleRows}
      />
    </SheetComponent>
  );
};

Sheet.propTypes = {
  headline: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  maxItemsPerLine: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  productsCount: PropTypes.number.isRequired,
  showName: PropTypes.bool.isRequired,
  showPrice: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  titleRows: PropTypes.number,
};

Sheet.defaultProps = {
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
    productsCount: getProductRelationsFiltered(params)(state).length,
  };
};

export default connect(mapStateToProps)(Sheet);
