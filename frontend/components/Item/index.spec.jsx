import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

const mockedStore = configureStore();

const MockedProductCard = () => <div>Mocked ProductCard</div>;
jest.mock('@shopgate/engage/core/hooks', () => ({
  useThemeComponents: () => ({
    ProductCard: MockedProductCard,
  }),
}));

const MockedPlaceholderCard = () => <div>Mocked PlaceholderCard</div>;
jest.mock('./components/PlaceholderCard', () => MockedPlaceholderCard);

let mockedProducts = {};
jest.mock('@shopgate/pwa-common-commerce/product/selectors/product', () => ({
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
  const makeComponent = props => mount((
    <Provider store={mockedStore({})}>
      <Item productId="mockedId" {...props} />
    </Provider>
  ));

  it('should render a placeholder when the product is not available yet', () => {
    mockedProducts = {};
    const component = makeComponent({
      showName: true,
      titleRows: 3,
    });

    expect(component.find(MockedPlaceholderCard).props()).toMatchObject({
      titleRows: 3,
      hideName: false,
      hidePrice: true,
    });
    expect(component.find(MockedProductCard).exists()).toBe(false);
  });

  it('should render the product card of the theme when the product is available', () => {
    mockedProducts = { mockedId: { id: 'mockedId' } };
    const component = makeComponent({
      showName: true,
      showPrice: true,
      style: { margin: 4 },
    });

    expect(component.find(MockedProductCard).props()).toEqual({
      productId: 'mockedId',
      style: { margin: 4 },
      hideName: false,
      hidePrice: false,
      hideRating: false,
      titleRows: null,
    });
    expect(component.find(MockedPlaceholderCard).exists()).toBe(false);
  });

  it('should hide the rating when configured', () => {
    mockedProducts = { mockedId: { id: 'mockedId' } };
    mockedHideRatingStars = true;
    const component = makeComponent();

    expect(component.find(MockedProductCard).props()).toMatchObject({
      hideName: true,
      hidePrice: true,
      hideRating: true,
    });
  });
});
