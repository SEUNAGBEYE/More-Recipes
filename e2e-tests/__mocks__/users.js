const validUser = {
  firstName: 'Seun',
  lastName: 'Beye',
  email: 'seunbeye@mail.com',
  password: 'mother1234',
  reviews: ['This Recipe is awesome', 'yummy', 'Nice', 'This is on point']
};

const validUserTwo = {
  firstName: 'Pay',
  lastName: 'White',
  email: 'paywhite@mail.com',
  password: 'mother1234',
  reviews: ['Great', 'Delicious', 'Good']
};

const invalidUser = { ...validUser, ...{ password: 'mothe' } };

export { validUser, validUserTwo, invalidUser };
