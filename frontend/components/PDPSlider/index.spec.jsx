import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

const mockedConfig = {
  productPage: {
    type: 'mockedType',
    headline: 'mockedHeadline',
    showPrice: true,
    showName: true,
  },
};

jest.mock('../../helpers/getConfig', () => () => mockedConfig);
// eslint-disable-next-line require-jsdoc, react/prop-types
const MockedDummyComponent = props => (<div>{props.children}</div>);

jest.mock('../Slider', () => props => ((
  <MockedDummyComponent {...props}>
    Mocked Slider
  </MockedDummyComponent>
)));

const mockedProductId = 'mockedProductId';
jest.mock('@shopgate/pwa-common-commerce/product/selectors/product', () => ({
  getCurrentBaseProductId: () => mockedProductId,
}));

describe('PDPSlider', () => {
  // eslint-disable-next-line global-require
  const PDPSlider = require('./index').default;

  it('should render with price and names', () => {
    const component = mount((
      <Provider store={configureStore()({})}>
        <PDPSlider />
      </Provider>
    ));
    expect(component.find('PDPSlider').props().productId).toBe(mockedProductId);
    expect(component.find('MockedDummyComponent').props()).toMatchObject(mockedConfig.productPage);
    expect(component).toMatchSnapshot();
  });

  it('should render without price and names as default', () => {
    delete mockedConfig.productPage.showName;
    delete mockedConfig.productPage.showPrice;

    const component = mount((
      <Provider store={configureStore()({})}>
        <PDPSlider />
      </Provider>
    ));

    expect(component.find('PDPSlider').props().productId).toBe(mockedProductId);
    expect(component.find('MockedDummyComponent').props()).toMatchObject(mockedConfig.productPage);
    expect(component.find('MockedDummyComponent').props().showPrice).toBe(false);
    expect(component.find('MockedDummyComponent').props().showName).toBe(false);
    expect(component).toMatchSnapshot();
  });
});
