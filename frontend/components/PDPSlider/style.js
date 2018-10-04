import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const wrapper = css({
  background: colors.background,
  padding: variables.gap.small,
}).toString();

const headline = css({
  textAlign: 'center',
}).toString();

export default {
  wrapper,
  headline,
};
