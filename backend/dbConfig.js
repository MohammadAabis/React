let Pool;
let pool;
try {
  Pool = require("pg").Pool;
  pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "12345",
    database: "dbtest1",
    port: 5432,
  });

  module.exports = {
    pool,
  };
} catch (error) {
  console.log(error);
}
