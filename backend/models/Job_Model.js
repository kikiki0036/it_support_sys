import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Job = db.define('job_it',{
    job_no:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    appove_by:{
        type: DataTypes.STRING
    },
    assign_by:{
        type: DataTypes.STRING
    },
    assign_detail:{
        type: DataTypes.STRING
    },
    job_date:{
        type: DataTypes.DATE
    },
    open_date:{
        type: DataTypes.DATE
    },
    start_date:{
        type: DataTypes.DATE
    },
    target_date:{
        type: DataTypes.DATE
    },
    close_date:{
        type: DataTypes.DATE
    },
    rootcase :{
        type: DataTypes.STRING
    },
    rootitem :{
        type: DataTypes.STRING
    },
    solutionnote :{
        type: DataTypes.STRING
    },
    status :{
        type: DataTypes.STRING
    },
    tikket_no  :{
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE                        
    },
    updatedAt:{
        type: DataTypes.DATE                        
    }
},{
    freezeTableName:true
});

export default Job;