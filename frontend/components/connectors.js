import { connect } from 'react-redux';
import { withRoute } from '@shopgate/engage/core';
import { getBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { hasProductRelationsFiltered } from '../selectors';
import { TYPE_PROPERTY } from '../helpers/constants';

/**
 * @returns {Object}
 * @param {string} type configuration type coming from the extension-config
 */
const makeMapStateToProps = type => (state, props) => {
  const {
    route: { state: { productId } },
    config,
  } = props;

  const baseProductId = getBaseProductId(state, { productId });
  let configType = type;

  if (!configType) {
    if (config && config.type !== TYPE_PROPERTY) {
      configType = config.type;
    } else {
      return { productId: baseProductId };
    }
  }

  const hasRelations = hasProductRelationsFiltered({
    productId,
    type: configType,
  })(state);

  if (hasRelations) {
    // Simple product or child product has relations
    return { productId };
  }
  return { productId: baseProductId };
};

/**
 * @param {string} type .
 * @returns {Function}
 */
export const makeConnectProductWithRelations = (type = undefined) => Component => withRoute(
  connect(makeMapStateToProps(type))(Component),
  { prop: 'route' }
);
