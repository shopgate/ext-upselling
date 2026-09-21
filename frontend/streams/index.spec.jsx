import { SUCCESS_ADD_PRODUCTS_TO_CART } from '@shopgate/engage/cart';
import { pdpAddToCartSuccess$ } from './index';

describe('Streams', () => {
  describe('pdpAddToCartSuccess$', () => {
    it('should react on SUCCESS_ADD_PRODUCTS_TO_CART', () => {
      expect(pdpAddToCartSuccess$.operator.predicate({
        action: { type: SUCCESS_ADD_PRODUCTS_TO_CART },
      })).toBe(true);
    });
    it('should ignore other actions', () => {
      expect(pdpAddToCartSuccess$.operator.predicate({
        action: { type: 'foo' },
      })).toBe(false);
    });
  });
});
