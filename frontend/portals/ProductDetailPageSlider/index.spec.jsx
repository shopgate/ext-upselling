import React from 'react';
import { mount } from 'enzyme';

jest.mock('../../components/PDPSlider', () => () => <div>PDPSlider component</div>);

let mockedProductPageConfig = {
  type: null,
  position: null,
};
jest.mock('../../helpers/getConfig', () => () => ({
  productPage: mockedProductPageConfig,
}));

describe('ProductDetailPage', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('should render null when type is not configured', () => {
    // eslint-disable-next-line global-require
    const ProductDetailPage = require('./index').default;
    const component = mount(<ProductDetailPage name="mockedPosition" />);

    expect(component.html()).toBe(null);
  });

  it('should render null when position does not match', () => {
    mockedProductPageConfig = {
      type: 'mockedType',
      position: 'mockedPosition',
    };
    // eslint-disable-next-line global-require
    const ProductDetailPage = require('./index').default;
    const component = mount(<ProductDetailPage name="anotherPosition" />);

    expect(component.html()).toBe(null);
  });

  it('should render PDPSlider when position matches', () => {
    mockedProductPageConfig = {
      type: 'mockedType',
      position: 'mockedPosition',
    };
    // eslint-disable-next-line global-require
    const ProductDetailPage = require('./index').default;
    const component = mount((
      <ProductDetailPage name="mockedPosition" />
    ));

    expect(component.find('div').exists()).toBe(true);
  });
});
