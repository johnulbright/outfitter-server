require("dotenv").config();

const router = require("express").Router(); 
const {Child} = require("../models/index");

// Get one child by username
router.get("/login/:username",async (req, res) => {
    try{
        const result = await Child.findOne({where:{username:req.params.username} })
        if(result===null){
            res.status(403).json({message:"You have no such child"})
        } else {
            res.status(200).json(result);
        }
    } catch (error){
        res.status(500).json({error:error})
    }
 })
const validateSession = require("../middleware/validate-session");


router.post("/create",validateSession,async (req,res)=>{
    try{
        const result= await Child.create({
            name:req.body.child.name,
            username:req.body.child.username,
            underwearRemind:req.body.child.underwearRemind,
            deviceId:req.body.child.deviceId,
            parentId:req.parent.id
        })
        res.status(200).json({result:result,message:"Child created successfully"})
    } catch(err) {res.status(500).json({error:err})}
})
// Get all children for username check
router.get("/all",validateSession,async (req, res) => {
    try{
        const result = await Child.findAll()
        res.status(200).json(result)
    } catch (error){
        res.status(500).json({error:error})
    }
 })
// Get the all children associated with the user from their session token
router.get("/allofparent",validateSession,async (req, res) => {
   try{
       const result = await Child.findAll({where:{parentId:req.parent.id } })
       res.status(200).json(result)
   } catch (error){
       res.status(500).json({error:error})
   }
})
// Get a specific child
router.get("/:id",validateSession,async (req, res) => {
    try{
        const result = await Child.findOne({where:{parentId:req.parent.id,id:req.params.id} })
        if(result===null){
            res.status(403).json({message:"You have no such child"})
        } else {
            res.status(200).json(result);
        }
    } catch (error){
        res.status(500).json({error:error})
    }
 })


// Edit a child
router.put("/edit/:id",validateSession,async (req,res)=>{
    try{
        const updatedEntry={     
            id:req.params.id,
            name:req.body.child.name,
            username:req.body.child.username,
            underwearRemind:req.body.child.underwearRemind,
            deviceId:req.body.child.deviceId,
        }
        const result = await Child.update(
            updatedEntry,
            {where:{parentId:req.parent.id,id:req.params.id } }
            )
            if(result[0]===0){
                res.status(403).json(result)
            } else {
                res.status(200).json({child:updatedEntry,result:result,message:"Child edited successfully"})
            }
    } catch (error){
        res.status(500).json(error)
    }
})

router.delete("/delete/:id",validateSession,async (req,res)=>{
    try{
        const result = await Child.destroy(
            {where:{id:req.params.id,parentId:req.parent.id}}
        )
        if(result===1){
            res.status(200).json({message:"Child removed",result:result})
        } else {
            res.status(403).json({message:"You may not delete this child"})
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
})
module.exports = router;
