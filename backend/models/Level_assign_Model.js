import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const LevelAssign = db.define('level_assign',{
    id :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    level_name :{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default LevelAssign;