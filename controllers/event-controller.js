require("dotenv").config();

const router = require("express").Router(); 
const {Event} = require("../models/index");

router.get("/childLogin/all/:childId",async (req, res) => {
    try{
        const result = await Event.findAll({where:{childId:req.params.childId } })
        res.status(200).json(result)
    } catch (error){
        res.status(500).json({error:error})
    }
 })

const validateSession = require("../middleware/validate-session");

router.post("/create/:childId",validateSession,async (req,res)=>{
    try{
        const result= await Event.create({
            name:req.body.event.name,
            hours:req.body.event.hours,
            minutes:req.body.event.minutes,
            eventTime:req.body.event.eventTime,
            childId:req.params.childId
        })
        res.status(200).json({result:result,message:"Event created successfully"})
    } catch(err) {res.status(500).json({error:err})}
})

// Get the all events associated with a child
router.get("/all/:childId",validateSession,async (req, res) => {
   try{
       const result = await Event.findAll({where:{childId:req.params.childId } })
       res.status(200).json(result)
   } catch (error){
       res.status(500).json({error:error})
   }
})
// Get a specific event by its id
router.get("/:eventId",validateSession,async (req, res) => {
    try{
        const result = await Event.findOne({where:{id:req.params.eventId} })
        if(result===null){
            res.status(403).json({message:"There is no such event"})
        } else {
            res.status(200).json(result);
        }
    } catch (error){
        res.status(500).json({error:error})
    }
 })

// Edit a clothing item
router.put("/edit/:eventId",validateSession,async (req,res)=>{
    try{
        const updatedEntry={     
            name:req.body.event.name,
            hours:req.body.event.hours,
            minutes:req.body.event.minutes,
            eventTime:req.body.event.eventTime,

        }
        const result = await Event.update(
            updatedEntry,
            {where:{id:req.params.eventId } }
            )
            if(result[0]===0){
                res.status(403).json({message:"You may not edit this event"})
            } else {
                res.status(200).json({message:"Clothing updated",updatedEntry:updatedEntry})
            }
    } catch (error){
        res.status(500).json({error:error})
    }
})

router.delete("/delete/:eventId",validateSession,async (req,res)=>{
    try{
        const result = await Event.destroy(
            {where:{id:req.params.eventId}}
        )
        if(result===1){
            res.status(200).json({message:"Event removed",result:result})
        } else {
            res.status(403).json({message:"You may not delete this event"})
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
})
module.exports = router;
