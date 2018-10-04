import {
  getProductRelationsFiletered,
  getRelatedProductsFiltered,
} from './index';

describe('Selectors', () => {
  describe('getRelatedProductsFiltered', () => {
    it('should return products without a parent', () => {
      const state = {
        product: {
          productRelationsByHash: {
            '{"limit":20,"pipeline":"shopgate.catalog.getProductRelations","productId":"parentId","type":"upselling"}': {
              productIds: [
                'parentId',
                'relatedProductId',
              ],
            },
          },
          productsById: {
            relatedProductId: {
              productData: {
                id: 'relatedProductId',
              },
            },
            parentId: {
              productData: {
                id: 'parentId',
              },
            },
          },
        },
      };
      const result = getRelatedProductsFiltered({
        productId: 'parentId',
        type: 'upselling',
      })(state);
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(state.product.productsById.relatedProductId.productData);
    });
  });

  describe('getProductRelationsFiletered', () => {
    const state = {
      product: {
        productRelationsByHash: {
          '{"limit":20,"pipeline":"shopgate.catalog.getProductRelations","productId":"parentId","type":"upselling"}': {
            productIds: [
              'parentId',
              'relatedProductId',
            ],
          },
        },
      },
    };

    const result = getProductRelationsFiletered({
      productId: 'parentId',
      type: 'upselling',
    })(state);

    expect(result.length).toBe(1);
    expect(result[0]).toBe('relatedProductId');
  });
});
