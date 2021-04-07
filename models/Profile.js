const {DataTypes}=require('sequelize');
const db=require('../db')

module.exports=db.define('profile',{
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,         
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false,         
        },
        zipCode:{
            type:DataTypes.STRING,
            allowNull:false,         
        },
        lat:{
            type:DataTypes.FLOAT,
            allowNull:false,         
        },
        lon:{
            type:DataTypes.FLOAT,
            allowNull:false,         
        },
        timeZone:{
            type:DataTypes.INTEGER,
            allowNull:false,         
        }
    })