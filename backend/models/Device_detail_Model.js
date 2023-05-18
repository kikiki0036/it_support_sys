import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const deviceDetail = db.define('device_detail',{
    detail_id :{
        type: DataTypes.STRING,
        primaryKey: true
    },
    brand :{
        type: DataTypes.STRING
    },
    model :{
        type: DataTypes.STRING
    },
    os_type :{
        type: DataTypes.STRING
    },
    system_type :{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default deviceDetail;