exports.seed = function(knex, Promise) {
	return knex('projects')
		.truncate()
		.then(function () {
			return knex('projects').insert([
				{name: 'Sprint Challenge: Node-Express', description: 'This challenge allows you to practice the concepts and techniques learned over the past Sprint and apply them in a concrete project. This Sprint explored Building RESTful Web APIs with Express and Node.js, Server-side Routing, Express Middleware & Deployment and Good Practices. In your challenge for this Sprint, you will demonstrate proficiency by creating an Web API using Node.js and Express.'},
				{name: 'Sprint Challenge: RDBMS', description: 'This challenge allows you to practice the concepts and techniques learned over the past Sprint and apply them in a concrete project.'},
			]);
		});
};