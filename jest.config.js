module.exports = {
  collectCoverage: true,
  coverageDirectory: './coverage-client/',
  testMatch: [
    '**/**/**/?(*.)(spec).js?(x)'
  ],
  setupFiles: [
    '<rootDir>./client/__tests__/config.js'
  ],
  globals: {
    toastr: {
      info: (() => {}),
      success: (() => {}),
      error: (() => {}),
      warning: (() => {})
    },
    localStorage: {
      setItem: (() => {}),
      clearItem: (() => {}),
      removeItem: (() => {})
    },
    document: {
      getElementById: ((id) => {
        ({ reset: (() => {}), id });
      })
    }
  },
  moduleNameMapper: {
    jsonwebtoken: '<rootDir>./client/__tests__/__mocks__/helpers/jwt.js',
  }
};
