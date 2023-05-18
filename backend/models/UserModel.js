import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    createdAt:{
        type: DataTypes.DATE                        
    },
    updatedAt:{
        type: DataTypes.DATE                        
    }
},{
},{
    freezeTableName:true
});

export default Users;