import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

let mockedCurrentBaseProductId = null;
jest.mock('@shopgate/pwa-common-commerce/product/selectors/product', () => ({
  getCurrentBaseProductId: () => mockedCurrentBaseProductId,
}));

const mockedConfig = {
  productPageAddToCart: {},
};
jest.mock('../../helpers/getConfig', () => () => mockedConfig);

// eslint-disable-next-line require-jsdoc
const MockedSheet = () => (<div>Hello world</div>);
jest.mock('../Sheet', () => MockedSheet);

const mockedPDPAddToCartSuccessSubscribe = jest.fn();
jest.mock('../../streams', () => ({
  pdpAddToCartSuccess$: {
    subscribe: (...args) => mockedPDPAddToCartSuccessSubscribe(...args),
  },
}));

const mockedRouteDidChangeSubscribe = jest.fn();
jest.mock('@shopgate/pwa-common/streams/history', () => ({
  routeDidChange$: {
    subscribe: (...args) => mockedRouteDidChangeSubscribe(...args),
  },
}));

const mockedGetProductRelations = jest.fn();
jest.mock('@shopgate/pwa-common-commerce/product/actions/getProductRelations', () => (...args) => {
  mockedGetProductRelations(...args);
  return { type: 'MOCKED_GET_PRODUCT_RELATIONS' };
});

describe('PDPSheet', () => {
  // eslint-disable-next-line require-jsdoc
  const makeComponent = () => {
    const PDPSheet = require.requireActual('./index').default;
    return mount((
      <Provider store={configureStore()({})}>
        <PDPSheet />
      </Provider>
    ));
  };

  beforeEach(() => {
    mockedPDPAddToCartSuccessSubscribe.mockReset();
    mockedRouteDidChangeSubscribe.mockReset();
  });

  it('should do nothing when productId is missing', () => {
    mockedCurrentBaseProductId = null;
    mockedConfig.productPageAddToCart = {
      type: 'mockedType',
      headline: 'mockedHeadline',
    };

    const component = makeComponent();
    const instance = component.find('PDPSheet').instance();

    expect(component.html()).toBe(null);
    expect(instance.state.disabled).toBe(false);
    expect(instance.state.isOpen).toBe(false);
    expect(mockedPDPAddToCartSuccessSubscribe).toHaveBeenCalled();
    expect(mockedRouteDidChangeSubscribe).toHaveBeenCalled();

    // Try to open without current productId
    mockedPDPAddToCartSuccessSubscribe.mock.calls[0][0]();
    // Should be closed.
    expect(instance.state.isOpen).toBe(false);

    // Should not fetch on update
    instance.componentDidUpdate({ productId: null });
    expect(mockedGetProductRelations).not.toHaveBeenCalled();

    // Component not update
    expect(instance.shouldComponentUpdate({ productId: null }, { isOpen: false })).toBe(false);
  });

  it('should do nothing when disabled', () => {
    mockedCurrentBaseProductId = 'mockedId';
    mockedConfig.productPageAddToCart.type = null;
    const component = makeComponent();
    const instance = component.find('PDPSheet').instance();

    expect(component.html()).toBe(null);
    expect(instance.state.disabled).toBe(true);
    expect(instance.state.isOpen).toBe(false);
    expect(mockedPDPAddToCartSuccessSubscribe).not.toHaveBeenCalled();
    expect(mockedRouteDidChangeSubscribe).not.toHaveBeenCalled();

    // Should not fetch on update
    instance.componentDidUpdate({ productId: null });
    expect(mockedGetProductRelations).not.toHaveBeenCalled();

    // Component should never update
    expect(instance.shouldComponentUpdate()).toBe(false);
  });

  describe('Life cycle', () => {
    let component;
    let instance;
    let routeDidChangeFunc;
    let addToCartSuccessFunc;

    it('should render Sheet and update when product changes', () => {
      mockedCurrentBaseProductId = 'mockedId';
      mockedConfig.productPageAddToCart.type = 'mockedType';
      component = makeComponent();
      instance = component.find('PDPSheet').instance();

      expect(component.find('MockedSheet').exists()).toBe(true);
      expect(instance.state.disabled).toBe(false);
      expect(instance.state.isOpen).toBe(false);
      expect(mockedGetProductRelations).toHaveBeenCalled();

      // eslint-disable-next-line prefer-destructuring
      routeDidChangeFunc = mockedRouteDidChangeSubscribe.mock.calls[0][0];
      // eslint-disable-next-line prefer-destructuring
      addToCartSuccessFunc = mockedPDPAddToCartSuccessSubscribe.mock.calls[0][0];
    });

    it('should react on add to cart', () => {
      // Simulate add to cart event
      addToCartSuccessFunc();
      expect(instance.state.isOpen).toBe(true);
      expect(component.html()).not.toBe(null);
    });

    it('should react on route did change', () => {
      // Simulate route did change.
      routeDidChangeFunc();
      expect(instance.state.isOpen).toBe(false);
      expect(component.html()).not.toBe(null);
    });

    it('should update when productId changes', () => {
      // Component should update when productId changes
      expect(instance.shouldComponentUpdate({ productId: 'different' })).toBe(true);
    });

    it('should fetch again when productId changes', () => {
      // Component should fetch again when productId changes
      instance.componentDidUpdate({ productId: 'different' });
      expect(mockedGetProductRelations).toHaveBeenCalled();
    });
  });
});
