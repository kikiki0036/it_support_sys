import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Erp = db.define('erp_rights',{
    id_it:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_emp:{
        type: DataTypes.STRING
    },
    it_name:{
        type: DataTypes.STRING
    },
    line_token:{
        type: DataTypes.TEXT
    },
    manage_job:{
        type: DataTypes.BOOLEAN
    },
    create_job:{
        type: DataTypes.BOOLEAN
    },
    asst_job:{
        type: DataTypes.BOOLEAN
    },
    approve_job:{
        type: DataTypes.BOOLEAN
    },
    service_config:{
        type: DataTypes.BOOLEAN
    },
    manageProfile:{
        type: DataTypes.BOOLEAN
    },
    notebook_center:{
        type: DataTypes.BOOLEAN
    },
    createdAt:{
        type: DataTypes.DATE                        
    },
    updatedAt:{
        type: DataTypes.DATE                        
    }
},{
    freezeTableName:true,
    timestamps: false 

});

export default Erp;