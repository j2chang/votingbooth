// services/candidates/candidates.js
const express = require('express');
const bodyParser = require('body-parser');
const candidateRoutes = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use('/api/candidates', candidateRoutes);

const PORT = 3002;
app.listen(PORT, () => console.log(`Candidates service running on port ${PORT}`));
