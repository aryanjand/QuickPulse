const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000 || process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
