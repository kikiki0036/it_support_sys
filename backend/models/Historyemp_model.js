import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const historyemp = db.define('service_type join service_options join account_user join service_tikket',{
    tikket_no:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    name_user:{
        type: DataTypes.STRING
    },
    service_type_title:{
        type:  DataTypes.STRING
    },
    service_option_title:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    },
    comment:{
        type: DataTypes.STRING
    }

},{
    freezeTableName:true
});


export default historyemp;