const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "outfitter-server",
  "postgres",
  "password",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize.authenticate().then(
  function () {
    console.log("Connected to outfitter-server postgres database!");
  },
  function (err) {
    console.log(err);
  }
)
.catch(err=>console.log(err));

module.exports = sequelize;
