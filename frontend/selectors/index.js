import { createSelector } from 'reselect';
import {
  getProductRelations,
  getRelatedProducts,
} from '@shopgate/pwa-common-commerce/product/selectors/relations';
import {
  getProducts,
  getProductPropertiesUnfiltered,
} from '@shopgate/pwa-common-commerce/product/selectors/product';

/**
 * Special selector factory that filters out products with same productId as parent.
 * @param {Object} params As in getRelatedProducts
 * @return {Function}
 */
export const getRelatedProductsFiltered = params => createSelector(
  getRelatedProducts(params),
  products => products.filter(el => params.productId !== el.id)
);

/**
 * Special selector factory that filters out related products with same productId as parent.
 * @param {Object} params As in getProductRelations
 * @returns {Function}
 */
export const getRelatedProductsByIdFiltered = params => createSelector(
  getRelatedProductsFiltered(params),
  products => products.reduce(
    (a, c) => ({
      ...a,
      [c.id]: c,
    }),
    {}
  )
);

/**
 * Special selector factory that filters out related product ids with same productId as parent.
 * @param {Object} params As in getProductRelations
 * @return {Function}
 */
export const getProductRelationsFiltered = params => createSelector(
  getProductRelations(params),
  (productIds) => {
    if (!productIds) {
      return [];
    }

    return productIds
      .filter((id, key) => productIds.indexOf(id) === key) // Dedupe.
      .filter(id => params.productId !== id);
  }
);

/**
 * @param {Object} params .
 * @return {boolean}
 */
export const hasProductRelationsFiltered = params => createSelector(
  getProductRelations(params),
  productIds => productIds && productIds.length
);

export const getProductRelationIdsFromProperty = createSelector(
  getProductPropertiesUnfiltered,
  (state, props) => props.property,
  (properties, propertyLabel) => {
    if (!properties) return [];

    const relatedProperty = properties.find(property => property.label === propertyLabel);

    if (!relatedProperty) {
      return [];
    }

    const { value } = relatedProperty;
    return value
      .split(',')
      .filter(Boolean)
      .map(s => s.trim());
  }
);

export const getProductsFromProperty = createSelector(
  getProducts,
  getProductRelationIdsFromProperty,
  (products, relatedIds) => relatedIds
    .map((relatedId) => {
      if (products[relatedId]) {
        return products[relatedId].productData;
      }
      return undefined;
    })
    .filter(Boolean)
    .reduce(
      (a, c) => ({
        ...a,
        [c.id]: c,
      }),
      {}
    )
);
