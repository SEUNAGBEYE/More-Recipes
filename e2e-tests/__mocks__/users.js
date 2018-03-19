const profilePicture = "file:///Users/seunagbeye/Downloads/Seun's%20picture.jpg";

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
  newPassword: '@Mother1234',
  aboutMe: 'My name is Pay White and I love shoes & ice cream',
  facebookUrl: 'fb.com/paywhite',
  twitterUrl: 'twitter.com/paywhite',
  linkedInUrl: 'linkedin.com/paywhite',
  profilePicture,
  reviews: ['Great', 'Delicious', 'Good']
};

const invalidUser = { ...validUser, ...{ password: 'mothe' } };

export { validUser, validUserTwo, invalidUser };
