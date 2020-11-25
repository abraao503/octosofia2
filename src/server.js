const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

require('./database');

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.URL || 3333);