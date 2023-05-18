import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const location = db.define('location',{
    location_id :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    location :{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default location;