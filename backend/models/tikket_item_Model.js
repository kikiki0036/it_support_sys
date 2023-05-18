import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const  ItemTK = db.define('item_tk',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_tk:{
        type: DataTypes.STRING
    },
    id_item:{
        type: DataTypes.STRING
    },
    value:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default ItemTK;