import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Data_book_round_Model = db.define('data_book_round',{
    id_round  :{
        type: DataTypes.STRING,
        primaryKey: true
    },
    round_name :{
        type: DataTypes.STRING
    },
    time_start :{
        type: DataTypes.TIME
    },
    time_end :{
        type: DataTypes.TIME
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default Data_book_round_Model;