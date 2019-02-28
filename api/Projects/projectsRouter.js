const express = require('express');

const db = require('../../data/helpers/projectsModel');

const  projectsRouter = express.Router();

projectsRouter.post('/', projectCheck, async (req, res) => {
    try {    
        const project = await db.insert(req.body);
        res.status(201).json(project);
    } catch (err) {
        next({code: 500, action: 'adding', subject: 'project'});
    }
});

function projectCheck (req, res, next) {
    if (!req.body.name || !req.body.description) {
        next({code: 400, action: 'updating', subject: 'post. Post name and description required'})
        return;
    } else {
        next();
    }
};

projectsRouter.use(projectsError);

function projectsError(err, req, res, next) {
    res.status(err.code).json({ errorMessage: `Error ${err.action} the ${err.subject}.` });
}

module.exports = projectsRouter;