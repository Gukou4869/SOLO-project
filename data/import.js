const fs = require("fs");
const knex = require("../server/knex.js");

const seedFoodData = async () => {
  try {
    const foodData = JSON.parse(fs.readFileSync("./data/foodData.json"));
    for (const data of foodData) {
      const id = data.FoodType.id;
      const name = data.FoodType.name;
      const carbohydrade = data.FoodType.carbohydrade;
      const protein = data.FoodType.protein;
      const fat = data.FoodType.fat;
      const calories = data.FoodType.calories;
      const gram = data.FoodType.gram;

      await knex("foodtype").insert({
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
