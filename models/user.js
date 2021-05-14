const { Model } = require('sequelize');

// Create & Export The User Model

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    
    // Method For Defining Associations

    static associate({ Course }) {

      User.hasMany(Course);

    }

  }

  // Initialize The User Model

  User.init({

    firstName: {

      type: DataTypes.STRING,
      allowNull: false,

      validate: {

        notNull: {

          msg: 'First Name Is Required.'

        },

        notEmpty: {

          msg: 'Please Provide A First Name.'

        }

      }

    },

    lastName: {

      type: DataTypes.STRING,
      allowNull: false,

      validate: {

        notNull: {

          msg: 'Last Name Is Required.'

        },

        notEmpty: {

          msg: 'Please Provide A Last Name.'

        }

      }

    },

    emailAddress: {

      type: DataTypes.STRING,
      allowNull: false,

      unique: {

        msg: 'The Email You Entered Already Exists.'

      },

      validate: {

        notNull: {

          msg: 'Email Address Is Required.'

        },

        isEmail: {

          msg: 'Please Provide A Valid Email Address.'

        }

      }

    },

    password: {

      type: DataTypes.STRING,
      allowNull: false,

      validate: {

        notNull: {

          msg: 'Password Is Required.'

        },

        len: {

          args: [9, 40],
          msg: 'The Password Should Be Between 9 And 40 Characters In Length.'

        }

      }
      
    }

  }, { sequelize, modelName: 'User' });

  return User;

}