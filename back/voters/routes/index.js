// services/voters/routes/index.js
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

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

// GET all voters and their voting status
router.get('/', async (req, res) => {
  const db = await connect();
  const voters = await db.collection('voters').find().toArray();
  const ballots = await db.collection('ballots').find().toArray();
  
  const registered = voters.filter(voter => !ballots.some(ballot => ballot.voterId.equals(voter._id)));
  const voted = voters.filter(voter => ballots.some(ballot => ballot.voterId.equals(voter._id)));
  
  res.json({ registered, voted });
});

// Add a new voter
router.post('/', async (req, res) => {
  const db = await connect();
  const result = await db.collection('voters').insertOne({ name: req.body.name });
  res.status(201).json(result);
});

// Delete a voter and any associated ballots
router.delete('/:id', async (req, res) => {
  const db = await connect();
  const voterId = new ObjectId(req.params.id);
  
  await db.collection('ballots').deleteMany({ voterId });
  const result = await db.collection('voters').deleteOne({ _id: voterId });
  
  res.sendStatus(result.deletedCount ? 204 : 404);
});

// Cast a vote for a registered voter
router.post('/:id/ballot', async (req, res) => {
  const db = await connect();
  const voterId = new ObjectId(req.params.id);
  const candidateId = new ObjectId(req.body.candidateId);
  
  const result = await db.collection('ballots').insertOne({ voterId, candidateId });
  res.status(201).json(result);
});

module.exports = router;
