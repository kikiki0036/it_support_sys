import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const TeamSupport = db.define('team_support',{
    team_id :{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    team_name :{
        type: DataTypes.STRING
    },
    team_objectives :{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true,
    timestamps: false 

});

export default TeamSupport;