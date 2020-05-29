import { connect } from 'react-redux';
import { withRoute } from '@shopgate/engage/core';
import { getBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { hasProductRelationsFiltered } from '../selectors';

/**
 * @param {string} type .
 * @returns {Object}
 */
const makeMapStateToProps = type => (state, { route: { state: { productId } } }) => {
  const baseProductId = getBaseProductId(state, { productId });
  const hasRelations = hasProductRelationsFiltered({
    productId,
    type,
  })(state);

  if (hasRelations) {
    // Simple product or child product has relations
    return { productId };
  }
  return { productId: baseProductId };
};

/**
 * @param {string} type .
 * @returns {JSX}
 */
export const makeConnectProductWithRelations = type => Component => withRoute(
  connect(makeMapStateToProps(type))(Component),
  { prop: 'route' }
);
