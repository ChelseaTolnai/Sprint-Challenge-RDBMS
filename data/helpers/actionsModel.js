const db = require('../dbConfig');

const query = db('actions');

module.exports = {
    insert: function(action) {
        return query.insert(action)
    },
};