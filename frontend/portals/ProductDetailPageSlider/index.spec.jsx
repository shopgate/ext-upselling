import React from 'react';
import { render, screen } from '@testing-library/react';

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

  it('should render nothing when type is not configured', () => {
    // eslint-disable-next-line global-require
    const ProductDetailPage = require('./index').default;
    const { container } = render(<ProductDetailPage name="mockedPosition" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render nothing when position does not match', () => {
    mockedProductPageConfig = {
      type: 'mockedType',
      position: 'mockedPosition',
    };
    // eslint-disable-next-line global-require
    const ProductDetailPage = require('./index').default;
    const { container } = render(<ProductDetailPage name="anotherPosition" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render PDPSlider when position matches', () => {
    mockedProductPageConfig = {
      type: 'mockedType',
      position: 'mockedPosition',
    };
    // eslint-disable-next-line global-require
    const ProductDetailPage = require('./index').default;
    render(<ProductDetailPage name="mockedPosition" />);

    expect(screen.getByText('PDPSlider component')).toBeInTheDocument();
  });

  it('should be backward compatible with configs as an object', () => {
    mockedProductPageConfig = {
      type: 'mockedType',
      position: 'mockedPosition',
    };
    // eslint-disable-next-line global-require
    const ProductDetailPage = require('./index').default;
    render(<ProductDetailPage name="mockedPosition" />);

    expect(screen.getByText('PDPSlider component')).toBeInTheDocument();
  });
});
