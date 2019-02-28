const db = require('../dbConfig');

const query = db('actions');

module.exports = {
    insert: function(action) {
        return query.insert(action)
    },
    get: function(id) {
        if (id) {
            return db('actions')
            .where({ id })
            .first()
            .then(action => this.mapComplete(action));
        }

        return db('actions').select('*').map(action => this.mapComplete(action));
    },
    remove: function(id) {
        return db('actions').where({ id }).del();
    },
    update: function(id, changes) {
        return db('actions')
        .where({ id })
        .update(changes)
        .then(count => (count > 0 ? this.get(id) : null));
    },
    mapComplete: function(object) {
        if (object.completed === 0) {return {...object, completed: false} }
        else {return {...object, completed: true} }
    },
};