import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Pos = db.define('position',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    position:{
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE                        
    },
    updatedAt:{
        type: DataTypes.DATE                        
    }
},{
    freezeTableName:true
});

export default Pos;