const {DataTypes}=require('sequelize');
const db=require('../db')

module.exports = db.define('clothing',{
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  minTemp:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  maxTemp:{
      type:DataTypes.INTEGER,
      allowNull:false
  },
  birthiconDate:{
      type:DataTypes.STRING,
      allowNull:true
  }
})