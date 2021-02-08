exports.up = function (knex) {
  return knex.schema.createTable("foodtype", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.decimal("carbohydrade").notNullable();
    table.decimal("protein").notNullable();
    table.decimal("fat").notNullable();
    table.decimal("calories").notNullable();
    table.decimal("gram").notNullable();
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("foodtype");
};
