const auth = require('basic-auth');
const bcrypt = require('bcrypt');

const { User } = require('../models');

// authenticateUser

const authenticateUser = async (req, res, next) => {

    let errorMessage = '';

    // Get User Credentials

    const credentials = auth(req);

    // If Credentials Were Provided

    if (credentials) {

        // Find User

        const user = await User.findOne({ 

            where: {

                emailAddress: credentials.name

            }

        });

        // If User Exists

        if (user) {

            // See If The Provided Password Matches The Password That Is Stored In The Database

            const authenticated = bcrypt.compareSync(credentials.pass, user.password);

            // If User Authenticated, Add The User To The Request Object

            if (authenticated)
                req.currentUser = user;

            else
                errorMessage = 'Authentication Failed.';    

        }

        else
            errorMessage = 'The Provided Details Are Incorrect.';

    }

    else
        errorMessage = 'Email & Password Must Be Provided.';

    // Continue With Processing The Request

    if (errorMessage)
        res.status(401).json({ errorMessage: 'Access Denied - ' + errorMessage });
    
    else    
        next();

}

// Export Function

module.exports = authenticateUser;