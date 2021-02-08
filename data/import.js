const fs = require("fs");
const knex = require("../server/knex.js");

const seedFoodData = async () => {
  try {
    const foodData = JSON.parse(fs.readFileSync("./data/locations.json"));
    for (const data of foodData) {
      const id;
      const name;
      const carbohydrade;
      const protein;
      const fat;
      const calories;

      await knex("foodDatabase").insert({
        id,
        name,
        carbohydrade,
        protein,
        fat,
        calories,
      });
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};

module.exports = seedFoodData;
