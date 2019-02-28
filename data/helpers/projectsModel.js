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
    remove: function(id) {
        return db('projects').where({ id }).del();
    },
    update: function(id, changes) {
        return db('projects')
        .where({ id })
        .update(changes)
        .then(count => (count > 0 ? this.get(id) : null));
    },
    mapComplete: function(object) {
        if (object.completed === 0) {return {...object, completed: false} }
        else {return {...object, completed: true} }
    },
};