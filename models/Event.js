const {DataTypes}=require('sequelize');
const db=require('../db')

module.exports = db.define('event',{
        name:{
            type:DataTypes.STRING,
            allowNull:false,         
        },
        hours:{
            type:DataTypes.INTEGER,
            allowNull:false,    
        },
        minutes:{
            type:DataTypes.INTEGER,
            allowNull:false,    
        }
    })
