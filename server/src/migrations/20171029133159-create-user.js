module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      rememberToken: {
        type: Sequelize.STRING
      },
      aboutMe: {
        type: Sequelize.STRING
      },
      facebookUrl: {
        type: Sequelize.STRING
      },
      twitterUrl: {
        type: Sequelize.STRING
      },
      linkedInUrl: {
        type: Sequelize.STRING
      },
      profilePicture: {
        type: Sequelize.STRING
      },
      favoriteRecipe: {
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
    queryInterface.dropTable('Users', { force: true });
  }
};