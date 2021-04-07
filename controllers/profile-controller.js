require("dotenv").config();

const router = require("express").Router(); 
const {Profile} = require("../models/index");
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

// Get the profile associated with the user from their session token
router.get("/",validateSession,async (req, res) => {
   try{
       const result = await Profile.findOne({where:{parentId:req.parent.id } })
       res.status(200).json(result)
   } catch (error){
       res.status(500).json({error:error})
   }
})

// Edit the profile for a user
router.put("/edit",validateSession,async (req,res)=>{
    try{
        const updatedEntry={     
            firstName:req.body.profile.firstName,
            lastName:req.body.profile.lastName,
            zipCode:req.body.profile.zipCode,
            lat:req.body.profile.lat,
            lon:req.body.profile.lon,
            timeZone:req.body.profile.timeZone
        }
        const result = await Profile.update(
            updatedEntry,
            {where:{parentId:req.parent.id } }
            )
        res.status(200).json({updatedEntry:updatedEntry,result:result})
    } catch (error){
        res.status(500).json({message:"yo",error:error})
    }
})
module.exports = router;
