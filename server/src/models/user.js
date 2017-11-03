import bcrypt from 'bcrypt';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 10))
      }
    },
    // facebookUrl: DataTypes.STRING,
    // twitterUrl: DataTypes.STRING,
    favoriteRecipe: DataTypes.ARRAY(DataTypes.INTEGER),
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
  }
  return User;
}