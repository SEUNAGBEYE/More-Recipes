import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'FirstName is Required'
        }

      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'LastName is Required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'User already exist with this email'
      },
      allowNull: false,
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
    favoriteRecipe: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: 'https://res.cloudinary.com/seun/image/upload/v1512979224/ctvqx5p0wu3rp0gcozsj.png'
    }
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      as: 'userRecipes'
    });

    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'userReviews'
    });
  };
  return User;
};

