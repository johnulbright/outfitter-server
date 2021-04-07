const {DataTypes}=require('sequelize');
const db=require('../db')

module.exports=db.define('parent',{
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    })
