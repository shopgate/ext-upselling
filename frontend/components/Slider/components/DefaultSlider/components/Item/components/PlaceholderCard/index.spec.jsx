import React from 'react';
import { mount } from 'enzyme';
import PlaceholderCard from './index';

let mockedIsiOSTheme = false;
jest.mock('../../../../../../../../helpers/isiOSTheme', () => () => mockedIsiOSTheme);

describe('PlaceholderCard', () => {
  let htmlAll;
  let htmlNameOnly;
  let htmlPriceOnly;

  it('should render all elements', () => {
    const component = mount(<PlaceholderCard titleRows={2} hideName={false} hidePrice={false} />);
    // Has image
    expect(component.find('[data-test-id="upselling-placeholder-image"]').exists()).toBe(true);
    // Has details
    expect(component.find('[data-test-id="upselling-placeholder-details"]').exists()).toBe(true);
    // HideName vs HidePrice checked in snapshots and html comparison
    expect(component).toMatchSnapshot();
    htmlAll = component.html();
  });

  it('should render image and name', () => {
    const component = mount(<PlaceholderCard titleRows={2} hideName={false} hidePrice />);
    // Has image
    expect(component.find('[data-test-id="upselling-placeholder-image"]').exists()).toBe(true);
    // Has details
    expect(component.find('[data-test-id="upselling-placeholder-details"]').exists()).toBe(true);
    // HideName vs HidePrice checked in a snapshot since only className is different
    expect(component).toMatchSnapshot();

    htmlNameOnly = component.html();
    expect(htmlAll !== htmlNameOnly).toBe(true);
  });

  it('should render image and price', () => {
    const component = mount(<PlaceholderCard titleRows={2} hideName hidePrice={false} />);
    // Has image
    expect(component.find('[data-test-id="upselling-placeholder-image"]').exists()).toBe(true);
    // Has details
    expect(component.find('[data-test-id="upselling-placeholder-details"]').exists()).toBe(true);
    // HideName vs HidePrice checked in a snapshot since only className is different
    expect(component).toMatchSnapshot();

    htmlPriceOnly = component.html();
    expect(htmlAll !== htmlPriceOnly).toBe(true);
    expect(htmlNameOnly !== htmlPriceOnly).toBe(true);
  });

  it('should render image only', () => {
    const component = mount(<PlaceholderCard titleRows={2} hideName hidePrice />);
    // Has image
    expect(component.find('[data-test-id="upselling-placeholder-image"]').exists()).toBe(true);
    // Has details
    expect(component.find('[data-test-id="upselling-placeholder-details"]').exists()).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('should render different classNames on ios', () => {
    mockedIsiOSTheme = true;
    const component = mount(<PlaceholderCard titleRows={2} hideName={false} hidePrice={false} />);
    // Has image
    expect(component.find('[data-test-id="upselling-placeholder-image"]').exists()).toBe(true);
    // Has details
    expect(component.find('[data-test-id="upselling-placeholder-details"]').exists()).toBe(true);
    expect(component).toMatchSnapshot();

    expect(htmlAll !== component.html());
  });
});