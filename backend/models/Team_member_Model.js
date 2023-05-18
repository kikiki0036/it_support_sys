import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const TeamSupport = db.define('team_member',{
    id_user  :{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    team  :{
        type: DataTypes.STRING
    },
    access_level :{
        type: DataTypes.STRING
    },
    line_token :{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true,
    timestamps: false 

});

export default TeamSupport;