

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
        Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Recipes', [{
      id: 11,
      name: 'Pasta',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 1,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 12,
      name: 'Banana Split',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 2,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      ingredients: ['one'],
      steps: ['two'],
      views: [3],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 13,
      name: 'Creme Salad',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 3,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 14,
      name: 'Jollof Rice',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 4,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 15,
      name: 'Rosted Chicken',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 5,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 16,
      name: 'Madrelle Chips',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 6,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 17,
      name: 'Pasta',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 1,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 18,
      name: 'Banana Split',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 2,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [3],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 19,
      name: 'Creme Salad',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 3,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 20,
      name: 'Jollof Rice',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 4,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 21,
      name: 'Rosted Chicken',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 5,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 22,
      name: 'Madrelle Chips',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 6,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {

      id: 23,
      name: 'Pasta',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 1,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 24,
      name: 'Banana Split',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 2,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [3],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 25,
      name: 'Creme Salad',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 3,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 26,
      name: 'Jollof Rice',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 4,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 27,
      name: 'Rosted Chicken',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 5,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 28,
      name: 'Madrelle Chips',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 6,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 29,
      name: 'Pasta',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 1,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 30,
      name: 'Banana Split',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 2,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [3],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 31,
      name: 'Creme Salad',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 3,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 32,
      name: 'Jollof Rice',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 4,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 33,
      name: 'Rosted Chicken',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 5,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 34,
      name: 'Madrelle Chips',
      image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
      categoryId: 6,
      userId: 1,
      upvotes: [1],
      downvotes: [1],
      views: [1],
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
        Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Recipes', null, {});
  }
};
