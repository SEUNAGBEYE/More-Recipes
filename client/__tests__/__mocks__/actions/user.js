
const response = {
  status: 'Success',
  data: { token: { firstName: 'Seun', lastName: 'Beye' } }
};

const changePasswordResponse = {
  status: 'Success',
  message: 'Password Changed'
};

const forgotPasswordResponse = {
  status: 'Success',
  message: 'A Message has been sent to the email provided kindly read to mail to reset your password'
};

export { response, changePasswordResponse, forgotPasswordResponse };
