import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Schedu = db.define('schedul_task',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    job_no:{
        type: DataTypes.STRING
    },
    assign:{
        type: DataTypes.STRING                        
    },
    level_assign:{
        type: DataTypes.INTEGER                        
    }
},{
    freezeTableName:true,
    timestamps: false
}

);

export default Schedu;