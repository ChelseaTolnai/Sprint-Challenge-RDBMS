const express = require('express');
const helmet = require('helmet');

const  projectsRouter  = require('./api/Projects/projectsRouter');
const  actionsRouter  = require('./api/Actions/actionsRouter');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;