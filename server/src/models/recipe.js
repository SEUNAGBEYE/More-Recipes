module.exports =  (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    upvotes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    downvotes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    steps: {
      type: DataTypes.JSON,
      allowNull: true
    },
    estimatedTime: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    description: DataTypes.TEXT
  });

  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    // Recipe.belongsTo(models.Category, {
    //   foreignKey: 'categoryId',
    //   onDelete: 'CASCADE',
    // });
  };
  return Recipe;
}