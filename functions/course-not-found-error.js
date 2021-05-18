// CourseNotFoundError

const CourseNotFoundError = () => {

    const error = new Error('Course Not Found!');
    error.status = 404;
    return error;

}

// Export Function

module.exports = CourseNotFoundError;