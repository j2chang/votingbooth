// services/voters/voters.js
const express = require('express');
const bodyParser = require('body-parser');
const voterRoutes = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use('/api/voters', voterRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Voters service running on port ${PORT}`));