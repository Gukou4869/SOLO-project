const express = require("express");
const knex = require("./knex.js");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("client"));

app.get("/api/caloriecaliculator/foodtype", async (req, res) => {
  try {
    const foodDatabese = await knex.select().table("foodtype");
    res.send(foodDatabese);
  } catch (err) {
    console.error("Error Loading food data!", err);
    res.sendStatus(500);
  }
});

const port = 9999 || process.env.PORT;
app.listen(9999, () => {
  console.log(`🎉 Server running at https://localhost:${port}!`);
});
module.exports = app;
