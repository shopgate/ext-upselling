import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Slider from './index';

const mockedStore = configureStore();

const MockedDummyComponent = (props) => (<div>{props.children}</div>);
jest.mock('./components/DefaultSlider', () => (props) => (
  <MockedDummyComponent {...props}>
    Mocked Slider
  </MockedDummyComponent>
));

const mockedGetProductRelationsAction = jest.fn();
jest.mock('@shopgate/pwa-common-commerce/product/actions/getProductRelations', () => (...args) => {
  mockedGetProductRelationsAction(...args);
  return {
    type: 'action',
  };
});

let mockedRelatedProducts = [];
jest.mock('@shopgate/pwa-common-commerce/product/selectors/relations', () => ({
  getRelatedProducts: () => () => mockedRelatedProducts,
}));

jest.mock('../../helpers/isiOSTheme', () => () => false);

describe('Slider', () => {
  const makeComponent = () => mount((
    <Provider store={mockedStore({})}>
      <Slider
        productId={'mockedId'}
        type="mockedType"
        showPrice
        showName
      />
    </Provider>
  ));
  it('should call action on mound and render nothing', () => {
    const component = makeComponent();

    expect(mockedGetProductRelationsAction).toHaveBeenCalledWith({
      productId: 'mockedId',
      type: 'mockedType'
    });
    expect(component.html()).toBe(null);
  });

  it('should render a slider', () => {
    mockedRelatedProducts.push({ id: 'mockedRelatedId' });
    const component = makeComponent();

    expect(component.find('MockedDummyComponent').props()).toMatchObject({
      products: [{ id: 'mockedRelatedId' }],
      showPrice: true,
      showName: true,
    });
   expect(component.html()).toMatchSnapshot();
  })
});
