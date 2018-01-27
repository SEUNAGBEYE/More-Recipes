module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Body Is Required'
        }
      },
      set(val) {
        const firstChar = val.charAt(0).toUpperCase();
        const valWithoutFirstLetter = val.slice(1).toLowerCase();
        const body = `${firstChar}${valWithoutFirstLetter}`;
        this.setDataValue('body', body);
      },
    }
  });

  Review.associate = (models) => {
    // associations can be defined here
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'user'
    });

    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
  };
  return Review;
};

