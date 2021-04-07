require('dotenv').config();
const express=require("express");
const app=express();
const db=require("./db")
const controllers=require('./controllers/index')

app.use(express.json());



app.use(require("./middleware/headers"));
app.use("/parent",controllers.parentController);
app.use("/profile",controllers.profileController);
app.use("/child",controllers.childController);
app.use("/clothing",controllers.clothingController);
app.use("/event",controllers.eventController);




db.authenticate()
    .then(()=>db.sync())
    // .then(()=>db.sync({force:true}))
    .then(()=>{
        app.listen(process.env.PORT,console.log(`[server]: listening on localhost ${process.env.PORT}`))
    })
    .catch(err=>{
        console.log('[server]: server crashed')
        console.log(err)
    })