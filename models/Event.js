const {DataTypes}=require('sequelize');
const db=require('../db')

module.exports = db.define('event',{
        name:{
            type:DataTypes.STRING,
            allowNull:false,         
        },
        time:{
            type:DataTypes.TIME,
            allowNull:false,    
        }
    })
