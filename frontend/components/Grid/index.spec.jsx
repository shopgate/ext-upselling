import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, act } from '@testing-library/react';

const mockedStore = configureStore();

let mockedProductRelationsFiltered = [];
let mockedRelatedProductsByIdFiltered = {};
jest.mock('../../selectors', () => ({
  getProductRelationsFiltered: () => () => mockedProductRelationsFiltered,
  getRelatedProductsByIdFiltered: () => () => mockedRelatedProductsByIdFiltered,
}));

const mockedFetchProductRelations = jest.fn();
jest.mock('@shopgate/engage/product', () => ({
  fetchProductRelations: (...args) => {
    mockedFetchProductRelations(...args);
    return { type: 'MOCKED_ACTION' };
  },
}));

jest.mock('@shopgate/engage/components', () => {
  // eslint-disable-next-line react/prop-types
  const GridComponent = ({ children }) => <div>{children}</div>;
  // eslint-disable-next-line react/prop-types
  GridComponent.Item = ({ children }) => <div>{children}</div>;
  return { Grid: GridComponent };
});

const mockItem = jest.fn();
jest.mock('../Item', () => (props) => {
  mockItem(props);
  // eslint-disable-next-line react/prop-types
  return <div data-test-id="grid-item">{props.productId}</div>;
});

describe('Grid', () => {
  // eslint-disable-next-line global-require
  const Grid = require('./index').default;
  const defaultProps = {
    productId: 'mockedId',
    type: 'mockedType',
    headline: 'mockedHeadline',
  };

  /**
   * @param {Object} [props] Additional props.
   * @returns {Object}
   */
  const makeComponent = props => render((
    <Provider store={mockedStore({})}>
      <Grid {...defaultProps} {...props} />
    </Provider>
  ));

  /**
   * @param {Element} container The render container.
   * @returns {NodeList}
   */
  const getItems = container => container.querySelectorAll('[data-test-id="grid-item"]');

  beforeEach(() => {
    jest.useFakeTimers();
    mockedFetchProductRelations.mockClear();
    mockedProductRelationsFiltered = [];
    mockedRelatedProductsByIdFiltered = {};
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch data and render nothing when there are no products to show', () => {
    const { container } = makeComponent();

    expect(container).toBeEmptyDOMElement();
    expect(mockedFetchProductRelations).toHaveBeenCalledWith({
      productId: 'mockedId',
      type: 'mockedType',
    });
  });

  it('should render an item for every related product id', () => {
    mockedProductRelationsFiltered = ['mockedRelationId'];
    const { container } = makeComponent();

    const items = getItems(container);
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('mockedRelationId');
  });

  it('should pass the hidden buttons to every item', () => {
    mockedProductRelationsFiltered = ['mockedRelationId'];
    makeComponent({
      hideFavorites: true,
      hideAddToCart: true,
    });

    expect(mockItem).toHaveBeenCalledWith(expect.objectContaining({
      productId: 'mockedRelationId',
      hideFavorites: true,
      hideAddToCart: true,
    }));
  });

  it('should destroy placeholders after 2 seconds', () => {
    mockedProductRelationsFiltered = ['mockedRelationIdOne', 'mockedRelationIdTwo'];
    mockedRelatedProductsByIdFiltered = {
      mockedRelationIdOne: {},
    };
    const { container } = makeComponent();

    expect(getItems(container)).toHaveLength(2);
    act(() => {
      jest.advanceTimersByTime(2001);
    });
    expect(getItems(container)).toHaveLength(1);
  });

  it('should keep all items when every product is available', () => {
    mockedProductRelationsFiltered = ['mockedRelationIdOne', 'mockedRelationIdTwo'];
    mockedRelatedProductsByIdFiltered = {
      mockedRelationIdOne: {},
      mockedRelationIdTwo: {},
    };
    const { container } = makeComponent();

    act(() => {
      jest.advanceTimersByTime(2001);
    });
    expect(getItems(container)).toHaveLength(2);
  });
});
