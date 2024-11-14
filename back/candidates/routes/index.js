// services/candidates/routes/index.js
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

// GET all candidates
router.get('/', async (req, res) => {
  const db = await connect();
  const candidates = await db.collection('candidates').find().toArray();
  res.json(candidates);
});

module.exports = router;
