module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is Required'
        }

      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image is Required'
        }

      }
    },
    views: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    upvotes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    downvotes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    estimatedTime: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description is Required'
        }
      }
    }
  });

  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'user'
    });

    // Recipe.belongsTo(models.Category, {
    //   foreignKey: 'categoryId',
    //   onDelete: 'CASCADE',
    // });
  };
  return Recipe;
};
