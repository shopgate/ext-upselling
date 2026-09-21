import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, act } from '@testing-library/react';

const mockedStore = configureStore();

const mockProductSlider = jest.fn();
jest.mock('@shopgate/engage/product/components', () => ({
  ProductSlider: (props) => {
    mockProductSlider(props);
    return <div data-test-id="product-slider" />;
  },
}));
jest.mock('@shopgate/engage/components/Typography', () => ({
  // eslint-disable-next-line react/prop-types
  Typography: ({ children }) => <h3>{children}</h3>,
}));
jest.mock('../Item', () => () => null);

const mockedFetchProductRelations = jest.fn();
const mockedFetchProductsById = jest.fn();
jest.mock('@shopgate/engage/product', () => ({
  fetchProductRelations: (...args) => {
    mockedFetchProductRelations(...args);
    return { type: 'action' };
  },
  fetchProductsById: (...args) => {
    mockedFetchProductsById(...args);
    return { type: 'action' };
  },
}));

let mockedProductIds = [];
let mockedProducts = {};
let mockedPropertyProductIds = [];
let mockedPropertyProducts = {};
jest.mock('../../selectors', () => ({
  getProductRelationsFiltered: () => () => mockedProductIds,
  getRelatedProductsByIdFiltered: () => () => mockedProducts,
  getProductRelationIdsFromProperty: () => mockedPropertyProductIds,
  getProductsDataFromProperty: () => mockedPropertyProducts,
}));

describe('Slider', () => {
  // eslint-disable-next-line global-require
  const Slider = require('./index').default;

  /**
   * @param {Object} props Additional props.
   * @returns {Object}
   */
  const makeComponent = props => render((
    <Provider store={mockedStore({})}>
      <Slider
        productId="mockedId"
        type="mockedType"
        showPrice
        showName
        {...props}
      />
    </Provider>
  ));

  beforeEach(() => {
    jest.useFakeTimers();
    mockProductSlider.mockClear();
    mockedFetchProductRelations.mockClear();
    mockedFetchProductsById.mockClear();
    mockedProductIds = [];
    mockedProducts = {};
    mockedPropertyProductIds = [];
    mockedPropertyProducts = {};
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch the relations on mount and render nothing without relations', () => {
    const { container } = makeComponent();

    expect(mockedFetchProductRelations).toHaveBeenCalledWith({
      productId: 'mockedId',
      type: 'mockedType',
    });
    expect(container).toBeEmptyDOMElement();
  });

  it('should render the engage ProductSlider with the related products', () => {
    mockedProductIds = ['mockedRelatedId', 'mockedPendingId'];
    mockedProducts = { mockedRelatedId: { id: 'mockedRelatedId' } };
    makeComponent({
      headline: 'Mocked headline',
      titleRows: 3,
    });

    expect(screen.getByText('Mocked headline')).toBeInTheDocument();
    expect(mockProductSlider).toHaveBeenCalledWith(expect.objectContaining({
      productIds: ['mockedRelatedId', 'mockedPendingId'],
      scope: 'upselling',
      productItemProps: {
        showName: true,
        showPrice: true,
        titleRows: 3,
      },
    }));
  });

  it('should drop products without data after the placeholder timeout', () => {
    mockedProductIds = ['mockedRelatedId', 'mockedPendingId'];
    mockedProducts = { mockedRelatedId: { id: 'mockedRelatedId' } };
    makeComponent();

    act(() => {
      jest.advanceTimersByTime(3001);
    });

    expect(mockProductSlider).toHaveBeenLastCalledWith(expect.objectContaining({
      productIds: ['mockedRelatedId'],
    }));
  });

  it('should fetch products by id for property relations', () => {
    mockedPropertyProductIds = ['propertyRelatedId'];
    makeComponent({
      type: 'property',
      property: 'mockedProperty',
    });

    expect(mockedFetchProductRelations).not.toHaveBeenCalled();
    expect(mockedFetchProductsById).toHaveBeenCalledWith(['propertyRelatedId']);
  });
});
