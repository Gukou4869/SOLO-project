const foodtype = require("../../data/import.js");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("foodtype")
    .truncate()
    .then(function () {
      // Inserts seed entries
      foodtype();
    });
};
