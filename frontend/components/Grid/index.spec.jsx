import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

const mockedStore = configureStore();
// eslint-disable-next-line react/prop-types, require-jsdoc
const MockedSheetComponent = props => (<div id="sheet">{props.children}</div>);
jest.mock('@shopgate/pwa-ui-shared/Sheet', () => MockedSheetComponent);

let mockedProductRelationsFiltered = [];
let mockedRelatedProductsByIdFiltered = {};
jest.mock('../../selectors', () => ({
  getProductRelationsFiltered: () => () => mockedProductRelationsFiltered,
  getRelatedProductsByIdFiltered: () => () => mockedRelatedProductsByIdFiltered,
}));

jest.mock('@shopgate/pwa-extension-kit/env/helpers', () => ({
  isIOSTheme: () => false,
}));

const mockedGetProductRelationsAction = jest.fn();
jest.mock('@shopgate/pwa-common-commerce/product/actions/getProductRelations', () => (...args) => {
  mockedGetProductRelationsAction(...args);
  return {
    type: 'MOCKED_ACTION',
  };
});

jest.mock('../Item', () => () => (<div>Mocked item</div>));

// eslint-disable-next-line require-jsdoc, react/prop-types
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
  it('should fetch data and render nothing when there are no products to show', () => {
    const component = mount((
      <Provider store={mockedStore({})}>
        <Grid {...defaultProps} />
      </Provider>
    ));
    expect(component.html()).toBe(null);
    expect(mockedGetProductRelationsAction).toHaveBeenCalled();
  });

  it('should use placeholder keys when product data is not available', () => {
    mockedProductRelationsFiltered = ['mockedRelationId'];
    const component = mount((
      <Provider store={mockedStore({})}>
        <Grid {...defaultProps} />
      </Provider>
    ));
    expect(component.find(MockedGridComponent.Item).key().startsWith('placeholder')).toBe(true);
  });

  it('should use product keys when product data is not available', () => {
    mockedProductRelationsFiltered = ['mockedRelationId'];
    mockedRelatedProductsByIdFiltered = {
      mockedRelationId: {},
    };

    const component = mount((
      <Provider store={mockedStore({})}>
        <Grid {...defaultProps} />
      </Provider>
    ));
    expect(component.find(MockedGridComponent.Item).key().startsWith('product')).toBe(true);
  });

  it('should destroy placeholders after 2 seconds', (done) => {
    mockedProductRelationsFiltered = ['mockedRelationIdOne', 'mockedRelationIdTwo'];
    mockedRelatedProductsByIdFiltered = {
      mockedRelationIdOne: {},
    };

    const component = mount((
      <Provider store={mockedStore({})}>
        <Grid {...defaultProps} />
      </Provider>
    ));
    expect(component.find(MockedGridComponent.Item).length).toBe(2);
    setTimeout(() => {
      component.update();
      expect(component.find(MockedGridComponent.Item).length).toBe(1);
      done();
    }, 2001);
  });

  it('should clear timeout when productIds matches available products', () => {
    jest.useFakeTimers();
    mockedProductRelationsFiltered = ['mockedRelationIdOne', 'mockedRelationIdTwo'];
    mockedRelatedProductsByIdFiltered = {
      mockedRelationIdOne: {},
      mockedRelationIdTwo: {},
    };

    const component = mount((
      <Provider store={mockedStore({})}>
        <Grid {...defaultProps} />
      </Provider>
    ));
    component.find(Grid).instance().componentWillReceiveProps();
    component.setProps();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  it('should not clear timeout when productIds do not matche available products', () => {
    jest.useFakeTimers();
    mockedProductRelationsFiltered = ['mockedRelationIdOne', 'mockedRelationIdTwo'];
    mockedRelatedProductsByIdFiltered = {
      mockedRelationIdOne: {},
    };

    const component = mount((
      <Provider store={mockedStore({})}>
        <Grid {...defaultProps} />
      </Provider>
    ));
    component.find(Grid).instance().componentWillReceiveProps();
    component.setProps();
    expect(clearTimeout).toHaveBeenCalledTimes(0);
  });
});
