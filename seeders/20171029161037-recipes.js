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

      return queryInterface.bulkInsert('Recipes', [
        {
          id: 1,
          name: 'Pasta',
          image: 'assets/img/pasta.jpg',
          upvotes: 1,
          downvotes: 1,
          categoryId: 1,
          ownerId: 1,
          views: 1,
          description: 'lorem ipsum',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Banana Split',
          image: 'assets/img/banana_split.jpg',
          upvotes: 11,
          downvotes: 1,
          categoryId: 2,
          ownerId: 2,
          views: 3,
          description: 'lorem ipsum',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Creme Salad',
          image: 'assets/img/salad.jpeg',
          upvotes: 1,
          downvotes: 1,
          categoryId: 3,
          ownerId: 3,
          views: 1,
          description: 'lorem ipsum',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'Jollof Rice',
          image: 'assets/img/jollof_rice.jpeg',
          upvotes: 1,
          downvotes: 0,
          categoryId: 4,
          ownerId: 4,
          views: 1,
          description: 'lorem ipsum',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: 'Rosted Chicken',
          image: 'assets/img/rosted_chicken.jpeg',
          upvotes: 1,
          downvotes: 0,
          categoryId: 5,
          ownerId: 5,
          views: 1,
          description: 'lorem ipsum',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: 'Madrelle Chips',
          image: 'assets/img/chips.jpeg',
          upvotes: 21,
          downvotes: 0,
          categoryId: 6,
          ownerId: 6,
          views: 1,
          description: 'lorem ipsum',
          createdAt: new Date(),
          updatedAt: new Date(),
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
    return queryInterface.bulkDelete('Recipes', null, {});
    
  }
};
