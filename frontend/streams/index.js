import { main$ } from '@shopgate/pwa-common/streams/main';
import { SUCCESS_ADD_PRODUCTS_TO_CART } from '@shopgate/pwa-common-commerce/cart/constants';

export const pdpAddToCartSuccess$ = main$
  .filter(({ action }) => action.type === SUCCESS_ADD_PRODUCTS_TO_CART);
