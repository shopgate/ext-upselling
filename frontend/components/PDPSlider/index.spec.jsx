import React from 'react';
import { render } from '@testing-library/react';
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

const mockSlider = jest.fn();
jest.mock('../Slider', () => (props) => {
  mockSlider(props);
  return <div>Slider</div>;
});
jest.mock('../connectors', () => ({
  makeConnectProductWithRelations: () => Component => Component,
}));

describe('PDPSlider', () => {
  beforeEach(() => {
    mockSlider.mockClear();
  });

  it('should render with price and names', () => {
    render(<PDPSlider productId="mockedProductId" config={getConfig().productPage[0]} />);

    expect(mockSlider).toHaveBeenCalledWith(expect.objectContaining({
      productId: 'mockedProductId',
      type: 'mockedType',
      headline: 'mockedHeadline',
      showPrice: true,
      showName: true,
    }));
  });

  it('should render without price and names as default', () => {
    mockedShowPrice = null;
    mockedShowName = null;
    render(<PDPSlider productId="mockedProductId" config={getConfig().productPage[0]} />);

    expect(mockSlider).toHaveBeenCalledWith(expect.objectContaining({
      showPrice: false,
      showName: false,
    }));
  });

  it('should render nothing when productId is not ready', () => {
    const { container } = render(<PDPSlider config={getConfig().productPage[0]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
