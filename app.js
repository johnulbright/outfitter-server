require('dotenv').config();
const express=require("express");
const app=express();
const sequelize=require("./db")
app.use(express.json());

const parent=require("./controllers/parent-controller");
// const child=require("./controllers/child-controller");
// const event=require("./controllers/event-controller");
// const clothing=require("./controllers/clothing-controller");



sequelize.sync();


app.use(require("./middleware/headers"));
app.use("/parent",parent);
// app.use("/child",child);
// app.use("/event",event);
// app.use("/clothing",clothing);



app.listen(process.env.PORT,()=>console.log(`App is really listening on port ${process.env.PORT}`));