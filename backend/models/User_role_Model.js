import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Role = db.define('user_role',{
    role_id :{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    role_name :{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 

});

export default Role;