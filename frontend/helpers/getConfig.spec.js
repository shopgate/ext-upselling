const mockedConfig = {};
jest.mock('../config', () => mockedConfig, { virtual: true });

describe('getConfig', () => {
  it('should return config', () => {
    // eslint-disable-next-line global-require
    const getConfig = require('./getConfig').default;
    expect(getConfig()).toBe(mockedConfig);
  });
});
