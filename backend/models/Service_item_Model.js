import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const item = db.define('service_items',{
    id_item : {
        type: DataTypes.STRING,
        primaryKey: true
    },
    title : {
        type: DataTypes.STRING
    },
    description : {
        type: DataTypes.STRING
    },
    input_type : {
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default item;