import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const DataBook = db.define('data_book_center',{
    book_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    device_center_id:{
        type: DataTypes.STRING
    },
    tel:{
        type: DataTypes.STRING                        
    },
    borrower_name:{
        type: DataTypes.STRING                        
    },
    borrower_id:{
        type: DataTypes.STRING                        
    },	
    startDate:{
        type: DataTypes.DATE                        
    },
    endDate:{
        type: DataTypes.DATE                        
    },
    dateSCH:{
        type: DataTypes.DATE                        
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default DataBook;