module.exports =  (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    views: DataTypes.INTEGER,
    upvotes: DataTypes.INTEGER,
    downvotes: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    description: DataTypes.TEXT

  });

  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.belongsTo(models.User, {
      foreignKey: 'ownerId',
      onDelete: 'CASCADE',
    });
  };
  return Recipe;
};