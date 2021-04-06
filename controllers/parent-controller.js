require("dotenv").config();

const router = require("express").Router(); 
const {Parent} = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


router.post("/signup",(req,res)=>{
    Parent.create({
        firstName:req.body.parent.firstName,
        lastName:req.body.parent.lastName,
        zipCode:req.body.parent.zipCode,
        lat:req.body.parent.lat,
        lon:req.body.parent.lon,
        timeZone:req.body.parent.timeZone,
        email: req.body.parent.email,
        password: bcrypt.hashSync(req.body.parent.password,13)
    })
    .then(function createparent(parent) {
        let token=jwt.sign({id:parent.id},process.env.JWT_SECRET,{expiresIn:24*60*60});
        let responseObject={parent:parent,message:"parent account created successfully",sessionToken:token};
        res.status(201).json(responseObject)
    })
    .catch((err)=>res.status(500).json({error:err}))
})


router.post("/login", (req, res) => {
  parent.findOne({ where: { email: req.body.parent.email } })
    .then(function login(parent) {
      if (!parent) {
        res.status(404).json({ error: "account not found" });
      } else {
        bcrypt.compare(
          req.body.parent.password,
          parent.password,
          function (err, matches) {
            if (matches) {
              const token = jwt.sign({ id: parent.id }, process.env.JWT_SECRET, {
                expiresIn: 24 * 60 * 60,
              });
              let responseObject = {
                parent: parent,
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
    })
    .catch((error) => res.status(500).json({ error: error }));
});

module.exports = router;
