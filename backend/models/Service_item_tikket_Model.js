import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const  ItemTK = db.define('service_item_tikket',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tikket_no :{
        type: DataTypes.STRING
    },
    title:{
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