import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';

const mockedStore = configureStore();

const mockProductCard = jest.fn();
jest.mock('@shopgate/engage/core/hooks', () => ({
  useThemeComponents: () => ({
    ProductCard: (props) => {
      mockProductCard(props);
      return <div>Mocked ProductCard</div>;
    },
  }),
}));

const mockPlaceholderCard = jest.fn();
jest.mock('./components/PlaceholderCard', () => (props) => {
  mockPlaceholderCard(props);
  return <div>Mocked PlaceholderCard</div>;
});

let mockedProducts = {};
jest.mock('@shopgate/engage/product/selectors/product', () => ({
  getProductDataById: (state, { productId }) => mockedProducts[productId] || null,
}));

let mockedHideRatingStars = false;
jest.mock('../../helpers/getConfig', () => () => ({
  get hideRatingStars() { return mockedHideRatingStars; },
}));

describe('Item', () => {
  // eslint-disable-next-line global-require
  const Item = require('./index').default;

  /**
   * @param {Object} props Props.
   * @returns {Object}
   */
  const makeComponent = props => render((
    <Provider store={mockedStore({})}>
      <Item productId="mockedId" {...props} />
    </Provider>
  ));

  beforeEach(() => {
    mockProductCard.mockClear();
    mockPlaceholderCard.mockClear();
    mockedProducts = {};
    mockedHideRatingStars = false;
  });

  it('should render a placeholder when the product is not available yet', () => {
    makeComponent({
      showName: true,
      titleRows: 3,
    });

    expect(mockPlaceholderCard).toHaveBeenCalledWith(expect.objectContaining({
      titleRows: 3,
      hideName: false,
      hidePrice: true,
    }));
    expect(mockProductCard).not.toHaveBeenCalled();
  });

  it('should render the product card of the theme when the product is available', () => {
    mockedProducts = { mockedId: { id: 'mockedId' } };
    makeComponent({
      showName: true,
      showPrice: true,
      style: { margin: 4 },
    });

    expect(mockProductCard).toHaveBeenCalledWith(expect.objectContaining({
      productId: 'mockedId',
      style: { margin: 4 },
      hideName: false,
      hidePrice: false,
      hideRating: false,
      titleRows: null,
    }));
    expect(mockPlaceholderCard).not.toHaveBeenCalled();
  });

  it('should hide the rating when configured', () => {
    mockedProducts = { mockedId: { id: 'mockedId' } };
    mockedHideRatingStars = true;
    makeComponent();

    expect(mockProductCard).toHaveBeenCalledWith(expect.objectContaining({
      hideName: true,
      hidePrice: true,
      hideRating: true,
    }));
  });
});
