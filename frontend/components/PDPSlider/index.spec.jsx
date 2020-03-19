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

let mockedProductId = 'mockedProductId';
jest.mock('@shopgate/pwa-common-commerce/product/selectors/product', () => ({
  getCurrentBaseProductId: () => mockedProductId,
}));

jest.mock('@shopgate-ps/pwa-extension-kit/connectors', () => ({
  withPageProductId: ({ WrappedComponent }) => props =>
    <WrappedComponent productId={mockedProductId} {...props} />,
}));

describe('PDPSlider', () => {
  // eslint-disable-next-line global-require
  const PDPSlider = require('./index').default;
  // eslint-disable-next-line require-jsdoc
  const makeComponent = () => mount((
    <Provider store={configureStore()({})}>
      <PDPSlider />
    </Provider>
  ));

  it('should render with price and names', () => {
    const component = makeComponent();

    expect(component.find('PDPSlider').props().productId).toBe(mockedProductId);
    expect(component.find('MockedDummyComponent').props()).toMatchObject(mockedConfig.productPage);
    // Component should never update once rendered something.
    expect(component.find('PDPSlider').instance().shouldComponentUpdate()).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('should render without price and names as default', () => {
    delete mockedConfig.productPage.showName;
    delete mockedConfig.productPage.showPrice;
    const component = makeComponent();

    expect(component.find('PDPSlider').props().productId).toBe(mockedProductId);
    expect(component.find('MockedDummyComponent').props()).toMatchObject(mockedConfig.productPage);
    expect(component.find('MockedDummyComponent').props().showPrice).toBe(false);
    expect(component.find('MockedDummyComponent').props().showName).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('should render nothing when productId is not ready', () => {
    mockedProductId = undefined;
    const component = makeComponent();

    expect(component.html()).toBe('');
    expect(component.find('PDPSlider').instance().shouldComponentUpdate()).toBe(true);
    expect(component.find('PDPSlider').instance().shouldComponentUpdate()).toBe(true);
  });
});
