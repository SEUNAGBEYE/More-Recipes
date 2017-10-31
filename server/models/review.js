module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  });

  // Review.associate = (models) => {
  //   // associations can be defined here
  //   Review.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     onDelete: 'CASCADE',
  //   });

  //   Review.belongsTo(models.Recipe, {
  //     foreignKey: 'recipeId',
  //     onDelete: 'CASCADE',
  //   })
  // }
  return Review;
}