const express = require('express');
const mongoose = require('mongoose');
const Feedback = require('./models/Feedback');
const path = require('path');
const app = express();

mongoose.connect('mongodb://localhost:27017/ibm_feedback', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static('public'));
app.use(express.json());

app.post('/submit', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json({ message: 'Thank you for your feedback!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving feedback.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
