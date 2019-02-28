const express = require('express');

const db = require('../../data/helpers/actionsModel');

const  actionsRouter = express.Router();

actionsRouter.post('/', actionCheck, async (req, res) => {
    try {    
        const action = await db.insert(req.body);
        res.status(201).json(action);
    } catch (err) {
        next({code: 500, action: 'adding', subject: 'action'});
    }
});

function actionCheck (req, res, next) {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        next({code: 400, action: 'updating', subject: 'action. Project ID, description and notes required'})
        return;
    } else {
        next();
    }
};

actionsRouter.use(actionsError);

function actionsError(err, req, res, next) {
    res.status(err.code).json({ errorMessage: `Error ${err.action} the ${err.subject}.` });
}

module.exports = actionsRouter;