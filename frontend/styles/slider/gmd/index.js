import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

const wrapper = {
  padding: `${variables.gap.small}px 0`,
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
  marginRight: variables.gap.small,
  marginLeft: variables.gap.small,
};

export default {
  wrapper,
  headline,
  defaultSliderContainer,
  defaultSliderItem,
  defaultSliderCard,
};
