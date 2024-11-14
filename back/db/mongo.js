// back/db/mongo.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db('votingbooth');
    console.log('Connected to MongoDB');
  }
  return db;
}

module.exports = { connect };