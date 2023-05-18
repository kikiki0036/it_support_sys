import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const UserAccount = db.define('account_user',{
    id_user:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    name_user:{
        type: DataTypes.STRING
    },
    name_user_eng:{
        type: DataTypes.STRING
    },
    gender:{
        type: DataTypes.STRING
    },
    level_user:{
        type: DataTypes.STRING
    },
    mail:{
        type: DataTypes.STRING
    },
    tel:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    role_id:{
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE                        
    },
    updatedAt:{
        type: DataTypes.DATE                        
    }
    ,
    verify_email:{
        type: DataTypes.BOOLEAN                        
    }
},{
    freezeTableName:true
});

export default UserAccount;