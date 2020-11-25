const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const Socket = require('./socket');

const app = express();

require('./database');

app.use(cors());
app.use(express.json());
app.use(routes);

const server = app.listen(process.env.URL || 3333);

Socket.connect(server);