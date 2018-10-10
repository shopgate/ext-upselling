import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const wrapper = {
  background: colors.background,
  padding: variables.gap.small,
  marginBottom: variables.gap.big,
};

const headline ={
  textAlign: 'center',
};

const defaultSliderContainer ={
  paddingBottom: variables.gap.big,
  position: 'relative',
};


const defaultSliderCard = {
  height: '100%',
};

export default {
  wrapper,
  headline,
  defaultSliderContainer,
  defaultSliderCard,
};