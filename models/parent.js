module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('parent',{
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,         
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false,         
        },
        zipCode:{
            type:DataTypes.INTEGER,
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
        },
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
}