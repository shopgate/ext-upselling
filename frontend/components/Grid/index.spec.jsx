import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

const mockedStore = configureStore();

let mockedProductRelationsFiltered = [];
let mockedRelatedProductsByIdFiltered = {};
jest.mock('../../selectors', () => ({
  getProductRelationsFiltered: () => () => mockedProductRelationsFiltered,
  getRelatedProductsByIdFiltered: () => () => mockedRelatedProductsByIdFiltered,
}));

const mockedGetProductRelationsAction = jest.fn();
jest.mock('@shopgate/pwa-common-commerce/product/actions/getProductRelations', () => (...args) => {
  mockedGetProductRelationsAction(...args);
  return {
    type: 'MOCKED_ACTION',
  };
});

const MockedItem = () => (<div>Mocked item</div>);
jest.mock('../Item', () => MockedItem);

// eslint-disable-next-line react/prop-types
const MockedGridComponent = props => (<div>{props.children}</div>);
// eslint-disable-next-line react/prop-types
MockedGridComponent.Item = props => (<div>{props.children}</div>);
jest.mock('@shopgate/pwa-common/components/Grid', () => MockedGridComponent);

describe('Grid', () => {
  // eslint-disable-next-line global-require
  const Grid = require('./index').default;
  const defaultProps = {
    productId: 'mockedId',
    type: 'mockedType',
    headline: 'mockedHeadline',
  };

  /**
   * @returns {Object}
   */
  const makeComponent = () => mount((
    <Provider store={mockedStore({})}>
      <Grid {...defaultProps} />
    </Provider>
  ));

  beforeEach(() => {
    jest.useFakeTimers();
    mockedGetProductRelationsAction.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch data and render nothing when there are no products to show', () => {
    mockedProductRelationsFiltered = [];
    mockedRelatedProductsByIdFiltered = {};
    const component = makeComponent();

    expect(component.html()).toBe('');
    expect(mockedGetProductRelationsAction).toHaveBeenCalledWith({
      productId: 'mockedId',
      type: 'mockedType',
    });
  });

  it('should use placeholder keys when product data is not available', () => {
    mockedProductRelationsFiltered = ['mockedRelationId'];
    mockedRelatedProductsByIdFiltered = {};
    const component = makeComponent();

    expect(component.find(MockedGridComponent.Item).key().startsWith('placeholder')).toBe(true);
    expect(component.find(MockedItem).props().productId).toBe('mockedRelationId');
  });

  it('should use product keys when product data is available', () => {
    mockedProductRelationsFiltered = ['mockedRelationId'];
    mockedRelatedProductsByIdFiltered = {
      mockedRelationId: {},
    };
    const component = makeComponent();

    expect(component.find(MockedGridComponent.Item).key().startsWith('product')).toBe(true);
  });

  it('should destroy placeholders after 2 seconds', () => {
    mockedProductRelationsFiltered = ['mockedRelationIdOne', 'mockedRelationIdTwo'];
    mockedRelatedProductsByIdFiltered = {
      mockedRelationIdOne: {},
    };
    const component = makeComponent();

    expect(component.find(MockedGridComponent.Item).length).toBe(2);
    act(() => {
      jest.advanceTimersByTime(2001);
    });
    component.update();
    expect(component.find(MockedGridComponent.Item).length).toBe(1);
  });

  it('should keep all items when every product is available', () => {
    mockedProductRelationsFiltered = ['mockedRelationIdOne', 'mockedRelationIdTwo'];
    mockedRelatedProductsByIdFiltered = {
      mockedRelationIdOne: {},
      mockedRelationIdTwo: {},
    };
    const component = makeComponent();

    act(() => {
      jest.advanceTimersByTime(2001);
    });
    component.update();
    expect(component.find(MockedGridComponent.Item).length).toBe(2);
  });
});
