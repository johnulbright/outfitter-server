const jwt=require("jsonwebtoken");
const {Parent}=require("../models/index");

const validateSession=(req,res,next)=>{
    const token=req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err,decodedToken) => {
        if(!err&&decodedToken){
            Parent.findOne({where:{id:decodedToken.id}})
            .then((parent)=>{
                if(!parent) throw err;
                req.parent=parent;
                next();
            })
            .catch((err)=>res.status(500).json({error:err}))
        } else {
            return res.status(401).json({message:"Not authorized",error:err});
        }
    });
}

module.exports=validateSession;