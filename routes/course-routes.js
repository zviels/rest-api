const express = require('express');

const { User } = require('../models');
const { Course } = require('../models');
const CourseNotFoundError = require('../functions/course-not-found-error');
const authenticateUser = require('../functions/auth-user');
const handleAsyncOperation = require('../functions/handle-async-operation');

// Variables

const router = express.Router();

// Course Routes

// GET Course Route

router.get('/:id', handleAsyncOperation (async (req, res, next) => {

    const { id } = req.params;
    const course = await Course.findByPk(+ id, {

        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
        include: { model: User, attributes: ['id', 'firstName', 'lastName', 'emailAddress', 'password'] }

    });

    if (course)
        res.status(200).json(course);

    else
        throw CourseNotFoundError();

}));

// GET Courses Route

router.get('/', handleAsyncOperation (async (req, res, next) => {

    const courses = await Course.findAll({ 
            
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
        include: { model: User, attributes: ['id', 'firstName', 'lastName', 'emailAddress', 'password'] } 
    
        });

    res.status(200).json(courses);

}));

// POST Courses Route

router.post('/', authenticateUser, handleAsyncOperation (async (req, res, next) => {

    // Extract New Course Data

    const newCourse = req.body;

    // Create The New Course & Save It In A New Variable

    const course = await Course.create(newCourse);

    // Extract The ID Attribute From The Newly Created Course

    const { id } = course;

    // Set Status Code To 201, Redirect User To The Newly Created Course Page & Return No Content

    res.status(201).location('/api/courses/' + id).end();

}));

// PUT Course Route

router.put('/:id', authenticateUser, handleAsyncOperation (async (req, res, next) => {

    const { id } = req.params;
    const { title, description, estimatedTime, materialsNeeded } = req.body;

    // Ensure Course Existence

    const course = await Course.findByPk(+ id);

    // If Course Exists, Update It

    if (course) {

        // Extract Authenticated User Data

        const { currentUser } = req;

        // Ensure That The Authenticated User Is The Owner Of The Requested Course

        if (currentUser.id === course.userId) {

            // Actually Update The Course

            await Course.update(
            
                { title, description, estimatedTime, materialsNeeded },
                { where: { id: (+ id) } });
    
            res.status(204).end();  

        }

        // If The Authenticated User Is Not The Owner Of The Requested Course, Return Status Code '403'

        else
            res.status(403).end();

    }

    // If Course Doesn't Exist In The Database, Create & Throw An Error

    else
        throw CourseNotFoundError();

}));

// DELETE Course Route

router.delete('/:id', authenticateUser, handleAsyncOperation (async (req, res, next) => {

    const { id } = req.params;

    // Ensure Course Existence

    const course = await Course.findByPk(+ id);

    // If Course Exists, Delete It

    if (course) {

        // Extract Authenticated User Data

        const { currentUser } = req;

        // Ensure That The Authenticated User Is The Owner Of The Requested Course

        if (currentUser.id === course.userId) {

            // Actually Delete The Course

            await Course.destroy({ where: { id: + id } });
            res.status(204).end();
        
        }

        // If The Authenticated User Is Not The Owner Of The Requested Course, Return Status Code '403'

        else
            res.status(403).end();

    }

    // If Course Doesn't Exist In The Database, Create & Throw An Error

    else
        throw CourseNotFoundError();

}));

// Export Routes

module.exports = router;