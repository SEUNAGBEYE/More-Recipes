module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is Required'
        },
        set(val) {
          const firstChar = val.charAt(0).toUpperCase();
          const valWithoutFirstLetter = val.slice(1).toLowerCase();
          const name = `${firstChar}${valWithoutFirstLetter}`;
          this.setDataValue('name', name);
        },
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
          msg: 'Description is Required'
        }
      },
      set(val) {
        const firstChar = val.charAt(0).toUpperCase();
        const valWithoutFirstLetter = val.slice(1).toLowerCase();
        const description = `${firstChar}${valWithoutFirstLetter}`;
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
