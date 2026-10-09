import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';

const mockedStore = configureStore();

const mockSheetComponent = jest.fn();
jest.mock('@shopgate/engage/components', () => ({
  SheetDrawer: (props) => {
    mockSheetComponent(props);
    // eslint-disable-next-line react/prop-types
    return <div id="sheet">{props.children}</div>;
  },
}));

let mockedProductRelationsFiltered = [];
jest.mock('../../selectors', () => ({
  getProductRelationsFiltered: () => () => mockedProductRelationsFiltered,
}));

const mockGrid = jest.fn();
jest.mock('../../components/Grid', () => (props) => {
  mockGrid(props);
  return <div>Grid</div>;
});

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

  /**
   * @param {Object} props Additional props.
   * @returns {Object}
   */
  const makeComponent = props => render((
    <Provider store={mockedStore({})}>
      <Sheet {...defaultProps} {...props} />
    </Provider>
  ));

  beforeEach(() => {
    mockSheetComponent.mockClear();
    mockGrid.mockClear();
    mockedProductRelationsFiltered = [];
  });

  it('should render with 3 items per line as default', () => {
    mockedProductRelationsFiltered = [1, 2, 3];
    makeComponent();

    expect(mockGrid).toHaveBeenCalledWith(expect.objectContaining({ itemsPerLine: 3 }));
  });

  it('should render with 2 items per line', () => {
    mockedProductRelationsFiltered = [1, 2];
    makeComponent();

    expect(mockGrid).toHaveBeenCalledWith(expect.objectContaining({ itemsPerLine: 2 }));
  });

  it('should render with 1 item per line', () => {
    mockedProductRelationsFiltered = [1];
    makeComponent();

    expect(mockGrid).toHaveBeenCalledWith(expect.objectContaining({ itemsPerLine: 1 }));
  });

  it('should keep the sheet closed when there are no items to show', () => {
    mockedProductRelationsFiltered = [];
    makeComponent({ isOpen: true });

    expect(mockSheetComponent).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: false }));
  });
});
