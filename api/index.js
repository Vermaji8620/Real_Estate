import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("This s the home ge");
});

app.get("/about", (req, res) => {
  res.send("This is the about ");
});

app.listen(4000, () => {
  console.log(`App is running on port `);
});
