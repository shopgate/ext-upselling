import { main$ } from '@shopgate/engage/core';
import { SUCCESS_ADD_PRODUCTS_TO_CART } from '@shopgate/engage/cart';

export const pdpAddToCartSuccess$ = main$
  .filter(({ action }) => action.type === SUCCESS_ADD_PRODUCTS_TO_CART);
