import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const st = db.define('service_type',{
    id_type :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title :{
        type: DataTypes.STRING
    },
    status :{
        type: DataTypes.BOOLEAN
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default st;