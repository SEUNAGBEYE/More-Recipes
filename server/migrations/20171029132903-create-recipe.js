module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        reference: {
          model: 'Users',
          key: 'id',
          as: 'userRecipes'
        }
      },
      description: {
        type: Sequelize.TEXT
      },
      upvotes : {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      downvotes :{
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      views: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      steps: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Recipes');
  }
};