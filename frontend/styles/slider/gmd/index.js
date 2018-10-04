import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const wrapper = {
  background: colors.background,
  padding: variables.gap.small,
  marginBottom: variables.gap.big,
};

const headline = {
  textAlign: 'center',
  margin: `0 0 ${variables.gap.small}px`,
};

const defaultSliderContainer = {
  position: 'relative',
};

const defaultSliderCard = {
  height: 'auto',
};

export default {
  wrapper,
  headline,
  defaultSliderContainer,
  defaultSliderCard,
};
