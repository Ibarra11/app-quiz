import "dotenv/config";
import express from "express";
import * as db from "./db/index.js";
const app = express();
const port = 3000;

app.use(express.static("static"));

app.get("/attempts", async (req, res) => {
  const result = await db.query({
    text: "SELECT * FROM quiz_attempts",
  });

  res.send({ data: result.rows });
});

app.post("/attempt", async (req, res) => {});

// creates and starts a server for our API on a defined port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
