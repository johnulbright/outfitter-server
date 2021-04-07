require("dotenv").config();

const router = require("express").Router(); 
const {Clothing} = require("../models/index");
const validateSession = require("../middleware/validate-session");

router.post("/create/:childId",validateSession,async (req,res)=>{
    try{
        const result= await Clothing.create({
            name:req.body.clothing.name,
            minTemp:req.body.clothing.minTemp,
            maxTemp:req.body.clothing.maxTemp,
            category:req.body.clothing.category,
            icon:req.body.clothing.icon,
            childId:req.params.childId
        })
        res.status(200).json({result:result,message:"Clothing created successfully"})
    } catch(err) {res.status(500).json({message:"whoops",error:err})}
})

// Get the all clothing associated with a child
router.get("/all/:childId",validateSession,async (req, res) => {
   try{
       const result = await Clothing.findAll({where:{childId:req.params.childId } })
       res.status(200).json(result)
   } catch (error){
       res.status(500).json({error:error})
   }
})
// Get a specific clothing item by its id
router.get("/:clothingId",validateSession,async (req, res) => {
    try{
        const result = await Clothing.findOne({where:{id:req.params.clothingId} })
        if(result===null){
            res.status(403).json({message:"There is no such clothing"})
        } else {
            res.status(200).json(result);
        }
    } catch (error){
        res.status(500).json({error:error})
    }
 })

// Edit a clothing item
router.put("/edit/:clothingId",validateSession,async (req,res)=>{
    try{
        const updatedEntry={     
            name:req.body.clothing.name,
            minTemp:req.body.clothing.minTemp,
            maxTemp:req.body.clothing.maxTemp,
            category:req.body.clothing.category,
            icon:req.body.clothing.icon,
        }
        const result = await Clothing.update(
            updatedEntry,
            {where:{id:req.params.clothingId } }
            )
            if(result[0]===0){
                res.status(403).json({message:"You may not edit this clothing"})
            } else {
                res.status(200).json({message:"Clothing updated",updatedEntry:updatedEntry})
            }
    } catch (error){
        res.status(500).json({error:error})
    }
})

router.delete("/delete/:clothingId",validateSession,async (req,res)=>{
    try{
        const result = await Clothing.destroy(
            {where:{id:req.params.clothingId}}
        )
        if(result===1){
            res.status(200).json({message:"Clothing removed",result:result})
        } else {
            res.status(403).json({message:"You may not delete this clothing"})
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
})
module.exports = router;
