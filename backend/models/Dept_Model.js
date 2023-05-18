import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Dept = db.define('department',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dept:{
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
}
// ,{ 
//     timestamps: false 
// }
);

export default Dept;