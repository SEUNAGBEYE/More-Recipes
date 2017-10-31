module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    recipeId: DataTypes.INTEGER
});

  // Ingredient.associate = (models) => {
  //   // associations can be defined here
  //   Ingredient.belongsTo(models.Recipe, {
  //     foreignKey: 'recipeId',
  //     onDelete: 'CASCADE'
  //   });
  // }
  return Ingredient
}