import {
  fetchProductRelations,
  cachedProductReceived$,
  productReceived$,
} from '@shopgate/engage/product';
import getConfig from '../helpers/getConfig';

const { productPage, productPageAddToCart } = getConfig();

/**
 * @param {Function} subscribe subscribe
 */
export default (subscribe) => {
  const processProduct$ = productReceived$.merge(cachedProductReceived$);
  subscribe(processProduct$, ({ action, dispatch }) => {
    const { id: productId, baseProductId } = action.productData;

    if (productPage.type) {
      dispatch(fetchProductRelations({
        productId,
        type: productPage.type,
      }));

      if (baseProductId) {
        dispatch(fetchProductRelations({
          productId: baseProductId,
          type: productPage.type,
        }));
      }
    }
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
