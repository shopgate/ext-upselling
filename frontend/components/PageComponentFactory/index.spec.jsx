import React from 'react';
import { mount } from 'enzyme';
import pageComponentFactory from './index';

describe('pageComponentFactory', () => {
  const View = ({ children }) => (<div id="view">{children}</div>);
  const ComponentProto = ({ View }) => (<View><div id="component">Hello world</div></View>);

  it('should render a component in a view', () => {
    const ComponentClass = pageComponentFactory({ View, ComponentProto });
    const component = mount(<ComponentClass />);

    expect(component.find('#view').length).toBe(1);
    expect(component.find('#component').length).toBe(1);
    expect(component).toMatchSnapshot();
  })
});
