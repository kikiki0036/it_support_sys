import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Rootcase = db.define('rootcase',{
    rootcase :{
        type: DataTypes.STRING,
        primaryKey: true
    },
    rootcase_name:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default Rootcase;