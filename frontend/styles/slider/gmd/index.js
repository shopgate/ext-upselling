import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const wrapper = {
  background: colors.background,
  padding: variables.gap.small,
  marginBottom: variables.gap.big,
};

const headline = {
  fontSize: 18,
  textAlign: 'center',
  margin: `0 0 ${variables.gap.small}px`,
};

const defaultSliderContainer = {
  position: 'relative',
};

const defaultSliderItem = {
  display: 'flex',
  height: '100%',
};

const defaultSliderCard = {
  height: 'auto',
  width: '100%',
};

export default {
  wrapper,
  headline,
  defaultSliderContainer,
  defaultSliderItem,
  defaultSliderCard,
};
