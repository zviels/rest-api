// handleAsyncOperation

const handleAsyncOperation = (callback) => {

    return async (req, res, next) => {

        try {

            callback(req, res, next);

        } catch (error) {

            next(error);

        }

    }

}

// Export Function

module.exports = handleAsyncOperation;