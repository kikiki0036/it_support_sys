import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const device = db.define('data_device',{
    no :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    device_id :{
        type: DataTypes.STRING,
        primaryKey: true
    },
    device_name :{
        type: DataTypes.STRING
    },
    ipaddress :{
        type: DataTypes.STRING
    },
    macaddress :{
        type: DataTypes.STRING
    },
    detail_id :{
        type: DataTypes.STRING
    },
    type_id :{
        type: DataTypes.STRING
    },
    location :{
        type: DataTypes.INTEGER
    },
    des :{
        type: DataTypes.STRING
    },
    id_user :{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default device;