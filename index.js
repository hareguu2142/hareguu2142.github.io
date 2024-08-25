const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

let db;

async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db('your_database_name');
}

app.get('/', async (req, res) => {
  try {
    const collection = db.collection('your_collection_name');
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${port}`);
});

module.exports = app;