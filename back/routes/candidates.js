// back/routes/candidates.js
const express = require('express');
const router = express.Router();
const { connect } = require('../db/mongo');

// GET all Candidates
router.get('/', async (req, res) => {
  const db = await connect();
  const candidates = await db.collection('candidates').find().sort({ name: 1 }).toArray();
  res.json(candidates);
});

// GET Candidate Results
router.get('/ballots', async (req, res) => {
  const db = await connect();
  const candidates = await db.collection('candidates').find().toArray();
  const ballots = await db.collection('ballots').find().toArray();
  const voters = await db.collection('voters').find().toArray();

  const results = candidates.map(candidate => {
    const voteCount = ballots.filter(ballot => String(ballot.candidateId) === String(candidate._id)).length;
    return { name: candidate.name, ballots: voteCount };
  });

  const pending = voters.length - ballots.length;
  res.json({ results, pending });
});

module.exports = router;
