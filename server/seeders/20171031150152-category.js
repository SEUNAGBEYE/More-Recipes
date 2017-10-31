module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'breakfast',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'lunch',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'dinner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'desserts',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'noodles',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'drinks',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
