import React from 'react';
import { mount } from 'enzyme';

// eslint-disable-next-line require-jsdoc
const MockedPDPSheet = () => (<div>Hello world</div>);
jest.mock('../../components/PDPSheet', () => MockedPDPSheet);

describe('ProductDetailPageAddToCartSheet', () => {
  // eslint-disable-next-line global-require
  const ProductDetailPageAddToCartSheet = require('./index').default;
  it('should render PDPSheet', () => {
    const component = mount(<ProductDetailPageAddToCartSheet />);
    expect(component.find(MockedPDPSheet).exists()).toBe(true);
  });
});
