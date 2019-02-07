import React, { Component as MockedComponent } from 'react';
import { mount } from 'enzyme';
import DefaultSlider from './index';
import IOSProductCard from '../../../Item/components/ios11/ProductCard';
import GMDProductCard from '../../../Item/components/gmd/ProductCard';
import PlaceholderCard from '../../../Item/components/PlaceholderCard';

jest.mock('@shopgate/pwa-common/components/Slider', () => class extends MockedComponent {
  // eslint-disable-next-line require-jsdoc
  render() {
    return <div>{ this.props.children }</div>;
  }
  // eslint-disable-next-line require-jsdoc
  static Item({ children }) {
    return (<div>{ children }</div>);
  }
});
// eslint-disable-next-line require-jsdoc, react/prop-types
const MockedLink = props => <div>{props.children}</div>;
jest.mock('@shopgate/pwa-common/components/Link', () => props => (
  <MockedLink {...props}>{props.children}</MockedLink>
));

let mockedIsiOSTheme = false;
jest.mock('@shopgate/pwa-extension-kit/env/helpers', () => ({
  isIOSTheme: () => mockedIsiOSTheme,
}));

describe('DefaultSlider', () => {
  it('should render gmd slider', () => {
    const products = {
      mockedId: {
        id: 'mockedId',
        name: 'Mocked Product',
        price: {
          unitPrice: 100,
          currency: 'EUR',
        },
      },
    };
    const component = mount(<DefaultSlider products={products} productIds={['mockedId']} />);
    expect(component.find('Item').exists()).toBe(true);
    expect(component.find(GMDProductCard).exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should render gmd slider', () => {
    mockedIsiOSTheme = true;
    const products = {
      mockedId: {
        id: 'mockedId',
        name: 'Mocked Product',
        price: {
          unitPrice: 100,
          currency: 'EUR',
        },
      },
    };
    const component = mount(<DefaultSlider products={products} productIds={['mockedId']} />);
    expect(component.find('Item').exists()).toBe(true);
    expect(component.find(IOSProductCard).exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should not render a placeholder', () => {
    const products = {};
    const component = mount(<DefaultSlider products={products} productIds={['mockedId']} />);
    expect(component.find('Item').exists()).toBe(true);
    expect(component.find(PlaceholderCard).exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
