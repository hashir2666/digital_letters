const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');

require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Letter Schema
const letterSchema = new mongoose.Schema({
  id: String,
  text: String,
  envelope: String,
  timesRead: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Letter = mongoose.model('Letter', letterSchema);

// Save a letter
app.post('/api/letters', async (req, res) => {
  try {
    const { text, envelope } = req.body;
    const id = crypto.randomUUID();
    const letter = new Letter({ id, text, envelope });
    await letter.save();
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save letter' });
  }
});

// Get a letter
app.get('/api/letters/:id', async (req, res) => {
  try {
    const letter = await Letter.findOne({ id: req.params.id });
    if (!letter) return res.status(404).json({ error: 'Letter not found' });
    letter.timesRead++;
    await letter.save();
    res.json(letter);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get letter' });
  }
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  })
  .catch(err => console.log(err));