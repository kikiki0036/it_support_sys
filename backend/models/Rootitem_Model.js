import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Rootitem = db.define('rootitem',{
    rootitem :{
        type: DataTypes.STRING,
        primaryKey: true
    },
    rootitem_name:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default Rootitem;