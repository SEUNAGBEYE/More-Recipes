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
        name: 'breakfast',
        image: 'https://res.cloudinary.com/seun/image/upload/v1512992570/nhshe8uexocobh5h6n9u.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'lunch',
        image: 'https://res.cloudinary.com/seun/image/upload/v1512994577/is37zmrpvylaxuskklrh.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'dinner',
        image: 'https://res.cloudinary.com/seun/image/upload/v1512936644/incqqku1haopmg14kkwh.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'desserts',
        image: 'https://res.cloudinary.com/seun/image/upload/v1512923641/e1yqkjexyy5yxtrbykwe.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'noodles',
        image: 'https://res.cloudinary.com/seun/image/upload/v1512868075/zzr5yl5kshah5rgoey97.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'drinks',
        image: 'https://res.cloudinary.com/seun/image/upload/v1512922965/ifxtvbtcx3o2barj0pk2.jpg',
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
