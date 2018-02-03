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
    queryInterface.bulkInsert('Categories', [
      {
        name: 'Breakfast',
        image: 'https://res.cloudinary.com/seun/image/upload/v1514724588/Healthy-Breakfast-1000x620_vxzki0.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lunch',
        image: 'https://res.cloudinary.com/seun/image/upload/v1513344558/cswtysrpufm5wxqdy8rw.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dinner',
        image: 'https://res.cloudinary.com/seun/image/upload/v1514725782/di_pescara_chi_order_in_thanksgiving_j8ozce.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Desserts',
        image: 'https://res.cloudinary.com/seun/image/upload/v1514725281/berry-bliss-cake-106367-642x428_nqq2mi.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Noodles',
        image: 'https://res.cloudinary.com/seun/image/upload/v1514725651/beef-noodle-soup-13_ffgs3e.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Drinks',
        image: 'https://res.cloudinary.com/seun/image/upload/v1514725485/cocktail_ivg1d5.jpg',
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
    queryInterface.bulkDelete('Categories', null, {})

};
