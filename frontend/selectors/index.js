import { createSelector } from 'reselect';
import {
  getProductRelations,
  getRelatedProducts,
} from '@shopgate/pwa-common-commerce/product/selectors/relations';
import {
  getProducts,
  getProductPropertiesUnfiltered
} from '@shopgate/pwa-common-commerce/product/selectors/product'

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

export const getProductRelationsFromProperty = createSelector(
  getProductPropertiesUnfiltered,
  (state, props) => props.property,
  (properties, propertyLabel) => {
    const relatedProperty = properties.find(property => {
      return property.label === propertyLabel
    })

    if (relatedProperty) {
      const { value } = relatedProperty
      return value.split(',')
    }

    return []
  }
);

export const getProductsFromProperty = createSelector(
  getProducts,
  getProductRelationsFromProperty,
  (products, relatedIds) => {
    return relatedIds
      .map(relatedId => {
        if (products[relatedId]) {
          return products[relatedId].productData
        }
      })
      .filter(Boolean)
      .reduce(
        (a, c) => ({
          ...a,
          [c.id]: c,
        }),
        {}
      )
  }
);
