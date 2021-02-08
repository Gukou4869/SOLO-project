const express = require("express");
const knex = require("./knex.js");

const app = express();
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/api/fooddatabese", async (req, res) => {
  try {
    const foodDatabese = await knex.selected().table("foodDatabase");
    res.send(foodDatabese);
  } catch (err) {
    console.error("Error Loading food data!", err);
    res.sendStatus(500);
  }
});

module.exports = app;
