// services/ballots/ballots.js
const express = require('express');
const bodyParser = require('body-parser');
const ballotRoutes = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use('/api/results', ballotRoutes);

const PORT = 3003;
app.listen(PORT, () => console.log(`Ballots (Results) service running on port ${PORT}`));
