import { Sequelize } from "sequelize"; 
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Notes = db.define('note',{
    id :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_user :{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default Notes;