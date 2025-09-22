const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Time service running on http://localhost:${PORT}`);
});