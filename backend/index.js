const express = require("express");

const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
