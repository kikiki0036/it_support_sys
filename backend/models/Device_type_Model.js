import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const devicetype = db.define('device_type',{
    type_id :{
        type: DataTypes.STRING,
        primaryKey: true
    },
    type_name :{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default devicetype;