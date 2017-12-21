import isEmpty from 'lodash/isEmpty';

const checkAuth = (user, history) => {
  if (isEmpty(user)) {
    let redirectAfterLogin = history.location.pathname;
    toastr.warning('Please Login');
    history.push(`/login?next=${redirectAfterLogin}`);
  }
};

export default checkAuth;

