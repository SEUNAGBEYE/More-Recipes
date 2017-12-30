
const checkAuth = (isAuthenticated, history) => {
  if (!isAuthenticated) {
    let redirectAfterLogin = history.location.pathname;
    toastr.warning('Please Login');
    history.push(`/login?next=${redirectAfterLogin}`);
  }
};

export default checkAuth;

