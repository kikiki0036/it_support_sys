import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Emps = db.define('data_emp',{
    id_emp:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    gender:{
        type: DataTypes.STRING
    },
    emp_name:{
        type: DataTypes.STRING
    },
    emp_nameEng:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    birth:{
        type: DataTypes.DATE
    },
    dept:{
        type: DataTypes.INTEGER
    },
    section :{
        type: DataTypes.INTEGER
    },
    position:{
        type: DataTypes.INTEGER
    },
    level:{
        type: DataTypes.STRING
    },
    type:{
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


export default Emps;