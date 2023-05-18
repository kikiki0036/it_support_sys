import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const so = db.define('service_options',{
    id_option : {
        type: DataTypes.STRING,
        primaryKey: true
    },
    title : {
        type: DataTypes.STRING
    },
    manager_approve : {
        type: DataTypes.STRING
    },
    team_approve : {
        type: DataTypes.STRING
    },
    status : {
        type: DataTypes.BOOLEAN
    },
    id_type : {
        type: DataTypes.INTEGER
    }
},{
    freezeTableName:true, 
    timestamps: false 
});

export default so;