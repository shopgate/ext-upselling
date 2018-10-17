import React from 'react';
import { mount } from 'enzyme';
import pageComponentFactory from './index';

describe('pageComponentFactory', () => {
  // eslint-disable-next-line require-jsdoc, react/prop-types
  const View = ({ children }) => (<div id="view">{children}</div>);
  // eslint-disable-next-line require-jsdoc, react/prop-types, no-shadow
  const ComponentProto = ({ View }) => (<View><div id="component">Hello world</div></View>);

  it('should render a component in a view', () => {
    const ComponentClass = pageComponentFactory({
      View,
      ComponentProto,
    });
    const component = mount(<ComponentClass />);

    expect(component.exists('#view')).toBe(true);
    expect(component.exists('#component')).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
