global.toastr = {
  info: () => null,
  success: () => null,
  error: () => null,
  warning: () => null
};
global.localStorage = {
  setItem: () => null,
  clearItem: () => null,
  removeItem: () => null
};
global.document = {
  getElementById: (id => ({ id }))
};
