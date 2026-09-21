import React from 'react';
import { render, act } from '@testing-library/react';

let mockedType = '';
let mockedHeadline = '';
jest.mock('../../helpers/getConfig', () => () => ({
  productPageAddToCart: {
    get type() { return mockedType; },
    get headline() { return mockedHeadline; },
  },
}));

const mockSheet = jest.fn();
jest.mock('../Sheet', () => (props) => {
  mockSheet(props);
  return <div data-test-id="sheet" />;
});

const mockPdpSubscribe = jest.fn();
jest.mock('../../streams', () => ({
  pdpAddToCartSuccess$: {
    subscribe: (...args) => mockPdpSubscribe(...args),
  },
}));

const mockRouteSubscribe = jest.fn();
jest.mock('@shopgate/engage/core', () => ({
  routeWillLeave$: {
    subscribe: (...args) => mockRouteSubscribe(...args),
  },
}));

const mockedFetchProductRelations = jest.fn();
jest.mock('@shopgate/engage/product', () => ({
  fetchProductRelations: (...args) => {
    mockedFetchProductRelations(...args);
    return { type: 'MOCKED_FETCH_PRODUCT_RELATIONS' };
  },
}));

jest.mock('../connectors', () => ({
  makeConnectProductWithRelations: () => Component => Component,
}));

describe('PDPSheet', () => {
  // eslint-disable-next-line global-require
  const PDPSheet = require('./index').default;
  const dispatch = jest.fn();

  beforeEach(() => {
    mockSheet.mockClear();
    mockPdpSubscribe.mockClear();
    mockRouteSubscribe.mockClear();
    mockedFetchProductRelations.mockClear();
    mockedType = 'mockedType';
    mockedHeadline = 'mockedHeadline';
  });

  it('should render nothing and not subscribe when disabled', () => {
    mockedType = null;
    const { container } = render(<PDPSheet productId="mockedId" dispatch={dispatch} />);

    expect(container).toBeEmptyDOMElement();
    expect(mockPdpSubscribe).not.toHaveBeenCalled();
    expect(mockRouteSubscribe).not.toHaveBeenCalled();
  });

  it('should render nothing but subscribe when productId is missing', () => {
    const { container } = render(<PDPSheet dispatch={dispatch} />);

    expect(container).toBeEmptyDOMElement();
    expect(mockPdpSubscribe).toHaveBeenCalled();
    expect(mockRouteSubscribe).toHaveBeenCalled();
    expect(mockedFetchProductRelations).not.toHaveBeenCalled();
  });

  it('should render the closed Sheet and fetch relations when enabled', () => {
    render(<PDPSheet productId="mockedId" dispatch={dispatch} />);

    expect(mockedFetchProductRelations).toHaveBeenCalledWith({
      productId: 'mockedId',
      type: 'mockedType',
    });
    expect(mockSheet).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: false }));
  });

  it('should open the Sheet on the add to cart event and close it when leaving the route', () => {
    render(<PDPSheet productId="mockedId" dispatch={dispatch} />);
    const handleOpen = mockPdpSubscribe.mock.calls[0][0];
    const handleClose = mockRouteSubscribe.mock.calls[0][0];

    act(() => handleOpen());
    expect(mockSheet).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: true }));

    act(() => handleClose());
    expect(mockSheet).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: false }));
  });
});
