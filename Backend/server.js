const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
  })
);

app.post('/api/review', async (req, res) => {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
      {
        contents: [{ parts: [{ text: req.body.text }]}],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GOOGLE_GEMINI_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('Gemini API Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
