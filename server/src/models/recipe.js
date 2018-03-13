import convertToSentenceCase from '../helpers/convertToSentenceCase';

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name Is Required'
        },
        set(val) {
          const name = convertToSentenceCase(val);
          this.setDataValue('name', name);
        },
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://res.cloudinary.com/seun/image/upload/v1520968351/au4wpwe6xafxbpoechuy.jpg'
    },
    views: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
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
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    estimatedTime: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description Is Required'
        }
      },
      set(val) {
        const description = convertToSentenceCase(val);
        this.setDataValue('description', description);
      },
    }
  });

  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'user'
    });

    Recipe.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
      as: 'category'
    });

    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
      as: 'reviews'
    });
  };
  return Recipe;
};
