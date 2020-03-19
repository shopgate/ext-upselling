import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Slider from './index';

const mockedStore = configureStore();

// eslint-disable-next-line react/prop-types, require-jsdoc
const MockedDummyComponent = props => (<div>{props.children}</div>);

jest.mock('./components/DefaultSlider', () => props => (
  <MockedDummyComponent {...props}>
    Mocked Slider
  </MockedDummyComponent>
));

const mockedGetProductRelationsAction = jest.fn();
jest.mock('@shopgate/pwa-common-commerce/product/actions/fetchProductRelations', () => (...args) => {
  mockedGetProductRelationsAction(...args);
  return {
    type: 'action',
  };
});

const mockedRelatedProducts = [];
const mockedProductRelations = [];
jest.mock('@shopgate/pwa-common-commerce/product/selectors/relations', () => ({
  getRelatedProducts: () => () => mockedRelatedProducts,
  getProductRelations: () => () => mockedProductRelations,
}));

jest.mock('@shopgate-ps/pwa-extension-kit/env/helpers', () => ({
  isIOSTheme: () => false,
}));

describe('Slider', () => {
  /**
   * Makes a component.
   * @returns {Object}
   */
  const makeComponent = () => mount((
    <Provider store={mockedStore({})}>
      <Slider
        productId="mockedId"
        type="mockedType"
        showPrice
        showName
      />
    </Provider>
  ));
  it('should call action on mount and render nothing', () => {
    const component = makeComponent();

    expect(mockedGetProductRelationsAction).toHaveBeenCalledWith({
      productId: 'mockedId',
      type: 'mockedType',
    });
    expect(component.html()).toBe('');
  });

  it('should render a slider', () => {
    mockedRelatedProducts.push({ id: 'mockedRelatedId' });
    mockedProductRelations.push('mockedRelatedId');
    const component = makeComponent();

    expect(component.find('MockedDummyComponent').props()).toMatchObject({
      products: { mockedRelatedId: { id: 'mockedRelatedId' } },
      showPrice: true,
      showName: true,
    });
    expect(component.html()).toMatchSnapshot();
  });
});
