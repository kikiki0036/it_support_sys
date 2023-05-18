import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Chat = db.define('chatdb',{
    chat_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tags:{
        type: DataTypes.TEXT
    },
    pattern:{
        type: DataTypes.TEXT                        
    },
    responses:{
        type: DataTypes.TEXT                        
    }
},{
    freezeTableName:true,
    timestamps: false 
});

export default Chat;