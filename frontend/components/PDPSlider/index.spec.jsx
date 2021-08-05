import React from 'react';
import { mount } from 'enzyme';
import getConfig from '../../helpers/getConfig';
import PDPSlider from './index';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  memo: cmp => cmp,
}));
let mockedShowPrice = true;
let mockedShowName = true;
jest.mock('../../helpers/getConfig', () => () => ({
  productPage: [
    {
      type: 'mockedType',
      headline: 'mockedHeadline',
      get showPrice() { return mockedShowPrice; },
      get showName() { return mockedShowName; },
    },
  ],
}));
jest.mock('../Slider', () => function Slider() {
  return null;
});
jest.mock('../connectors', () => ({
  makeConnectProductWithRelations: () => PDPSheetComponent => PDPSheetComponent,
}));

describe('PDPSlider', () => {
  it('should render with price and names', () => {
    const component = mount(<PDPSlider productId="mockedProductId" config={getConfig().productPage[0]} />);

    expect(component.find('PDPSlider').props().productId).toBe('mockedProductId');
    expect(component.find('Slider').props()).toMatchObject(getConfig().productPage[0]);
    expect(component).toMatchSnapshot();
  });

  it('should render without price and names as default', () => {
    mockedShowPrice = null;
    mockedShowName = null;
    const component = mount(<PDPSlider productId="mockedProductId" config={getConfig().productPage[0]} />);

    expect(component.find('Slider').props().showPrice).toBe(false);
    expect(component.find('Slider').props().showName).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('should render nothing when productId is not ready', () => {
    const component = mount(<PDPSlider config={getConfig().productPage[0]} />);
    expect(component.html()).toBe(null);
  });
});
