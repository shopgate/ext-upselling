import React, { Component as MockedComponent } from 'react';
import { mount } from 'enzyme';
import DefaultSlider from './index';
import IOSProductCard from './components/Item/components/ios11/ProductCard';
import GMDProductCard from './components/Item/components/gmd/ProductCard';
import PlaceholderCard from './components/Item/components/PlaceholderCard';

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

let mockedIsiOSTheme = false;
jest.mock('../../../../helpers/isiOSTheme', () => () => mockedIsiOSTheme);

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

  it('should render ios slider', () => {
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

  it('should render a placeholder', () => {
    const products = {};
    const component = mount(<DefaultSlider products={products} productIds={['mockedId']} />);
    expect(component.find('Item').exists()).toBe(true);
    expect(component.find(PlaceholderCard).exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
