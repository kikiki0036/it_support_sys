import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const soi = db.define('service_option_item',{
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_option : {
        type: DataTypes.STRING
    },
    id_item : {
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default soi;