import { createSelector } from 'reselect';
import { getRelatedProducts } from '@shopgate/pwa-common-commerce/product/selectors/relations';

/**
 * Special selector factory that filters out products with same productId as parent.
 * @param {Object} params As in getRelatedProducts
 * @return {function}
 */
export const getRelatedProductsFiltered = params => createSelector(
  getRelatedProducts(params),
  products => products.filter(el => params.productId !== el.id)
);
