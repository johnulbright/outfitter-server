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
  category:{
    type:DataTypes.STRING,
    allowNull:false
  },
  icon:{
      type:DataTypes.STRING,
      allowNull:true
  },
  required:{
    type:DataTypes.BOOLEAN,
    allowNull:false
  }
})