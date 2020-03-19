const standardConfig = require('@shopgate/pwa-unit-test/jest.config');

module.exports = {
  ...standardConfig,
  transformIgnorePatterns: [
    'node_modules/(?!(@shopgate))',
  ],
};
