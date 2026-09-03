import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

const mockedStore = configureStore();

// eslint-disable-next-line react/prop-types
const MockedProductSlider = ({ children }) => (<div>{children}</div>);
jest.mock('@shopgate/engage/product/components', () => ({
  ProductSlider: MockedProductSlider,
}));
// eslint-disable-next-line react/prop-types
const MockedTypography = ({ children }) => (<h3>{children}</h3>);
jest.mock('@shopgate/engage/components/Typography', () => MockedTypography);
jest.mock('../Item', () => () => null);

const mockedFetchProductRelations = jest.fn();
jest.mock('@shopgate/pwa-common-commerce/product/actions/fetchProductRelations', () => (...args) => {
  mockedFetchProductRelations(...args);
  return {
    type: 'action',
  };
});
const mockedFetchProductsById = jest.fn();
jest.mock('@shopgate/pwa-common-commerce/product', () => ({
  fetchProductsById: (...args) => {
    mockedFetchProductsById(...args);
    return {
      type: 'action',
    };
  },
}));

let mockedRelatedProducts = [];
let mockedProductRelations = [];
jest.mock('@shopgate/pwa-common-commerce/product/selectors/relations', () => ({
  getRelatedProducts: () => () => mockedRelatedProducts,
  getProductRelations: () => () => mockedProductRelations,
}));

let mockedPropertyRelationIds = [];
jest.mock('@shopgate/pwa-common-commerce/product/selectors/product', () => ({
  getProducts: () => ({}),
  getProductPropertiesUnfiltered: () => [{
    label: 'mockedProperty',
    value: mockedPropertyRelationIds.join(','),
  }],
}));

describe('Slider', () => {
  // eslint-disable-next-line global-require
  const Slider = require('./index').default;
  /**
   * Makes a component.
   * @param {Object} props Additional props.
   * @returns {Object}
   */
  const makeComponent = props => mount((
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
    mockedFetchProductRelations.mockClear();
    mockedFetchProductsById.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch the relations on mount and render nothing without relations', () => {
    const component = makeComponent();

    expect(mockedFetchProductRelations).toHaveBeenCalledWith({
      productId: 'mockedId',
      type: 'mockedType',
    });
    expect(component.html()).toBe('');
  });

  it('should render the engage ProductSlider with the related products', () => {
    mockedRelatedProducts = [{ id: 'mockedRelatedId' }];
    mockedProductRelations = ['mockedRelatedId', 'mockedPendingId'];
    const component = makeComponent({
      headline: 'Mocked headline',
      titleRows: 3,
    });

    expect(component.find(MockedTypography).text()).toBe('Mocked headline');
    expect(component.find(MockedProductSlider).props()).toMatchObject({
      productIds: ['mockedRelatedId', 'mockedPendingId'],
      scope: 'upselling',
      productItemProps: {
        showName: true,
        showPrice: true,
        titleRows: 3,
      },
    });
    expect(component.html()).toMatchSnapshot();
  });

  it('should drop products without data after the placeholder timeout', () => {
    mockedRelatedProducts = [{ id: 'mockedRelatedId' }];
    mockedProductRelations = ['mockedRelatedId', 'mockedPendingId'];
    const component = makeComponent();

    act(() => {
      jest.advanceTimersByTime(3001);
    });
    component.update();
    expect(component.find(MockedProductSlider).props().productIds).toEqual(['mockedRelatedId']);
  });

  it('should fetch products by id for property relations', () => {
    mockedPropertyRelationIds = ['propertyRelatedId'];
    makeComponent({
      type: 'property',
      property: 'mockedProperty',
    });

    expect(mockedFetchProductRelations).not.toHaveBeenCalled();
    expect(mockedFetchProductsById).toHaveBeenCalledWith(['propertyRelatedId']);
  });
});
