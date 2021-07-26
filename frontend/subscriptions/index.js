import {
  fetchProductRelations,
  cachedProductReceived$,
  productReceived$,
} from '@shopgate/engage/product';
import fetchProductsById from '@shopgate/pwa-common-commerce/product/actions/fetchProductsById';
import getConfig from '../helpers/getConfig';
import { getProductRelationsFromProperty } from '../selectors';
import { TYPE_PROPERTY } from '../helpers/constants';

const { productPage, productPageAddToCart } = getConfig();

/**
 * @param {Function} subscribe subscribe
 */
export default (subscribe) => {
  const processProduct$ = productReceived$.merge(cachedProductReceived$);
  subscribe(processProduct$, ({ action, dispatch, getState }) => {
    const { id: productId, baseProductId } = action.productData;

    const configs = Array.isArray(productPage) ? productPage : [productPage];

    configs.forEach((config) => {
      if (config.type) {
        if (config.type !== TYPE_PROPERTY) {
          dispatch(fetchProductRelations({
            productId,
            type: config.type,
          }));

          if (baseProductId) {
            dispatch(fetchProductRelations({
              productId: baseProductId,
              type: config.type,
            }));
          }
        } else {
          const ids = getProductRelationsFromProperty(getState(), {
            productId,
            property: config.property,
          });
          dispatch(fetchProductsById(ids));
        }
      }
    });
    if (productPageAddToCart.type) {
      dispatch(fetchProductRelations({
        productId,
        type: productPageAddToCart.type,
      }));

      if (baseProductId) {
        dispatch(fetchProductRelations({
          productId: baseProductId,
          type: productPageAddToCart.type,
        }));
      }
    }
  });
};
