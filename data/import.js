const fs = require("fs");
const knex = require("../server/knex.js");

const seedFoodData = async () => {
  try {
    const foodData = JSON.parse(fs.readFileSync("./data/locations.json"));
    for (const data of foodData) {
      const id = foodData.FoodType.id;
      const name = foodData.FoodType.name;
      const carbohydrade = foodData.FoodType.carbohydrade;
      const protein = foodData.FoodType.protein;
      const fat = foodData.FoodType.fat;
      const calories = foodData.FoodType.calories;
      const gram = foodData.FoodType.gram;

      await knex("foodDatabase").insert({
        id,
        name,
        carbohydrade,
        protein,
        fat,
        calories,
        gram,
      });
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};

module.exports = seedFoodData;
