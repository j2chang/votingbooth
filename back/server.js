// back/server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Import routes
const voterRoutes = require('./routes/voters');
const candidateRoutes = require('./routes/candidates');

app.use('/api/voters', voterRoutes);
app.use('/api/candidates', candidateRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));