const {DataTypes}=require('sequelize');
const db=require('../db')

module.exports = db.define('clothing',{
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  requiredMin:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  requiredMax:{
      type:DataTypes.INTEGER,
      allowNull:true
  },  
  optionalMin:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  optionalMax:{
      type:DataTypes.INTEGER,
      allowNull:true
  },
  category:{
    type:DataTypes.STRING,
    allowNull:false
  },
  icon:{
      type:DataTypes.STRING,
      allowNull:true
  }
})