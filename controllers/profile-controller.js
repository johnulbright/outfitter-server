require("dotenv").config();

const router = require("express").Router(); 
const {Profile} = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validate-session");


router.post("/create",validateSession,async (req,res)=>{
    try{
        const result= await Profile.create({
            firstName:req.body.profile.firstName,
            lastName:req.body.profile.lastName,
            zipCode:req.body.profile.zipCode,
            lat:req.body.profile.lat,
            lon:req.body.profile.lon,
            timeZone:req.body.profile.timeZone,
            parentId:req.parent.id
        })
        res.status(200).json({result:result,message:"Profile created successfully"})
    } catch(err) {res.status(500).json({error:err})}
})


// router.get("/login", (req, res) => {
//   Profile.findOne({ where: { email: req.body.parent.email } })
//     .then(function login(parent) {
//       if (!parent) {
//         res.status(404).json({ error: "account not found" });
//       } else {
//         bcrypt.compare(
//           req.body.parent.password,
//           parent.password,
//           function (err, matches) {
//             if (matches) {
//               const token = jwt.sign({ id: parent.id }, process.env.JWT_SECRET, {
//                 expiresIn: 24 * 60 * 60,
//               });
//               let responseObject = {
//                 parent: parent,
//                 message: "Sign in successful",
//                 sessionToken: token,
//               };
//               res.status(200).json(responseObject);
//             } else {
//               res.status(401).json({ message: "Incorrect password",error:err });
//             }
//           }
//         );
//       }
//     })
//     .catch((error) => res.status(500).json({ error: error }));
// });

module.exports = router;
