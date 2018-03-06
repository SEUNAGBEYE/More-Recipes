const validUser = {
  firstName: 'Seun',
  lastName: 'Beye',
  email: 'seunbeye@mail.com',
  password: 'mother1234'
};

const validUserTwo = {
  firstName: 'Pay',
  lastName: 'White',
  email: 'paywhite@mail.com',
  password: 'mother1234'
};

const invalidUser = { ...validUser, ...{ password: 'mothe' } };

export { validUser, validUserTwo, invalidUser };
