import { css } from 'glamor';

const getBaseHeight = (itemsCount) => {
  if (itemsCount === 1) {
    return '200vw';
  }

  return '100vw';
};

const sheet = (itemsCount) => {
  return css({
    maxHeight: getBaseHeight(itemsCount),
  }).toString();
};

const content = (itemsCount) => {
  return css({
    maxHeight: `calc(${getBaseHeight(itemsCount)} - 56px - var(--safe-area-inset-top))`,
  }).toString();
};

export default {
  sheet,
  content,
};
