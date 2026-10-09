import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@shopgate/engage/core', () => ({
  routeWillEnter$: { subscribe: jest.fn() },
}));
jest.mock('@shopgate/engage/product', () => ({ ITEM_PATTERN: '/item/:productId' }));
jest.mock('@shopgate/pwa-common/helpers/router', () => ({ getCurrentRoute: () => null }));
jest.mock('../../components/PDPSheet', () => () => <div>PDPSheet</div>);

describe('ProductDetailPageAddToCartSheet', () => {
  // eslint-disable-next-line global-require
  const ProductDetailPageAddToCartSheet = require('./index').default;

  it('should render PDPSheet', () => {
    render(<ProductDetailPageAddToCartSheet />);
    expect(screen.getByText('PDPSheet')).toBeInTheDocument();
  });
});
