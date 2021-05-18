const { sequelize } = require('../models');

// connectToDatabase

const connectToDatabase = async () => {

    try {

        await sequelize.authenticate();
        console.log('Connection To The Database Has Been Estbalished Successfuly!');

    } catch (error) {

        console.error('Unable To Connect To The Database: ' + error);

    }
    
}

// Export Function

module.exports = connectToDatabase;