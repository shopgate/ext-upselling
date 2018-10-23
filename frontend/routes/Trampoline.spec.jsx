import React from 'react';
import { mount } from 'enzyme';
import Trampoline from './Trampoline';

// eslint-disable-next-line react/prop-types, require-jsdoc
const MockedDummyComponent = props => <div>{props.children}</div>;

jest.mock('@shopgate/pwa-common/components/Router/components/Route', () => props => (
  <MockedDummyComponent {...props} />
));

describe('Trampoline', () => {
  it('should render Route', () => {
    // eslint-disable-next-line require-jsdoc, react/prop-types
    const View = ({ children }) => <div>{children}</div>;
    const component = mount(<Trampoline View={View} />);

    expect(component.find(MockedDummyComponent).props().path).toBe('/trampoline/*');
    expect(typeof component.find(MockedDummyComponent).props().component).toBe('function');
  });
});
