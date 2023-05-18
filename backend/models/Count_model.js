import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const  Count = db.define('service_item_tikket',{
    num:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default Count;