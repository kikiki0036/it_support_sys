import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const DataBook = db.define('access_level',{
    access_level_id :{
        type: DataTypes.STRING,
        primaryKey: true
    },
    access_level_name:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING                        
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default DataBook;