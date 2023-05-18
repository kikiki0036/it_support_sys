import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const history = db.define('service_type join service_options join account_user join job_it join service_tikket',{
    job_no:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    name_user:{
        type: DataTypes.STRING
    },
    endDate:{
        type: DataTypes.DATE
    },
    close_date:{
        type: DataTypes.DATE
    },
    assign_detail:{
        type: DataTypes.STRING
    },
    service_title:{
        type:  DataTypes.STRING
    },
    service_option_title:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    }
    ,
    status:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});


export default history;