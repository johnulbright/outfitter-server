require("dotenv").config();

const router = require("express").Router(); 
const {Parent} = require("../models/index");
const validateSession = require("../middleware/validate-session");

// Edit the profile for a user
router.put("/",validateSession,async (req,res)=>{
    try{
        const updatedEntry={     
            email:req.body.parent.email,
            password:req.body.parent.password,
            firstName:req.body.parent.firstName,
            lastName:req.body.parent.lastName,
            zipCode:req.body.parent.zipCode,
            lat:req.body.parent.lat,
            lon:req.body.parent.lon,
            timeZone:req.body.parent.timeZone,
            city:req.body.parent.city
        }
        const result = await Parent.update(
            updatedEntry,
            {where:{id:req.parent.id } }
            )
        res.status(200).json({updatedEntry:updatedEntry,result:result})
    } catch (error){
        res.status(500).json({message:"yo",error:error})
    }
})
module.exports = router;
