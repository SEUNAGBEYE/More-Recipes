const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    queryInterface.bulkInsert('Users', [
      {
        id: 1,
        firstName: 'seun',
        lastName: 'agbeye',
        email: 'agbeyeseun1@gmail.con',
        password: bcrypt.hashSync('mother1234', 10),
        profilePicture: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/21192484_1469560569803045_4692177961833149142_n.jpg?oh=ca20dcc8dcd5891ad05b253fff7789c4&oe=5A5CAA85',
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        id: 2,
        firstName: 'Kenneth',
        lastName: 'John',
        email: 'john@mail.ng',
        password: bcrypt.hashSync('password', 10),
        profilePicture: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/21192484_1469560569803045_4692177961833149142_n.jpg?oh=ca20dcc8dcd5891ad05b253fff7789c4&oe=5A5CAA85',
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        id: 3,
        firstName: 'Free',
        lastName: 'Man',
        email: 'free@mail.ng',
        password: bcrypt.hashSync('password', 10),
        profilePicture: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/21192484_1469560569803045_4692177961833149142_n.jpg?oh=ca20dcc8dcd5891ad05b253fff7789c4&oe=5A5CAA85',
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        id: 4,
        firstName: 'Lockwood',
        lastName: 'Raymond',
        email: 'lock@mail.ng',
        password: bcrypt.hashSync('password', 10),
        profilePicture: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/21192484_1469560569803045_4692177961833149142_n.jpg?oh=ca20dcc8dcd5891ad05b253fff7789c4&oe=5A5CAA85',
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        id: 5,
        firstName: 'Joe',
        lastName: 'Lake',
        email: 'joe@mail.ng',
        password: bcrypt.hashSync('password', 10),
        profilePicture: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/21192484_1469560569803045_4692177961833149142_n.jpg?oh=ca20dcc8dcd5891ad05b253fff7789c4&oe=5A5CAA85',
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        id: 6,
        firstName: 'joseph',
        lastName: 'Right',
        email: 'joseph@mail.ng',
        password: bcrypt.hashSync('password', 10),
        profilePicture: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/21192484_1469560569803045_4692177961833149142_n.jpg?oh=ca20dcc8dcd5891ad05b253fff7789c4&oe=5A5CAA85',
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        id: 7,
        firstName: 'Jeremy',
        lastName: 'Fortuna',
        email: 'jeremy@mail.ng',
        password: bcrypt.hashSync('password', 10),
        profilePicture: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/21192484_1469560569803045_4692177961833149142_n.jpg?oh=ca20dcc8dcd5891ad05b253fff7789c4&oe=5A5CAA85',
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        id: 8,
        firstName: 'Smith',
        lastName: 'Richard',
        email: 'smith@mail.ng',
        password: bcrypt.hashSync('password', 10),
        profilePicture: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/21192484_1469560569803045_4692177961833149142_n.jpg?oh=ca20dcc8dcd5891ad05b253fff7789c4&oe=5A5CAA85',
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        id: 9,
        firstName: 'Michael',
        lastName: 'Rays',
        email: 'mikey@mail.ng',
        password: bcrypt.hashSync('password', 10),
        profilePicture: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/21192484_1469560569803045_4692177961833149142_n.jpg?oh=ca20dcc8dcd5891ad05b253fff7789c4&oe=5A5CAA85',
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        id: 10,
        firstName: 'Phillip',
        lastName: 'James',
        email: 'phillip@mail.ng',
        password: bcrypt.hashSync('password', 10),
        profilePicture: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/21192484_1469560569803045_4692177961833149142_n.jpg?oh=ca20dcc8dcd5891ad05b253fff7789c4&oe=5A5CAA85',
        createdAt: new Date(),
        updatedAt: new Date()

      }

    ], {}),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    queryInterface.bulkDelete('Users', null, {})

};
