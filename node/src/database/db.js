import { Sequelize } from "sequelize"

const db = new Sequelize('pruebainfodesign', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;