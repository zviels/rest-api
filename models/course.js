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

    title: {

      type: DataTypes.STRING,
      allowNull: false,

      validate: {

        notNull: {

          msg: 'Title Is Required.'

        }

      }

    },

    description: {

      type: DataTypes.TEXT,
      allowNull: false,

      validate: {

        notNull: {

          msg: 'Description Is Required.'

        }

      }

    },

    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING
    
  }, { sequelize, modelName: 'Course' });

  return Course;

}