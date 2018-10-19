import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SheetComponent from '@shopgate/pwa-ui-shared/Sheet';
import Grid from '../../components/Grid';
import styles from '../../styles/sheet';
import { getProductRelationsFiltered } from '../../selectors';

const getItemsPerLine = (count) => {
  if (count && count <= 2) {
    return count;
  }

  return 3;
};

/**
 * Sheet with related products with given type and productId.
 * Shows up then isOpen prop is true and when there are actually some items to show.
 * @param {Object} props Props.
 * @returns {JSX}
 */
const Sheet = (props) => (
  <SheetComponent
    title={props.headline}
    className={styles.sheet(props.productsCount)}
    contentClassName={styles.content(props.productsCount)}
    isOpen={props.isOpen && props.productsCount > 0}
    onClose={props.onClose}
    backdrop={false}
  >
    <Grid
      productId={props.productId}
      type={props.type}
      showName={props.showName}
      showPrice={props.showPrice}
      itemsPerLine={getItemsPerLine(props.productsCount)}
      titleRows={props.titleRows}
    />
  </SheetComponent>
);

Sheet.propTypes = {
  headline: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  productsCount: PropTypes.number.isRequired,
  showName: PropTypes.bool.isRequired,
  showPrice: PropTypes.bool.isRequired,
  titleRows: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
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
