require("dotenv").config();
const app = require("./app");
const knex = require("./knex");

const PORT = process.env.PORT || 9000;

async () => {
  try {
    console.log("Running migrations...");
    await knex.migrate.latest();

    console.log("Running seeds...");
    await knex.seed.run();

    console.log("Starting express...");
    app.listen(PORT, () => {
      console.log(`App listening pm port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
};
