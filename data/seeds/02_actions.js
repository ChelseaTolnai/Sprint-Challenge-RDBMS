exports.seed = function(knex, Promise) {
	return knex('actions')
		.truncate()
		.then(function () {
			return knex('actions').insert([
        {project_id: 1, description: "Initiate Node and Express Sprint Challenge.", notes: "Fork and Clone. Create new branch. Start coding in new branch."},
        {project_id: 1, description: "Complete project.", notes: "Finish Sprint challenge in code editor. Sumbit project to Lambda school and PM."},

        {project_id: 2, description: "Initiate RDBMS Sprint Challenge.", notes: "Fork and Clone. Create new branch. Start coding in new branch."},
        {project_id: 2, description: "Complete project.", notes: "Finish Sprint challenge in code editor. Sumbit project to Lambda school and PM."},
      ]);
		});
};