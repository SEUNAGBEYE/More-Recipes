const validUser = {
  firstName: 'Seun',
  lastName: 'Beye',
  email: 'seunbeye@mail.com',
  password: 'mother1234'
};

const invalidUser = { ...validUser, ...{ password: 'mother' } };

export { validUser, invalidUser };
