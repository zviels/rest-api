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

    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    password: DataTypes.STRING

  }, { sequelize, modelName: 'User' });

  return User;

}