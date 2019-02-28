const db = require('../dbConfig');

const query = db('projects');

module.exports = {
    insert: function(project) {
        return query.insert(project)
    },
};