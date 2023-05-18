import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const NotebookCenter = db.define('notebook_center',{
    device_center_id :{
        type: DataTypes.STRING,
        primaryKey: true
    },
    device_name :{
        type: DataTypes.STRING
    },
    status :{
        type: DataTypes.BOOLEAN
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default NotebookCenter;