import bcrypt from 'bcrypt';
import convertToSentenceCase from '../helpers/convertToSentenceCase';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Firstname is Required'
        },
        set(val) {
          const firstName = convertToSentenceCase(val);
          this.setDataValue('firstName', firstName);
        },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Lastname is required'
        }
      },
      set(val) {
        const lastName = convertToSentenceCase(val);
        this.setDataValue('lastName', lastName);
      },
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
      },
      set(val) {
        this.setDataValue('email', val.toLowerCase());
      }

    },
    rememberToken: {
      type: DataTypes.STRING,
    },
    aboutMe: {
      type: DataTypes.STRING,
      set(val) {
        const aboutMe = convertToSentenceCase(val);
        this.setDataValue('aboutMe', aboutMe);
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 10));
      },
    },
    favoriteRecipe: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: 'https://res.cloudinary.com/seun/image/upload/v1512979224/ctvqx5p0wu3rp0gcozsj.png'
    },
    facebookUrl: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('facebookUrl', val.toLowerCase());
      }
    },
    twitterUrl: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('twitterUrl', val.toLowerCase());
      }
    },
    linkedInUrl: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('linkedInUrl', val.toLowerCase());
      }
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

