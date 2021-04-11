const {DataTypes}=require('sequelize');
const db=require('../db')

module.exports = db.define('child',{
        name:{
            type:DataTypes.STRING,
            allowNull:false,         
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,  
            unique:true       
        },
        underwearRemind:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        deviceId:{
            type:DataTypes.INTEGER,
            allowNull:true,
        }
    })
