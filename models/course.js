const { Model } = require('sequelize');

// Create & Export The Course Model

module.exports = (sequelize, DataTypes) => {

  class Course extends Model {

    // Method For Defining Associations

    static associate({ User }) {

      Course.belongsTo(User, { foreignKey: 'userId' });

    }

  }

  // Initialize The Course Model

  Course.init({

    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING
    
  }, { sequelize, modelName: 'Course' });

  return Course;

}