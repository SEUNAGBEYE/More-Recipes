module.exports = {
  testMatch: [
    '**/?(*.)(spec).js?(x)'
  ],
  setupFiles: [
    '<rootDir>./client/__tests__/config.js'
  ],
  globals: {
    toastr: {
      info: (() => {}),
      success: (() => {}),
      error: (() => {})
    },
    localStorage: {
      setItem: (() => {}),
      clearItem: (() => {}),
      removeItem: (() => {})
    },
  },
  moduleNameMapper: {
    jsonwebtoken: '<rootDir>./client/__tests__/__mocks__/helpers/jwt.js',
  }
};
