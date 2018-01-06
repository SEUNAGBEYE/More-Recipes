module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    image: DataTypes.STRING
  });

  Category.associate = (models) => {
    // associations can be defined here
    Category.hasMany(models.Recipe, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
      as: 'recipes'
    });
  };
  return Category;
};

