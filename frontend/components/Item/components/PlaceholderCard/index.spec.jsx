import React from 'react';
import { mount } from 'enzyme';
import PlaceholderCard from './index';

// The Card of the engage library reads its appearance from the app settings in redux.
jest.mock('@shopgate/engage/components/Card/useCardAppearance', () => ({
  useCardAppearance: () => ({
    variant: 'elevation',
    elevation: 1,
  }),
}));

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
    expect(component.find('[data-test-id="upselling-placeholder-image"]').exists()).toBe(true);
    expect(component.find('[data-test-id="upselling-placeholder-details"]').exists()).toBe(true);
    expect(component).toMatchSnapshot();

    htmlNameOnly = component.html();
    expect(htmlAll !== htmlNameOnly).toBe(true);
  });

  it('should render image and price', () => {
    const component = mount(<PlaceholderCard titleRows={2} hideName hidePrice={false} />);
    expect(component.find('[data-test-id="upselling-placeholder-image"]').exists()).toBe(true);
    expect(component.find('[data-test-id="upselling-placeholder-details"]').exists()).toBe(true);
    expect(component).toMatchSnapshot();

    htmlPriceOnly = component.html();
    expect(htmlAll !== htmlPriceOnly).toBe(true);
    expect(htmlNameOnly !== htmlPriceOnly).toBe(true);
  });

  it('should render image only', () => {
    const component = mount(<PlaceholderCard titleRows={2} hideName hidePrice />);
    expect(component.find('[data-test-id="upselling-placeholder-image"]').exists()).toBe(true);
    expect(component.find('[data-test-id="upselling-placeholder-details"]').exists()).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('should fall back to two title rows', () => {
    const component = mount(<PlaceholderCard hideName={false} hidePrice={false} />);
    expect(component.find('[data-test-id="upselling-placeholder-details"]').exists()).toBe(true);
    expect(component.html()).toBe(htmlAll);
  });
});
