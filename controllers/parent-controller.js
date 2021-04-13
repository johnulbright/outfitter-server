require("dotenv").config();

const router = require("express").Router(); 
const {Parent} = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


router.post("/signup",async (req,res)=>{
    try{
      const result = await Parent.create({
        email: req.body.parent.email,
        password: bcrypt.hashSync(req.body.parent.password,13),
        firstName:req.body.parent.firstName,
        lastName:req.body.parent.lastName,
        zipCode:req.body.parent.zipCode,
        lat:req.body.parent.lat,
        lon:req.body.parent.lon,
        timeZone:req.body.parent.timeZone,
        city:req.body.parent.city
        })
      const token= jwt.sign({id:result.id},process.env.JWT_SECRET,{expiresIn:24*60*60});
      const responseObject= {result:result,message:"parent account created successfully",sessionToken:token};
      res.status(200).json(responseObject);
    } catch (error) {
      res.status(500).json({error:error,message:"something went wrong"})
    }
})


router.post("/login", async (req, res) => {
  try{
    const result = await Parent.findOne({ where: { email: req.body.parent.email } })
    if (!result) {
      res.status(404).json({ error: "account not found" });
    } else { 
       bcrypt.compare(req.body.parent.password,result.password,(err, matches)=> {
            if (matches) {
              const token = jwt.sign(
                { id: result.id }, 
                process.env.JWT_SECRET, {expiresIn: 24 * 60 * 60}
                );
              const responseObject = {
                result: result,
                message: "Sign in successful",
                sessionToken: token,
              };
              res.status(200).json(responseObject);
            } else {
              res.status(401).json({ message: "Incorrect password",error:err });
            }
          }
        );
      }
    } 
   catch (error) {
     res.status(500).json({ error: error })
    };
})

module.exports = router
