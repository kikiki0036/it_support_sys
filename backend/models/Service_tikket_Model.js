import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Tikket = db.define('service_tikket',{
    tikket_no :{
        type: DataTypes.STRING,
        primaryKey: true
    },
    requestor :{
        type: DataTypes.STRING
    },
    section_req :{
        type: DataTypes.STRING
    },
    tel :{
        type: DataTypes.STRING
    },
    service_type:{
        type: DataTypes.INTEGER
    },
    service_option:{
        type: DataTypes.STRING
    },
    tikket_date:{
        type: DataTypes.DATE
    },
    status:{
        type: DataTypes.STRING
    },
    comment:{
        type: DataTypes.STRING
    },
    review_by:{
        type: DataTypes.STRING
    },
    createJob_by:{
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

export default Tikket;