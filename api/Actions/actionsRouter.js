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

actionsRouter.get('/', async (req, res, next) => {
    try {
        const actions = await db.get();
        res.status(200).json(actions);
    } catch (err) {
        next({code: 500, action: 'getting', subject: 'actions'});
    }
});

actionsRouter.get('/:id', actionIdExists, async (req, res, next) => {
    try {
        const action = await db.get(req.params.id);
        res.status(200).json(action);
    } catch (err) {
        next({code: 500, action: 'getting', subject: 'action'});
    }
});

actionsRouter.delete('/:id', actionIdExists, async (req, res, next) => {
    try {
        const action = await db.get(req.params.id);
        await db.remove(req.params.id);
        res.status(200).json({...action, deleted: 'successful'});
    } catch (err) {
        next({code: 500, action: 'deleting', subject: 'action'});
    }
});

actionsRouter.put('/:id', actionIdExists, actionCheck, async (req, res, next) => {
    try {
        await db.update(req.params.id, {...req.body});
        const updatedAction = await db.get(req.params.id);
        res.status(200).json({...updatedAction, updated: 'successful'});

    } catch (error) {
        next({code: 500, action: 'updating', subject: 'action'});
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

async function actionIdExists (req, res, next) {
    try {
        const action = await db.get(req.params.id);
        if (action) {
            next();
        }
    } catch (err) {
        next({code: 404, action: 'finding', subject: 'action. Action with specified ID does not exist'});
    }
};

actionsRouter.use(actionsError);

function actionsError(err, req, res, next) {
    res.status(err.code).json({ errorMessage: `Error ${err.action} the ${err.subject}.` });
}

module.exports = actionsRouter;