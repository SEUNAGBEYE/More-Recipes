import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'User already exist with this email'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please provide a valid email address'
        }
      }

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 10));
      },
      min: 5
    },
    // facebookUrl: DataTypes.STRING,
    // twitterUrl: DataTypes.STRING,
    favoriteRecipe: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    profilePicture: DataTypes.STRING
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      as: 'userRecipes'
    });

  //   User.hasMany(models.Review, {
  //     foreignKey: 'userId',
  //     as: 'userReviews'
  //   });
  };
  return User;
}
;