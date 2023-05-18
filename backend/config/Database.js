import {Sequelize} from "sequelize";

const db = new Sequelize('data_itservice','root','',{
    host: "localhost",
    dialect: "mysql",
    timezone: 'Asia/Bangkok',
    dialectOptions: {
        timezone: "local",
    }
});

export default db;
