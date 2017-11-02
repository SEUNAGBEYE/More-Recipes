module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Review.associate = (models) => {
  //   // associations can be defined here
  //   Review.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     onDelete: 'CASCADE',
  //   });

    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    })
  }
  return Review;
}