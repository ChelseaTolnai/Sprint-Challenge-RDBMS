const db = require('../dbConfig');

module.exports = {
    insert: function(project) {
        return db('projects').insert(project)
    },
    get: function(id) {
        if (id) {
            const project = db('projects').where({ id }).first()
                .then(project => this.mapComplete(project));
            const actions = db('actions').where('project_id', id)
                .map(action => this.mapComplete(action));
            const promises = [project, actions];
            
            return Promise.all(promises)
                .then(results => {
                    let [project, actions] = results;
                    project.actions = actions;
                    return project;
                });
        }

        return db('projects').select('*').map(project => this.mapComplete(project));
    },
    mapComplete: function(object) {
        if (object.completed === 0) {return {...object, completed: false} }
        else {return {...object, completed: true} }
    },
};