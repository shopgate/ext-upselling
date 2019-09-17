import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTheme } from '@shopgate/engage/core';
import { getRelatedProductsIdsByIdFiltered } from '../../selectors';
import getStyles from '../../styles/slider';

const styles = getStyles();

/**
 * Custom slider component
 * @param {string[]} relatedProductIds The ids of related products that are known to be in redux
 * @param {string} headline Headline for product slider
 * @return {JSK}
 */
const Slider = ({ relatedProductIds, headline, showPrice, showName }) => {
  const { ProductSlider } = useTheme();
  if (!relatedProductIds.length) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      {headline && <h3 className={styles.headline}>{headline}</h3> }
      <ProductSlider
        productIds={relatedProductIds}
        autoplay
        delay={7000}
        slidesPerView={2.3}
        snap={false}
        showPrice={showPrice}
        showName={showName}
      />
    </div>
  );
};

Slider.propTypes = {
  headLine: PropTypes.string,
  relatedProductIds: PropTypes.arrayOf(PropTypes.string),
};

Slider.defaultProps = {
  headLine: null,
  relatedProductIds: [],
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
    relatedProductIds: getRelatedProductsIdsByIdFiltered(params)(state),
  };
};

export default connect(mapStateToProps)(Slider);
