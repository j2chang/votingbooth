// back/routes/voters.js
const express = require('express');
const router = express.Router();
const { connect } = require('../db/mongo');

// CREATE Voter
router.post('/', async (req, res) => {
  const db = await connect();
  const result = await db.collection('voters').insertOne(req.body);
  res.status(201).json(result);
});

// READ all Voters
router.get('/', async (req, res) => {
  const db = await connect();
  const voters = await db.collection('voters').find().toArray();
  res.json(voters);
});

// UPDATE Voter by ID
router.put('/:id', async (req, res) => {
  const db = await connect();
  const { id } = req.params;
  const updateData = { $set: req.body };
  const result = await db.collection('voters').updateOne({ _id: new require('mongodb').ObjectId(id) }, updateData);
  res.json(result);
});

// DELETE Voter by ID (also deletes associated ballots)
router.delete('/:id', async (req, res) => {
  const db = await connect();
  const { id } = req.params;
  await db.collection('ballots').deleteMany({ voterId: new require('mongodb').ObjectId(id) });
  const result = await db.collection('voters').deleteOne({ _id: new require('mongodb').ObjectId(id) });
  res.sendStatus(result.deletedCount ? 204 : 404);
});

// READ Ballot (Candidates) for a specific Voter
router.get('/:id/ballot', async (req, res) => {
  const db = await connect();
  const candidates = await db.collection('candidates').find().sort({ name: 1 }).toArray();
  res.json(candidates);
});

// CREATE Ballot for Voter
router.post('/:id/ballot', async (req, res) => {
  const db = await connect();
  const ballot = { voterId: new require('mongodb').ObjectId(req.params.id), candidateId: new require('mongodb').ObjectId(req.body.candidateId) };
  const result = await db.collection('ballots').insertOne(ballot);
  res.status(201).json(result);
});

module.exports = router;
