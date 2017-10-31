module.exports =  (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    views: DataTypes.ARRAY(DataTypes.INTEGER),
    upvotes: DataTypes.ARRAY(DataTypes.INTEGER),
    downvotes: DataTypes.ARRAY(DataTypes.INTEGER),
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    steps: DataTypes.JSON,
    description: DataTypes.TEXT
  });

  // Recipe.associate = (models) => {
  //   // associations can be defined here
  //   Recipe.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     onDelete: 'CASCADE',
  //   });

  //   Recipe.belongsTo(models.Category, {
  //     foreignKey: 'categoryId',
  //     onDelete: 'CASCADE',
  //   });
  // };
  return Recipe;
}