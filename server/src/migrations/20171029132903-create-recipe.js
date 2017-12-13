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
      categoryId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Categories',
          key: 'id',
          as: 'recipesCategories'
        }
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      description: {
        type: Sequelize.TEXT
      },
      upvotes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      downvotes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      estimatedTime: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      views: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      ingredients: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      steps: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
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
