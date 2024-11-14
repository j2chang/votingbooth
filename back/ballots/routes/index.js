// services/ballots/routes/index.js
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db('voting');
  }
  return db;
}

// GET vote results
router.get('/', async (req, res) => {
  const db = await connect();
  const candidates = await db.collection('candidates').find().toArray();
  const ballots = await db.collection('ballots').find().toArray();
  const voters = await db.collection('voters').find().toArray();
  
  const results = candidates.map(candidate => ({
    name: candidate.name,
    ballots: ballots.filter(ballot => String(ballot.candidateId) === String(candidate._id)).length
  }));
  
  const pending = voters.length - ballots.length;
  res.json({ results, pending });
});

module.exports = router;
