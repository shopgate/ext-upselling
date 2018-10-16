import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Trampoline from './index';

const url = '/foo';
const mockedStore = configureStore([thunk]);
const store = mockedStore({
  history: {
    pathname: url,
  },
});
const mockedReplaceHistory = jest.fn();

jest.mock('@shopgate/pwa-common/actions/history/replaceHistory', () => (...params) => {
  mockedReplaceHistory(...params);
  return { type: 'foo' };
});

describe('Trampoline', () => {
  it('should render nothing and redirect', () => {
    const wrapper = mount((
      <Provider store={store}>
        <Trampoline />
      </Provider>
    ));

    expect(mockedReplaceHistory).toHaveBeenCalledTimes(1);
    expect(mockedReplaceHistory).toHaveBeenCalledWith({
      pathname: url,
    });

    expect(wrapper.html()).toBe(null);
    expect(wrapper).toMatchSnapshot();
  });
});
