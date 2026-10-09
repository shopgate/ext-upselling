import React from 'react';
import { render } from '@testing-library/react';
import PlaceholderCard from './index';

// The Card of the engage library reads its appearance from the app settings in redux.
jest.mock('@shopgate/engage/components/Card/useCardAppearance', () => ({
  useCardAppearance: () => ({
    variant: 'elevation',
    elevation: 1,
  }),
}));

/**
 * @param {Element} container The render container.
 * @param {string} id The data-test-id to look up.
 * @returns {Element|null}
 */
const byTestId = (container, id) => container.querySelector(`[data-test-id="${id}"]`);

describe('PlaceholderCard', () => {
  it('should render the image and details when name and price are shown', () => {
    const { container } = render(
      <PlaceholderCard titleRows={2} hideName={false} hidePrice={false} />
    );

    expect(byTestId(container, 'upselling-placeholder-image')).toBeInTheDocument();
    expect(byTestId(container, 'upselling-placeholder-details')).toBeInTheDocument();
  });

  it('should render the image and details when only the name is shown', () => {
    const { container } = render(<PlaceholderCard titleRows={2} hideName={false} hidePrice />);

    expect(byTestId(container, 'upselling-placeholder-image')).toBeInTheDocument();
    expect(byTestId(container, 'upselling-placeholder-details')).toBeInTheDocument();
  });

  it('should render the image and details when only the price is shown', () => {
    const { container } = render(<PlaceholderCard titleRows={2} hideName hidePrice={false} />);

    expect(byTestId(container, 'upselling-placeholder-image')).toBeInTheDocument();
    expect(byTestId(container, 'upselling-placeholder-details')).toBeInTheDocument();
  });

  it('should render the image only when name and price are hidden', () => {
    const { container } = render(<PlaceholderCard titleRows={2} hideName hidePrice />);

    expect(byTestId(container, 'upselling-placeholder-image')).toBeInTheDocument();
    expect(byTestId(container, 'upselling-placeholder-details')).not.toBeInTheDocument();
  });

  it('should fall back to two title rows', () => {
    const { container } = render(<PlaceholderCard hideName={false} hidePrice={false} />);

    expect(byTestId(container, 'upselling-placeholder-details')).toBeInTheDocument();
  });
});
