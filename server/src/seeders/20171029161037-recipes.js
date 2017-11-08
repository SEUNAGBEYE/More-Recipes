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
          categoryId: 1,
          userId: 1,
          views: [1],
          description: 'lorem ipsum',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Banana Split',
          image: 'assets/img/banana_split.jpg',
          categoryId: 2,
          userId: 1,
          views: [3],
          description: 'lorem ipsum',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Creme Salad',
          image: 'assets/img/salad.jpeg',
          categoryId: 3,
          userId: 1,
          views: [1],
          description: 'lorem ipsum',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'Jollof Rice',
          image: 'assets/img/jollof_rice.jpeg',
          categoryId: 4,
          userId: 1,
          views: [1],
          description: 'lorem ipsum',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: 'Rosted Chicken',
          image: 'assets/img/rosted_chicken.jpeg',
          categoryId: 5,
          userId: 1,
          views: [1],
          description: 'lorem ipsum',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: 'Madrelle Chips',
          image: 'assets/img/chips.jpeg',
          categoryId: 6,
          userId: 1,
          views: [1],
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
