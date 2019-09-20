import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

const mockedStore = configureStore();
// eslint-disable-next-line react/prop-types, require-jsdoc
const MockedSheetComponent = props => (<div id="sheet">{props.children}</div>);
jest.mock('@shopgate/pwa-ui-shared/Sheet', () => MockedSheetComponent);

let mockedProductRelationsFiltered = [];
jest.mock('../../selectors', () => ({
  getProductRelationsFiltered: () => () => mockedProductRelationsFiltered,
}));
// eslint-disable-next-line require-jsdoc
const MockedGridComponent = () => <div>Hello world</div>;
jest.mock('../../components/Grid', () => MockedGridComponent);

jest.mock('@shopgate/pwa-extension-kit/env/helpers', () => ({
  isIOSTheme: () => false,
}));

describe('Sheet', () => {
  // eslint-disable-next-line global-require
  const Sheet = require('./index').default;
  const defaultProps = {
    headline: 'Mocked headline',
    isOpen: false,
    onClose: () => {},
    productId: 'mockedId',
    showName: true,
    showPrice: true,
    type: 'mockedType',
    titleRows: 3,
    maxItemsPerLine: 3,
  };

  it('should render with 3 items per line as default', () => {
    mockedProductRelationsFiltered = [1, 2, 3];
    const component = mount((
      <Provider store={mockedStore({})}>
        <Sheet {...defaultProps} />
      </Provider>
    ));
    expect(component.find(MockedGridComponent).props().itemsPerLine).toBe(3);
    expect(component).toMatchSnapshot();
  });

  it('should render with 2 items per line', () => {
    mockedProductRelationsFiltered = [1, 2];
    const component = mount((
      <Provider store={mockedStore({})}>
        <Sheet {...defaultProps} />
      </Provider>
    ));
    expect(component.find(MockedGridComponent).props().itemsPerLine).toBe(2);
    expect(component).toMatchSnapshot();
  });

  it('should render with 1 item per line', () => {
    mockedProductRelationsFiltered = [1];
    const component = mount((
      <Provider store={mockedStore({})}>
        <Sheet {...defaultProps} />
      </Provider>
    ));
    expect(component.find(MockedGridComponent).props().itemsPerLine).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('should keep the sheet closed when there are no items to show', () => {
    mockedProductRelationsFiltered = [];
    const component = mount((
      <Provider store={mockedStore({})}>
        <Sheet {...defaultProps} isOpen />
      </Provider>
    ));
    // Check if mocking actually works.
    expect(component.find(Sheet).props().isOpen).toBe(true);
    // Check if SheetComponent is still closed.
    expect(component.find(MockedSheetComponent).props().isOpen).toBe(false);
    expect(component).toMatchSnapshot();
  });
});
