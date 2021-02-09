"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "foodtype",
      [
        {
          name: "Chicken Breast",
          carbohydrade: 0,
          protein: 22.3,
          fat: 1.5,
          calories: 108,
          gram: 100,
        },
        {
          name: "White rice",
          carbohydrade: 59.3,
          protein: 4,
          fat: 0.5,
          calories: 269,
          gram: 160,
        },
        {
          name: "Avocado",
          carbohydrade: 8.6,
          protein: 3.5,
          fat: 26.1,
          calories: 262,
          gram: 140,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("foodtype", null, {});
  },
};
