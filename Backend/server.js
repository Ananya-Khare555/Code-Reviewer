const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

app.post('/api/review', async (req, res) => {
  const input = req.body;
  try {
    const response = await axios.post('GEMINI_API_ENDPOINT', {
    }, {
      headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` }
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
